"use server";

import { z } from "zod";
import clientPromise from "@/lib/mongodb";

// Define validation schema
const experienceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  rating: z.number().min(1).max(5),
  experience: z.string().min(10, "Experience must be at least 10 characters"),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

export async function submitExperience(formData: ExperienceFormData) {
  try {
    console.log("Processing experience submission:", formData);

    // Validate form data
    const validatedData = experienceSchema.parse(formData);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("sri_lanka_tourism");

    // Store in MongoDB
    const result = await db.collection("experiences").insertOne({
      ...validatedData,
      createdAt: new Date(),
    });

    console.log("Experience stored in MongoDB with ID:", result.insertedId);

    return {
      success: true,
      message:
        "Experience shared successfully! Thank you for sharing your story.",
      experienceId: result.insertedId.toString(),
    };
  } catch (error: any) {
    console.error("Error submitting experience:", error);

    // Check if it's a validation error
    if (error.errors) {
      return {
        success: false,
        message: "Validation error: " + Object.values(error.errors).join(", "),
      };
    }

    // Check for MongoDB connection errors
    if (error.name === "MongoNetworkError") {
      return {
        success: false,
        message: "Database connection error. Please try again later.",
      };
    }

    return {
      success: false,
      message: "Failed to share experience. Please try again.",
    };
  }
}

export async function getExperiences(page = 1, limit = 20) {
  try {
    const client = await clientPromise;
    const db = client.db("sri_lanka_tourism");

    const skip = (page - 1) * limit;

    const experiences = await db
      .collection("experiences")
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Convert ObjectId to string for client-side use and ensure all required fields exist
    const formattedExperiences = experiences.map((exp) => ({
      id: exp._id.toString(),
      name: exp.name || "",
      location: exp.location || "",
      rating: exp.rating || 5,
      experience: exp.experience || "",
      createdAt: exp.createdAt
        ? exp.createdAt.toISOString()
        : new Date().toISOString(),
      _id: undefined, // Remove the MongoDB ObjectId
    }));

    return {
      success: true,
      experiences: formattedExperiences,
    };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return {
      success: false,
      experiences: [],
      message: "Failed to fetch experiences",
    };
  }
}
