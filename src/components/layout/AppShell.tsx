"use client";
import AppHeader from "@/components/layout/AppHeader";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarInset,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Home, Package, Users, LineChart, Shield, ChevronRight, CalendarCheck, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link href="/dashboard" className="flex h-16 items-center px-2">
            <Image src="/media/logo-full.png" alt="HemaSphere" width={260} height={64} className="h-14 w-auto group-data-[collapsible=icon]:hidden" />
            <Image src="/media/logo-icon.png" alt="HemaSphere" width={56} height={56} className="hidden size-12 group-data-[collapsible=icon]:block" />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>General</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                    <Link href="/dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/inventory")}>
                    <Link href="/dashboard/inventory">
                      <Package />
                      <span>Blood Inventory</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/requests")}>
                    <Link href="/dashboard/requests">
                      <Package />
                      <span>Requests & Allocation</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/appointments")}>
                    <Link href="/dashboard/appointments">
                      <CalendarCheck />
                      <span>Appointments</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/donors")}>
                    <Link href="/dashboard/donors">
                      <Users />
                      <span>Donor Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/users")}>
                    <Link href="/dashboard/users">
                      <Shield />
                      <span>User Access</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/analytics")}>
                    <Link href="/dashboard/analytics">
                      <LineChart />
                      <span>Analytics & Reports</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Link href="/dashboard/emergency" className="block">
            <Button variant="destructive" className="w-full flex items-center gap-2">
              <AlertTriangle />
              <span className="group-data-[collapsible=icon]:hidden">Emergency</span>
            </Button>
          </Link>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <div className="p-4">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-zinc-600">
            {(() => {
              const segs = pathname.split("/").filter(Boolean)
              const labelMap: Record<string, string> = {
                dashboard: "Dashboard",
                inventory: "Blood Inventory",
                requests: "Requests & Allocation",
                appointments: "Appointments",
                donors: "Donor Management",
                analytics: "Analytics & Reports",
                users: "User Access",
                emergency: "Emergency",
                manage: "Manage",
              }
              const items = segs.map((s, i) => {
                const href = "/" + segs.slice(0, i + 1).join("/")
                const label = labelMap[s] ?? s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
                const isLast = i === segs.length - 1
                return (
                  <span key={href} className="flex items-center gap-2">
                    {i === 0 ? null : <ChevronRight className="size-4" />}
                    {isLast ? (
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{label}</span>
                    ) : (
                      <a href={href} className="hover:text-zinc-900 dark:hover:text-zinc-100">{label}</a>
                    )}
                  </span>
                )
              })
              return items
            })()}
          </nav>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
