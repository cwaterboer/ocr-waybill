"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Loader2, TrendingUp, TrendingDown, BarChart2, PieChart } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  LineChart,
  PieChart as RechartsChart,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface WaybillStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  trend: number
  dailyData: Array<{ date: string; count: number }>
  serviceTypeData: Array<{ name: string; value: number }>
}

export default function StatisticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("month")
  const [stats, setStats] = useState<WaybillStats | null>(null)
  const { toast } = useToast()

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/statistics?timeRange=${timeRange}`)
        const data = await response.json()

        if (response.ok) {
          setStats(data)
        } else {
          throw new Error(data.error || "Failed to fetch statistics")
        }
      } catch (error) {
        console.error("Error fetching statistics:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch statistics",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    // For demo purposes, create mock data
    const createMockData = () => {
      const today = new Date()
      const dailyData = []

      // Generate daily data for the past 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Random count between 0 and 20
        const count = Math.floor(Math.random() * 20)

        dailyData.push({
          date: date.toISOString().split("T")[0],
          count,
        })
      }

      // Calculate totals
      const total = dailyData.reduce((sum, day) => sum + day.count, 0)
      const todayCount = dailyData[dailyData.length - 1].count

      // Calculate this week's total (last 7 days)
      const thisWeek = dailyData.slice(-7).reduce((sum, day) => sum + day.count, 0)

      // Calculate this month's total
      const thisMonth = total

      // Calculate trend (percentage change from previous period)
      const previousPeriod = dailyData.slice(-14, -7).reduce((sum, day) => sum + day.count, 0)
      const trend = previousPeriod === 0 ? 100 : ((thisWeek - previousPeriod) / previousPeriod) * 100

      // Service type data
      const serviceTypeData = [
        { name: "Express", value: Math.floor(Math.random() * 50) + 20 },
        { name: "Standard", value: Math.floor(Math.random() * 40) + 15 },
        { name: "Economy", value: Math.floor(Math.random() * 30) + 10 },
      ]

      setStats({
        total,
        today: todayCount,
        thisWeek,
        thisMonth,
        trend,
        dailyData,
        serviceTypeData,
      })

      setIsLoading(false)
    }

    // Use mock data for now
    createMockData()

    // In a real app, you would use fetchStats() instead
    // fetchStats()
  }, [timeRange, toast])

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Waybill Statistics</h2>
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Waybills</CardDescription>
              <CardTitle className="text-3xl">{stats?.total || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">All time</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Today</CardDescription>
              <CardTitle className="text-3xl">{stats?.today || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Waybills processed today</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-3xl">{stats?.thisWeek || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Last 7 days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Trend</CardDescription>
              <CardTitle className="text-3xl flex items-center">
                {stats?.trend !== undefined ? (
                  <>
                    {stats.trend >= 0 ? (
                      <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
                    )}
                    {Math.abs(stats.trend).toFixed(1)}%
                  </>
                ) : (
                  "N/A"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Compared to previous period</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Daily Waybill Volume
              </CardTitle>
              <CardDescription>Number of waybills processed per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats?.dailyData || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getDate()}/${date.getMonth() + 1}`
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value} waybills`, "Count"]}
                      labelFormatter={(label) => {
                        const date = new Date(label)
                        return date.toLocaleDateString()
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="count" name="Waybills" stroke="#0088FE" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Service Type Distribution
              </CardTitle>
              <CardDescription>Breakdown by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsChart>
                    <Pie
                      data={stats?.serviceTypeData || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats?.serviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} waybills`, "Count"]} />
                    <Legend />
                  </RechartsChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

