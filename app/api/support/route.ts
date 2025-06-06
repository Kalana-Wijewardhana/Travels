import { type NextRequest, NextResponse } from "next/server"
import { submitSupportRequest } from "@/actions/support-actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await submitSupportRequest(body)

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
      message: "Support API endpoint",
      method: "POST",
      requiredFields: ["name", "email", "subject", "message"],
      optionalFields: ["priority"],
    },
    { status: 200 },
  )
}
