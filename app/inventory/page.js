"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, AlertTriangle, XCircle, CheckCircle, Package, TrendingDown, BarChart2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { inventory } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";

const statusConfig = {
  adequate: { label: "Adequate", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/20", badge: "success" },
  low: { label: "Low Stock", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20", badge: "warning" },
  critical: { label: "Critical", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/20", badge: "orange" },
  out_of_stock: { label: "Out of Stock", icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/20", badge: "error" },
};

const kpis = [
  { label: "Total Items", value: "8", icon: Package, color: "blue" },
  { label: "Low Stock", value: "2", icon: AlertTriangle, color: "yellow" },
  { label: "Critical", value: "1", icon: TrendingDown, color: "orange" },
  { label: "Out of Stock", value: "1", icon: XCircle, color: "red" },
];

import { PageContainer, PageHeader } from "@/components/layout/page-container";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = inventory.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStockPercent = (item) => Math.min(100, Math.round((item.currentStock / item.maxStock) * 100));

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Inventory</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Stock levels and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><RefreshCw className="h-3.5 w-3.5" />Refresh</Button>
          <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add Item</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <kpi.icon className={cn("h-4 w-4", kpi.color === "blue" ? "text-blue-500" : kpi.color === "yellow" ? "text-amber-500" : kpi.color === "orange" ? "text-orange-500" : "text-red-500")} />
            </div>
            <p className="text-2xl font-bold mt-2">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-8 text-xs" />
        </div>
        <div className="flex gap-1.5">
          {["all", "adequate", "low", "critical", "out_of_stock"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize", filterStatus === s ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted")}
            >
              {s === "all" ? "All" : s === "out_of_stock" ? "Out of Stock" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr_1fr_1fr] gap-4 px-4 py-2.5 border-b border-border bg-muted/30 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
          <span>Item</span>
          <span>Category</span>
          <span className="text-center">Current</span>
          <span>Level</span>
          <span className="text-center">Min</span>
          <span>Supplier</span>
          <span className="text-center">Status</span>
        </div>

        {filtered.map((item, i) => {
          const status = statusConfig[item.status];
          const percent = getStockPercent(item);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className={cn("grid grid-cols-[2fr_1fr_1fr_2fr_1fr_1fr_1fr] gap-4 px-4 py-3.5 items-center transition-colors hover:bg-muted/30", i < filtered.length - 1 && "border-b border-border")}
            >
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                {item.expiryDate && (
                  <p className="text-[10px] text-muted-foreground">Exp: {item.expiryDate}</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.category}</p>
              <div className="text-center">
                <p className={cn("text-sm font-bold", item.status === "out_of_stock" ? "text-red-600" : item.status === "critical" ? "text-orange-600" : item.status === "low" ? "text-amber-600" : "text-foreground")}>
                  {item.currentStock}
                </p>
                <p className="text-[10px] text-muted-foreground">{item.unit}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{percent}%</span>
                  <span>Max: {item.maxStock}{item.unit}</span>
                </div>
                <Progress
                  value={percent}
                  className="h-1.5"
                  indicatorClassName={cn(
                    item.status === "out_of_stock" ? "bg-red-500"
                      : item.status === "critical" ? "bg-orange-500"
                        : item.status === "low" ? "bg-amber-500"
                          : "bg-green-500"
                  )}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{item.minStock}</p>
                <p className="text-[10px] text-muted-foreground">{item.unit}</p>
              </div>
              <p className="text-xs text-muted-foreground truncate">{item.supplier}</p>
              <div className="flex justify-center">
                <Badge variant={status.badge} className="text-[10px] whitespace-nowrap">
                  {status.label}
                </Badge>
              </div>
            </motion.div>
          );
        })}
      </div>
    </PageContainer>
  );
}
