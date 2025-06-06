import { type NextRequest, NextResponse } from "next/server"
import { likeExperience } from "@/actions/experience-actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ success: false, message: "Experience ID is required" }, { status: 400 })
    }

    const result = await likeExperience(id)

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
