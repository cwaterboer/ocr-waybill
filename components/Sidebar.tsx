"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  Truck,
  Map,
  Users,
  BarChart,
  Settings,
  HelpCircle,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Waybills", href: "/waybills" },
  { icon: Truck, label: "Parcels", href: "/parcels" },
  { icon: Map, label: "Routes", href: "/routes" },
  { icon: Users, label: "Clients", href: "/clients" },
  { icon: BarChart, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Support", href: "/support" },
]

export function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col border-r bg-gray-100/40 dark:bg-gray-800/40", expanded ? "w-64" : "w-[68px]")}>
      <div className="p-4 border-b flex justify-between items-center">
        {expanded && (
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M5 12V5a2 2 0 0 1 2-2h7l5 5v4" />
                <path d="M5 18a2 2 0 0 0 2 2h3" />
                <path d="M20 18a2 2 0 0 1-2 2h-3" />
                <path d="M15 12v6" />
                <path d="M9 18h6" />
              </svg>
            </div>
            <span className="text-lg font-bold">OCR Waybill</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)} className="ml-auto">
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-2">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", expanded ? "px-4" : "px-2")}
              >
                <item.icon className={cn("h-5 w-5", expanded ? "mr-2" : "mr-0")} />
                {expanded && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

