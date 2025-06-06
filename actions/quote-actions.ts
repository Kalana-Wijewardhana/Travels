"use server"

import { z } from "zod"
import clientPromise from "@/lib/mongodb"
import { resend } from "@/lib/resend"
import { QuoteConfirmationEmail } from "@/components/emails/quote-confirmation"
import { format } from "date-fns"

// Define validation schema
const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  destination: z.string().min(1, "Please select a destination"),
  duration: z.string().optional(),
  travelers: z.string().optional(),
  startDate: z.date().optional(),
  budget: z.string().optional(),
  interests: z.string().optional(),
  message: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteSchema>

export async function submitQuoteRequest(formData: QuoteFormData) {
  try {
    // Validate form data
    const validatedData = quoteSchema.parse(formData)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("sri_lanka_tourism")

    // Format date for storage and email
    const formattedDate = validatedData.startDate ? format(validatedData.startDate, "PPP") : "Not specified"

    // Store in MongoDB
    const result = await db.collection("quote_requests").insertOne({
      ...validatedData,
      startDate: validatedData.startDate || null,
      createdAt: new Date(),
      status: "pending",
    })

    // Send confirmation email
    await resend.emails.send({
      from: "Sri Lanka Travels <no-reply@srilankatravels.com>",
      to: validatedData.email,
      subject: "Your Sri Lanka Tour Quote Request",
      react: QuoteConfirmationEmail({
        name: validatedData.name,
        destination: validatedData.destination,
        startDate: formattedDate,
        duration: validatedData.duration || "Not specified",
        travelers: validatedData.travelers || "Not specified",
      }),
    })

    // Send notification to admin
    await resend.emails.send({
      from: "Sri Lanka Travels <no-reply@srilankatravels.com>",
      to: "admin@srilankatravels.com",
      subject: "New Tour Quote Request",
      text: `New quote request from ${validatedData.name} (${validatedData.email}) for ${validatedData.destination}. Please check the admin dashboard.`,
    })

    return { success: true, message: "Quote request submitted successfully!" }
  } catch (error) {
    console.error("Error submitting quote request:", error)
    return { success: false, message: "Failed to submit quote request. Please try again." }
  }
}
