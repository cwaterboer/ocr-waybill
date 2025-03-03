import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "month"

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()

    switch (timeRange) {
      case "week":
        startDate.setDate(endDate.getDate() - 7)
        break
      case "month":
        startDate.setDate(endDate.getDate() - 30)
        break
      case "quarter":
        startDate.setDate(endDate.getDate() - 90)
        break
      default:
        startDate.setDate(endDate.getDate() - 30)
    }

    // Get waybills for the current user within the date range
    const waybillsSnapshot = await db
      .collection("waybills")
      .where("userId", "==", session.user.id)
      .where("createdAt", ">=", startDate.toISOString())
      .where("createdAt", "<=", endDate.toISOString())
      .orderBy("createdAt", "asc")
      .get()

    const waybills = waybillsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Calculate statistics
    const total = waybills.length

    // Today's waybills
    const today = new Date().toISOString().split("T")[0]
    const todayWaybills = waybills.filter((waybill) => {
      const waybillDate = new Date(waybill.createdAt).toISOString().split("T")[0]
      return waybillDate === today
    })

    // This week's waybills (last 7 days)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const thisWeekWaybills = waybills.filter((waybill) => {
      return new Date(waybill.createdAt) >= weekAgo
    })

    // This month's waybills (last 30 days)
    const monthAgo = new Date()
    monthAgo.setDate(monthAgo.getDate() - 30)
    const thisMonthWaybills = waybills.filter((waybill) => {
      return new Date(waybill.createdAt) >= monthAgo
    })

    // Calculate trend (percentage change from previous period)
    const previousPeriodStart = new Date(startDate)
    previousPeriodStart.setDate(
      previousPeriodStart.getDate() - (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
    )

    const previousPeriodWaybillsSnapshot = await db
      .collection("waybills")
      .where("userId", "==", session.user.id)
      .where("createdAt", ">=", previousPeriodStart.toISOString())
      .where("createdAt", "<", startDate.toISOString())
      .get()

    const previousPeriodCount = previousPeriodWaybillsSnapshot.size
    const trend = previousPeriodCount === 0 ? 100 : ((total - previousPeriodCount) / previousPeriodCount) * 100

    // Generate daily data
    const dailyData: Array<{ date: string; count: number }> = []
    const dateMap = new Map<string, number>()

    // Initialize all dates in the range with 0 count
    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0]
      dateMap.set(dateString, 0)
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Count waybills per day
    waybills.forEach((waybill) => {
      const dateString = new Date(waybill.createdAt).toISOString().split("T")[0]
      dateMap.set(dateString, (dateMap.get(dateString) || 0) + 1)
    })

    // Convert map to array
    dateMap.forEach((count, date) => {
      dailyData.push({ date, count })
    })

    // Sort by date
    dailyData.sort((a, b) => a.date.localeCompare(b.date))

    // Generate service type data
    const serviceTypeMap = new Map<string, number>()

    waybills.forEach((waybill) => {
      const serviceType = waybill.serviceType || "Unknown"
      serviceTypeMap.set(serviceType, (serviceTypeMap.get(serviceType) || 0) + 1)
    })

    const serviceTypeData = Array.from(serviceTypeMap.entries()).map(([name, value]) => ({
      name,
      value,
    }))

    return NextResponse.json({
      total,
      today: todayWaybills.length,
      thisWeek: thisWeekWaybills.length,
      thisMonth: thisMonthWaybills.length,
      trend,
      dailyData,
      serviceTypeData,
    })
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}

