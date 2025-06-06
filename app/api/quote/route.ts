import { type NextRequest, NextResponse } from "next/server"
import { submitQuoteRequest } from "@/actions/quote-actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Convert startDate string to Date object if provided
    if (body.startDate) {
      body.startDate = new Date(body.startDate)
    }

    const result = await submitQuoteRequest(body)

    if (result.success) {
      return NextResponse.json({ success: true, message: result.message }, { status: 200 })
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Quote API endpoint",
      method: "POST",
      requiredFields: ["name", "email", "destination"],
      optionalFields: ["phone", "duration", "travelers", "startDate", "budget", "interests", "message"],
    },
    { status: 200 },
  )
}
