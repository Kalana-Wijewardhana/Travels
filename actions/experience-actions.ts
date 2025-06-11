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

    // Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI environment variable is not set");
      return {
        success: false,
        message: "Database configuration error. Please contact support.",
      };
    }

    // Connect to MongoDB with timeout
    const client = await clientPromise;
    const db = client.db("sri_lanka_tourism");

    // Test connection
    await db.admin().ping();
    console.log("MongoDB connection successful");

    // Store in MongoDB
    const result = await db.collection("experiences").insertOne({
      ...validatedData,
      createdAt: new Date(),
      status: "approved", // Add status field
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

    // More specific error handling
    if (
      error.name === "MongoNetworkError" ||
      error.name === "MongoTimeoutError"
    ) {
      return {
        success: false,
        message: "Database connection timeout. Please try again later.",
      };
    }

    if (error.name === "MongoServerError") {
      return {
        success: false,
        message: "Database server error. Please contact support.",
      };
    }

    // Check if it's a validation error
    if (error.errors) {
      return {
        success: false,
        message: "Validation error: " + Object.values(error.errors).join(", "),
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
    console.log(`Fetching experiences - Page: ${page}, Limit: ${limit}`);

    // Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI environment variable is not set");
      return {
        success: false,
        experiences: [],
        message: "Database configuration error. Please contact support.",
      };
    }

    const client = await clientPromise;
    const db = client.db("sri_lanka_tourism");

    // Test connection
    await db.admin().ping();
    console.log("MongoDB connection successful for getExperiences");

    const skip = (page - 1) * limit;

    // Check if collection exists and has documents
    const collectionExists = await db
      .listCollections({ name: "experiences" })
      .hasNext();
    if (!collectionExists) {
      console.log(
        "Experiences collection does not exist, creating with sample data"
      );

      // Create sample experience if collection doesn't exist
      await db.collection("experiences").insertOne({
        name: "Sample Traveler",
        location: "Sigiriya",
        rating: 5,
        experience:
          "Amazing experience visiting the ancient rock fortress! The climb was challenging but the views were absolutely breathtaking.",
        createdAt: new Date(),
        status: "approved",
      });
    }

    const experiences = await db
      .collection("experiences")
      .find({ status: { $ne: "deleted" } }) // Exclude deleted experiences
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    console.log(`Found ${experiences.length} experiences`);

    // Convert ObjectId to string for client-side use and ensure all required fields exist
    const formattedExperiences = experiences.map((exp) => ({
      id: exp._id.toString(),
      name: exp.name || "Anonymous",
      location: exp.location || "Unknown Location",
      rating: exp.rating || 5,
      experience: exp.experience || "No experience shared",
      createdAt: exp.createdAt
        ? exp.createdAt.toISOString()
        : new Date().toISOString(),
      _id: undefined, // Remove the MongoDB ObjectId
    }));

    return {
      success: true,
      experiences: formattedExperiences,
      message: `Successfully fetched ${formattedExperiences.length} experiences`,
    };
  } catch (error: any) {
    console.error("Error fetching experiences:", error);

    // More specific error handling
    if (
      error.name === "MongoNetworkError" ||
      error.name === "MongoTimeoutError"
    ) {
      return {
        success: false,
        experiences: [],
        message: "Database connection timeout. Please try again later.",
      };
    }

    if (error.name === "MongoServerError") {
      return {
        success: false,
        experiences: [],
        message: "Database server error. Please contact support.",
      };
    }

    return {
      success: false,
      experiences: [],
      message: "Failed to fetch experiences. Please try again.",
    };
  }
}

// New function to get database status
export async function getDatabaseStatus() {
  try {
    if (!process.env.MONGODB_URI) {
      return {
        success: false,
        message: "MONGODB_URI environment variable is not set",
        status: "configuration_error",
      };
    }

    const client = await clientPromise;
    const db = client.db("sri_lanka_tourism");

    // Test connection
    const pingResult = await db.admin().ping();

    // Get collection stats
    const experiencesCount = await db
      .collection("experiences")
      .countDocuments();

    return {
      success: true,
      message: "Database connection successful",
      status: "connected",
      ping: pingResult,
      experiencesCount,
    };
  } catch (error: any) {
    console.error("Database status check failed:", error);
    return {
      success: false,
      message: error.message,
      status: "connection_failed",
    };
  }
}
