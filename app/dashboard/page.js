"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, ShoppingCart, Users, TableProperties, ChefHat,
  CreditCard, Clock, AlertCircle
} from "lucide-react";
import { KPICard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { LiveOrders } from "@/components/dashboard/live-orders";
import { TopProducts } from "@/components/dashboard/top-products";
import { InventoryAlerts } from "@/components/dashboard/inventory-alerts";
import { tables, staff } from "@/lib/dummy-data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageContainer } from "@/components/layout/page-container";
import Link from "next/link";

const kpiCards = [
  { title: "Today's Revenue",  value: 124680, change: 26.8, changeLabel: "vs yesterday", icon: TrendingUp,      color: "blue",   format: "currency" },
  { title: "Total Orders",     value: 87,     change: 14.5, changeLabel: "vs yesterday", icon: ShoppingCart,    color: "green",  format: "number"   },
  { title: "Active Orders",    value: 12,     change: -5.2, changeLabel: "vs 1h ago",    icon: Clock,           color: "orange", format: "number"   },
  { title: "Customers Served", value: 213,    change: 18.2, changeLabel: "vs yesterday", icon: Users,           color: "purple", format: "number"   },
  { title: "Avg Order Value",  value: 1432,   change: 8.3,  changeLabel: "vs yesterday", icon: CreditCard,      color: "cyan",   format: "currency" },
  { title: "Table Occupancy",  value: 65,     change: 12.4, changeLabel: "vs yesterday", icon: TableProperties, color: "blue",   format: "percent"  },
  { title: "Kitchen Load",     value: 72,     change: 5.1,  changeLabel: "current",      icon: ChefHat,         color: "orange", format: "percent"  },
  { title: "Staff Present",    value: 18,     change: 0,    changeLabel: `of ${staff.length} total`, icon: Users, color: "green", format: "number" },
];

export default function DashboardPage() {
  const now = new Date();

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold tracking-tight"
          >
            Good {now.getHours() < 12 ? "Morning" : now.getHours() < 17 ? "Afternoon" : "Evening"}, Vikram
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground mt-1"
          >
            {formatDate(now, { weekday: "long", day: "numeric", month: "long" })} &middot; MG Road Branch
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-2"
        >
          <Button variant="outline" size="sm" asChild>
            <Link href="/reports/sales">View Reports</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/pos">New Sale</Link>
          </Button>
        </motion.div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpiCards.map((card, i) => (
          <KPICard key={card.title} {...card} delay={i * 0.05} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><RevenueChart /></div>
        <TopProducts />
      </div>

      {/* Live data row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><LiveOrders /></div>
        <InventoryAlerts />
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Table status */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold">Table Status</p>
            <Link href="/tables" className="text-xs text-primary hover:underline">Floor Plan</Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Available", count: tables.filter(t => t.status === "available").length, color: "bg-green-500" },
              { label: "Occupied",  count: tables.filter(t => t.status === "occupied").length,  color: "bg-orange-500" },
              { label: "Reserved",  count: tables.filter(t => t.status === "reserved").length,  color: "bg-purple-500" },
              { label: "Cleaning",  count: tables.filter(t => t.status === "cleaning").length,  color: "bg-blue-500" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${item.color}`} />
                <div>
                  <p className="text-lg font-bold leading-none">{item.count}</p>
                  <p className="text-[11px] text-muted-foreground">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <Progress
            value={Math.round((tables.filter(t => t.status === "occupied").length / tables.length) * 100)}
            className="mt-4 h-1.5"
            indicatorClassName="bg-orange-500"
          />
          <p className="text-[11px] text-muted-foreground mt-1.5">
            {Math.round((tables.filter(t => t.status === "occupied").length / tables.length) * 100)}% occupancy rate
          </p>
        </div>

        {/* Kitchen queue */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold">Kitchen Queue</p>
            <Link href="/kitchen" className="text-xs text-primary hover:underline">KDS View</Link>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "New Orders",       count: 4, color: "bg-blue-500",  urgent: false },
              { label: "In Preparation",   count: 7, color: "bg-amber-500", urgent: false },
              { label: "Ready to Serve",   count: 3, color: "bg-green-500", urgent: false },
              { label: "Delayed (>20min)", count: 2, color: "bg-red-500",   urgent: true  },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full shrink-0 ${item.color}`} />
                <span className="text-xs text-muted-foreground flex-1">{item.label}</span>
                <span className={`text-sm font-bold ${item.urgent ? "text-red-500" : "text-foreground"}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              2 orders past 20 min SLA
            </p>
          </div>
        </div>

        {/* Staff on duty */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold">Staff on Duty</p>
            <Link href="/staff/attendance" className="text-xs text-primary hover:underline">Attendance</Link>
          </div>
          <div className="space-y-2">
            {[
              { name: "Vikram Joshi",  role: "Manager",   initials: "VJ" },
              { name: "Chef Rajesh",   role: "Head Chef",  initials: "RN" },
              { name: "Ravi Kumar",    role: "Waiter",     initials: "RK" },
              { name: "Anita Sharma",  role: "Cashier",    initials: "AS" },
            ].map(person => (
              <div key={person.name} className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                  {person.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{person.name}</p>
                  <p className="text-[10px] text-muted-foreground">{person.role}</p>
                </div>
                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            <span className="font-medium text-foreground">18</span> of 22 staff checked in today
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
