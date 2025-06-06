import { type NextRequest, NextResponse } from "next/server"
import { submitExperience } from "@/actions/experience-actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await submitExperience(body)

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
      message: "Experience API endpoint",
      method: "POST",
      requiredFields: ["name", "location", "rating", "experience"],
    },
    { status: 200 },
  )
}
