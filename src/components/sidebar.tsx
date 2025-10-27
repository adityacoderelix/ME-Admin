"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  Building,
  Calendar,
  UserCheck,
  DollarSign,
  BarChart2,
  MessageSquare,
  Settings,
  HelpCircle,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarComponent className="border-r">
      <SidebarHeader>
        <div className="w-full flex items-center gap-2 px-4 py-2">
          <Image
            width={200}
            height={100}
            src="/logo.svg"
            className="w-12 h-12"
            alt="Logo"
          />
          <span className="text-lg text-black font-medium">
            Majestic Escape
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard"
                className={pathname === "/dashboard" ? "text-primary" : ""}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/guests"
                className={
                  pathname === "/dashboard/guests" ? "text-primary" : ""
                }
              >
                <Users className="mr-2 h-4 w-4" />
                Guests
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/properties"
                className={
                  pathname === "/dashboard/properties" ? "text-primary" : ""
                }
              >
                <Building className="mr-2 h-4 w-4" />
                Properties
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/bookings"
                className={
                  pathname === "/dashboard/bookings" ? "text-primary" : ""
                }
              >
                <Calendar className="mr-2 h-4 w-4" />
                Bookings
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/host-history"
                className={
                  pathname === "/dashboard/host-history" ? "text-primary" : ""
                }
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Hosts
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {/* <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/financials" className={pathname === '/dashboard/financials' ? 'text-primary' : ''}>
                <DollarSign className="mr-2 h-4 w-4" />
                Financials
              </Link>
            </Button> */}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/booking-history"
                className={
                  pathname === "/dashboard/booking-history"
                    ? "text-primary"
                    : ""
                }
              >
                <Calendar className="mr-2 h-4 w-4" />
                History
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/transactions"
                className={
                  pathname === "/dashboard/financials" ? "text-primary" : ""
                }
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Transactions
              </Link>
            </Button>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/analytics"
                className={
                  pathname === "/dashboard/analytics" ? "text-primary" : ""
                }
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/reviews"
                className={
                  pathname === "/dashboard/reviews" ? "text-primary" : ""
                }
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Reviews
              </Link>
            </Button>
          </SidebarMenuItem>

          {/* <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/complaints"
                className={
                  pathname === "/dashboard/complaints" ? "text-primary" : ""
                }
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Complaints
              </Link>
            </Button>
          </SidebarMenuItem> */}

          {/* <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/queries"
                className={
                  pathname === "/dashboard/queries" ? "text-primary" : ""
                }
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Queries
              </Link>
            </Button>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {/* <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/settings"
                className={
                  pathname === "/dashboard/settings" ? "text-primary" : ""
                }
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link
                href="/dashboard/help"
                className={pathname === "/dashboard/help" ? "text-primary" : ""}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Link>
            </Button>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </SidebarComponent>
  );
}
