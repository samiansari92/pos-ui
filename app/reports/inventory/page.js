"use client";
import { PageContainer } from "@/components/layout/page-container";
import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Package, AlertTriangle, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { inventory } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";

const categoryData = [
  { name: "Vegetables", value: 4, cost: 680 },
  { name: "Meat", value: 2, cost: 3724 },
  { name: "Dairy", value: 3, cost: 2310 },
  { name: "Grains", value: 2, cost: 5100 },
  { name: "Oil", value: 1, cost: 532 },
];

const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"];

const wastageByCategory = [
  { category: "Vegetables", wastage: 3.0, cost: 117.5 },
  { category: "Meat", wastage: 0.8, cost: 304 },
  { category: "Dairy", wastage: 0.3, cost: 84 },
  { category: "Bakery", wastage: 12, cost: 144 },
];

export default function InventoryReportsPage() {
  const totalValue = inventory.reduce((s, i) => s + i.currentStock * i.unitCost, 0);
  const lowStockItems = inventory.filter(i => ["low", "critical", "out_of_stock"].includes(i.status));

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Inventory Reports</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Stock analysis and wastage tracking</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" />Export</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Stock Value", value: formatCurrency(totalValue), icon: DollarSign, color: "text-blue-500" },
          { label: "Total SKUs", value: inventory.length, icon: Package, color: "text-green-500" },
          { label: "Low/Out of Stock", value: lowStockItems.length, icon: AlertTriangle, color: "text-amber-500" },
          { label: "Wastage This Week", value: formatCurrency(649.5), icon: TrendingDown, color: "text-red-500" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <kpi.icon className={cn("h-4 w-4", kpi.color)} />
            </div>
            <p className="text-xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Stock by Category</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip formatter={(v, n) => [n === "cost" ? formatCurrency(v) : v, n === "cost" ? "Value" : "Items"]} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Stock Value Distribution</CardTitle></CardHeader>
          <CardContent className="flex flex-col">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="cost">
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {categoryData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                  <span className="font-medium ml-auto">{formatCurrency(item.cost)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Wastage Analysis</CardTitle><p className="text-xs text-muted-foreground">This week by category</p></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wastageByCategory.map(item => (
              <div key={item.category} className="flex items-center gap-4">
                <span className="text-sm w-24 text-muted-foreground">{item.category}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${(item.cost / 649.5) * 100}%` }} />
                </div>
                <span className="text-xs font-medium w-20 text-right text-red-500">-{formatCurrency(item.cost)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}