import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("sri_lanka_tourism")

    const supportRequests = await db.collection("support_requests").find({}).sort({ createdAt: -1 }).limit(10).toArray()

    return NextResponse.json(
      {
        success: true,
        data: supportRequests,
        count: supportRequests.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch support requests" }, { status: 500 })
  }
}
