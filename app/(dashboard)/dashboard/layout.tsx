import type React from "react"
import { Sidebar } from "@/components/Sidebar"
import { AccountMenu } from "@/components/AccountMenu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Tabs defaultValue="create" className="ml-6">
              <TabsList>
                <TabsTrigger value="create" asChild>
                  <Link href="/dashboard">Create Waybill</Link>
                </TabsTrigger>
                <TabsTrigger value="scan" asChild>
                  <Link href="/dashboard/scan">Scan Waybill</Link>
                </TabsTrigger>
                <TabsTrigger value="templates" asChild>
                  <Link href="/dashboard/templates">Templates</Link>
                </TabsTrigger>
                <TabsTrigger value="statistics" asChild>
                  <Link href="/dashboard/statistics">Statistics</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <AccountMenu />
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

