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
    if (!data.waybillNumber) {
      return NextResponse.json({ error: "Waybill number is required" }, { status: 400 })
    }

    // Add metadata
    const waybillData = {
      ...data,
      userId: session.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save to Firestore
    const waybillRef = await db.collection("waybills").add(waybillData)

    return NextResponse.json({
      success: true,
      id: waybillRef.id,
      data: waybillData,
    })
  } catch (error) {
    console.error("Error saving waybill:", error)
    return NextResponse.json({ error: "Failed to save waybill" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    // Get waybills for the current user
    const waybillsSnapshot = await db
      .collection("waybills")
      .where("userId", "==", session.user.id)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get()

    const waybills = waybillsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ waybills })
  } catch (error) {
    console.error("Error fetching waybills:", error)
    return NextResponse.json({ error: "Failed to fetch waybills" }, { status: 500 })
  }
}

