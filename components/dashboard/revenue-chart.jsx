"use client";
import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { salesChartData, weeklyData } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border bg-popover p-3 shadow-lg text-xs">
        <p className="font-semibold text-foreground mb-1.5">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {entry.name === "revenue" ? formatCurrency(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  const [view, setView] = useState("today");
  const data = view === "today" ? salesChartData : weeklyData;
  const xKey = view === "today" ? "time" : "day";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {view === "today" ? "Today's hourly revenue" : "This week's daily revenue"}
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {["today", "week"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all capitalize ${view === v ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {v === "today" ? "Today" : "This Week"}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 90%, 56%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(220, 90%, 56%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              yAxisId="revenue"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }} />
            <Area
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="hsl(220, 90%, 56%)"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              dot={false}
              activeDot={{ r: 4, fill: "hsl(220, 90%, 56%)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
