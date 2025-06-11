import { NextResponse } from "next/server";
import { getDatabaseStatus } from "@/actions/experience-actions";

export async function GET() {
  try {
    const status = await getDatabaseStatus();

    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        ...status,
      },
      {
        status: status.success ? 200 : 500,
      }
    );
  } catch (error: any) {
    console.error("Status check error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Status check failed",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
