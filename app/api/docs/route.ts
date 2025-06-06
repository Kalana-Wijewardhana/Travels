import { NextResponse } from "next/server"

export async function GET() {
  const apiDocs = {
    title: "Sri Lanka Tourism API Documentation",
    version: "1.0.0",
    baseUrl: process.env.NODE_ENV === "production" ? "https://your-domain.com/api" : "http://localhost:3000/api",
    endpoints: {
      health: {
        method: "GET",
        path: "/health",
        description: "Check API and database health status",
      },
      quote: {
        method: "POST",
        path: "/quote",
        description: "Submit a tour quote request",
        requiredFields: ["name", "email", "destination"],
        optionalFields: ["phone", "duration", "travelers", "startDate", "budget", "interests", "message"],
        example: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          destination: "Cultural Triangle (Sigiriya, Dambulla, Polonnaruwa)",
          duration: "4-7 days",
          travelers: "2",
          startDate: "2024-03-15",
          budget: "1000-2000",
          interests: "Culture, Photography",
          message: "Looking forward to exploring Sri Lanka!",
        },
      },
      support: {
        method: "POST",
        path: "/support",
        description: "Submit a support request",
        requiredFields: ["name", "email", "subject", "message"],
        optionalFields: ["priority"],
        example: {
          name: "Jane Smith",
          email: "jane@example.com",
          subject: "Booking inquiry",
          priority: "medium",
          message: "I need help with my booking confirmation.",
        },
      },
      experience: {
        method: "POST",
        path: "/experience",
        description: "Share a travel experience",
        requiredFields: ["name", "location", "rating", "experience"],
        example: {
          name: "Travel Enthusiast",
          location: "Sigiriya",
          rating: 5,
          experience: "Amazing experience climbing the rock fortress!",
        },
      },
      experienceLike: {
        method: "POST",
        path: "/experience/like",
        description: "Like an experience",
        requiredFields: ["id"],
        example: {
          id: "experience_id_here",
        },
      },
      dataQuotes: {
        method: "GET",
        path: "/data/quotes",
        description: "Fetch recent quote requests (last 10)",
      },
      dataSupport: {
        method: "GET",
        path: "/data/support",
        description: "Fetch recent support requests (last 10)",
      },
      dataExperiences: {
        method: "GET",
        path: "/data/experiences",
        description: "Fetch recent experiences (last 10)",
      },
    },
  }

  return NextResponse.json(apiDocs, { status: 200 })
}
