"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { TrendingUp, Download, Calendar, ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { salesChartData, weeklyData, topProducts, dashboardKPIs } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";

const monthlyData = [
  { month: "Jan", revenue: 2240000, orders: 1820 },
  { month: "Feb", revenue: 1980000, orders: 1650 },
  { month: "Mar", revenue: 2560000, orders: 2100 },
  { month: "Apr", revenue: 2180000, orders: 1790 },
  { month: "May", revenue: 2890000, orders: 2340 },
  { month: "Jun", revenue: 2845600, orders: 2280 },
];

const paymentBreakdown = [
  { name: "UPI", value: 48, color: "#8b5cf6" },
  { name: "Cash", value: 28, color: "#22c55e" },
  { name: "Card", value: 18, color: "#3b82f6" },
  { name: "Online", value: 6, color: "#f59e0b" },
];

const orderTypeBreakdown = [
  { name: "Dine-In", value: 62, color: "#3b82f6" },
  { name: "Delivery", value: 23, color: "#f59e0b" },
  { name: "Takeaway", value: 15, color: "#22c55e" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border bg-popover p-3 shadow-lg text-xs">
        <p className="font-semibold mb-1.5">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name}:</span>
            <span className="font-medium">{entry.name === "revenue" ? formatCurrency(entry.value) : entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function SalesReportsPage() {
  const [period, setPeriod] = useState("month");

  const kpis = [
    { label: "Total Revenue", value: dashboardKPIs.monthRevenue, change: "+18.4%", format: "currency", color: "blue" },
    { label: "Total Orders", value: 2280, change: "+12.1%", format: "number", color: "green" },
    { label: "Avg Order Value", value: dashboardKPIs.avgOrderValue, change: "+5.6%", format: "currency", color: "purple" },
    { label: "New Customers", value: 184, change: "+22.3%", format: "number", color: "orange" },
  ];

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Sales Reports</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Spice Garden MG Road · June 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar className="h-3.5 w-3.5" />June 2026
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />Export
          </Button>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex gap-1.5">
        {["today", "week", "month", "year"].map(p => (
          <button key={p} onClick={() => setPeriod(p)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize", period === p ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
            {p === "today" ? "Today" : p === "week" ? "This Week" : p === "month" ? "This Month" : "This Year"}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-2">{kpi.label}</p>
            <p className="text-2xl font-bold">{kpi.format === "currency" ? formatCurrency(kpi.value) : kpi.value.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">{kpi.change}</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <p className="text-xs text-muted-foreground">Monthly revenue for 2026</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/100000).toFixed(1)}L`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#rev)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={paymentBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {paymentBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {paymentBreakdown.map(item => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order type + Top products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderTypeBreakdown.map(type => (
                <div key={type.name} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20">{type.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${type.value}%`, background: type.color }} />
                  </div>
                  <span className="text-xs font-bold w-8 text-right">{type.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top Products</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs font-medium">{p.name}</span>
                      <span className="text-xs font-bold">{p.sales} sold</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(p.sales / topProducts[0].sales) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground w-20 text-right">{formatCurrency(p.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}