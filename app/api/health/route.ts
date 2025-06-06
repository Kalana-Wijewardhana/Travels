import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const healthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      mongodb: "unknown",
      resend: "unknown",
    },
  }

  // Test MongoDB connection
  try {
    const client = await clientPromise
    await client.db("sri_lanka_tourism").admin().ping()
    healthStatus.services.mongodb = "connected"
  } catch (error) {
    healthStatus.services.mongodb = "disconnected"
    healthStatus.status = "unhealthy"
  }

  // Test Resend (just check if API key is configured)
  try {
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your_resend_api_key_here") {
      healthStatus.services.resend = "configured"
    } else {
      healthStatus.services.resend = "not_configured"
      healthStatus.status = "partial"
    }
  } catch (error) {
    healthStatus.services.resend = "error"
    healthStatus.status = "unhealthy"
  }

  const statusCode = healthStatus.status === "healthy" ? 200 : healthStatus.status === "partial" ? 206 : 500

  return NextResponse.json(healthStatus, { status: statusCode })
}
