"use client";
import { PageContainer } from "@/components/layout/page-container";
import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, Scale, Percent, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";

const yieldData = [
  { recipe: "Butter Chicken", batches: 8, inputQty: 80, outputQty: 75.2, yieldPct: 94, waste: 4.8, cost: 12440 },
  { recipe: "Biryani Masala", batches: 12, inputQty: 24, outputQty: 22.8, yieldPct: 95, waste: 1.2, cost: 2880 },
  { recipe: "Tandoor Marination", batches: 6, inputQty: 90, outputQty: 82.5, yieldPct: 91.7, waste: 7.5, cost: 3150 },
  { recipe: "Dal Makhani", batches: 10, inputQty: 80, outputQty: 76, yieldPct: 95, waste: 4, cost: 4800 },
  { recipe: "Paneer Tikka Mix", batches: 5, inputQty: 25, outputQty: 23.8, yieldPct: 95.2, waste: 1.2, cost: 1680 },
];

export default function YieldReportsPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Yield Reports</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Production efficiency and wastage analysis</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" />Export</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Avg Yield Rate", value: `${(yieldData.reduce((s, y) => s + y.yieldPct, 0) / yieldData.length).toFixed(1)}%`, icon: Percent, color: "text-green-500" },
          { label: "Total Batches", value: yieldData.reduce((s, y) => s + y.batches, 0), icon: FlaskConical, color: "text-blue-500" },
          { label: "Total Waste", value: `${yieldData.reduce((s, y) => s + y.waste, 0).toFixed(1)} kg`, icon: Scale, color: "text-amber-500" },
          { label: "Waste Cost", value: formatCurrency(yieldData.reduce((s, y) => s + (y.waste * (y.cost / y.inputQty)), 0)), icon: TrendingUp, color: "text-red-500" },
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

      <Card>
        <CardHeader><CardTitle>Yield % by Recipe</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={yieldData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" domain={[85, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="recipe" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={130} />
              <Tooltip formatter={(v) => [`${v}%`, "Yield Rate"]} />
              <Bar dataKey="yieldPct" fill="#22c55e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h2 className="text-sm font-semibold">Detailed Yield Analysis</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Recipe</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Batches</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Input (kg)</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Output (kg)</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Waste (kg)</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Yield %</th>
            </tr>
          </thead>
          <tbody>
            {yieldData.map((row, i) => (
              <motion.tr key={row.recipe} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className={cn("hover:bg-muted/20 transition-colors", i < yieldData.length - 1 && "border-b border-border")}>
                <td className="px-4 py-3 font-medium">{row.recipe}</td>
                <td className="px-4 py-3 text-center text-muted-foreground">{row.batches}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{row.inputQty}</td>
                <td className="px-4 py-3 text-right text-green-600 font-medium">{row.outputQty}</td>
                <td className="px-4 py-3 text-right text-amber-600">{row.waste}</td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={row.yieldPct >= 94 ? "success" : row.yieldPct >= 90 ? "warning" : "error"} className="text-[10px]">
                    {row.yieldPct}%
                  </Badge>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}