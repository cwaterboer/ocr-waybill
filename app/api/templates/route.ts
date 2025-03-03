import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.fields || !data.backgroundUrl) {
      return NextResponse.json({ error: "Name, fields, and background URL are required" }, { status: 400 })
    }

    // Add metadata
    const templateData = {
      ...data,
      userId: session.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save to Firestore
    const templateRef = await db.collection("templates").add(templateData)

    return NextResponse.json({
      success: true,
      id: templateRef.id,
      data: templateData,
    })
  } catch (error) {
    console.error("Error saving template:", error)
    return NextResponse.json({ error: "Failed to save template" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get templates for the current user
    const templatesSnapshot = await db
      .collection("templates")
      .where("userId", "==", session.user.id)
      .orderBy("createdAt", "desc")
      .get()

    const templates = templatesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ templates })
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}

