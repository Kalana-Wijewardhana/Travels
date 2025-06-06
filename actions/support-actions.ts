"use server"

import { z } from "zod"
import clientPromise from "@/lib/mongodb"
import { resend } from "@/lib/resend"
import { SupportConfirmationEmail } from "@/components/emails/support-confirmation"

// Define validation schema
const supportSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  priority: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type SupportFormData = z.infer<typeof supportSchema>

export async function submitSupportRequest(formData: SupportFormData) {
  try {
    // Validate form data
    const validatedData = supportSchema.parse(formData)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("sri_lanka_tourism")

    // Store in MongoDB
    const result = await db.collection("support_requests").insertOne({
      ...validatedData,
      createdAt: new Date(),
      status: "open",
      priority: validatedData.priority || "medium",
    })

    // Send confirmation email
    await resend.emails.send({
      from: "Sri Lanka Travels Support <support@srilankatravels.com>",
      to: validatedData.email,
      subject: "Your Support Request Has Been Received",
      react: SupportConfirmationEmail({
        name: validatedData.name,
        subject: validatedData.subject,
        priority: validatedData.priority || "Medium",
      }),
    })

    // Send notification to support team
    const isHighPriority = validatedData.priority === "high" || validatedData.priority === "urgent"
    await resend.emails.send({
      from: "Sri Lanka Travels Support <support@srilankatravels.com>",
      to: isHighPriority ? "urgent-support@srilankatravels.com" : "support@srilankatravels.com",
      subject: `${isHighPriority ? "[URGENT] " : ""}New Support Request: ${validatedData.subject}`,
      text: `New support request from ${validatedData.name} (${validatedData.email}).\n\nSubject: ${validatedData.subject}\nPriority: ${validatedData.priority || "Medium"}\n\nMessage: ${validatedData.message}\n\nPlease respond according to our SLA guidelines.`,
    })

    return { success: true, message: "Support request submitted successfully!" }
  } catch (error) {
    console.error("Error submitting support request:", error)
    return { success: false, message: "Failed to submit support request. Please try again." }
  }
}
