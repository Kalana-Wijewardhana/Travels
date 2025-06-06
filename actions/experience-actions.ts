"use server"

import { z } from "zod"
import clientPromise from "@/lib/mongodb"

// Define validation schema
const experienceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  rating: z.number().min(1).max(5),
  experience: z.string().min(10, "Experience must be at least 10 characters"),
})

export type ExperienceFormData = z.infer<typeof experienceSchema>

export async function submitExperience(formData: ExperienceFormData) {
  try {
    // Validate form data
    const validatedData = experienceSchema.parse(formData)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("sri_lanka_tourism")

    // Store in MongoDB
    const result = await db.collection("experiences").insertOne({
      ...validatedData,
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      status: "pending", 
    })

    return { success: true, message: "Experience shared successfully! It will be visible after moderation." }
  } catch (error) {
    console.error("Error submitting experience:", error)
    return { success: false, message: "Failed to share experience. Please try again." }
  }
}

export async function likeExperience(id: string) {
  try {
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("sri_lanka_tourism")

    // Update likes count
    const result = await db.collection("experiences").updateOne({id: id }, { $inc: { likes: 1 } })

    if (result.modifiedCount === 0) {
      return { success: false, message: "Experience not found" }
    }

    return { success: true, message: "Experience liked successfully" }
  } catch (error) {
    console.error("Error liking experience:", error)
    return { success: false, message: "Failed to like experience. Please try again." }
  }
}
