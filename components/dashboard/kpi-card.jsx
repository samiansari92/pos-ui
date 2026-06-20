"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

export function KPICard({ title, value, change, changeLabel, icon: Icon, color = "blue", format = "number", delay = 0 }) {
  const isPositive = change >= 0;
  const colorMap = {
    blue: { bg: "bg-blue-50 dark:bg-blue-950/30", icon: "text-blue-600 dark:text-blue-400", border: "border-blue-100 dark:border-blue-900/50" },
    green: { bg: "bg-green-50 dark:bg-green-950/30", icon: "text-green-600 dark:text-green-400", border: "border-green-100 dark:border-green-900/50" },
    orange: { bg: "bg-orange-50 dark:bg-orange-950/30", icon: "text-orange-600 dark:text-orange-400", border: "border-orange-100 dark:border-orange-900/50" },
    purple: { bg: "bg-purple-50 dark:bg-purple-950/30", icon: "text-purple-600 dark:text-purple-400", border: "border-purple-100 dark:border-purple-900/50" },
    red: { bg: "bg-red-50 dark:bg-red-950/30", icon: "text-red-600 dark:text-red-400", border: "border-red-100 dark:border-red-900/50" },
    cyan: { bg: "bg-cyan-50 dark:bg-cyan-950/30", icon: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-100 dark:border-cyan-900/50" },
  };
  const colors = colorMap[color] || colorMap.blue;

  const displayValue = format === "currency" ? formatCurrency(value) : format === "percent" ? `${value}%` : formatNumber(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn("rounded-xl border bg-card p-5 hover:shadow-md transition-shadow duration-200", colors.border)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{displayValue}</p>
          {change !== undefined && (
            <div className="mt-1.5 flex items-center gap-1">
              {isPositive
                ? <TrendingUp className="h-3 w-3 text-green-600" />
                : <TrendingDown className="h-3 w-3 text-red-500" />}
              <span className={cn("text-xs font-medium", isPositive ? "text-green-600" : "text-red-500")}>
                {isPositive ? "+" : ""}{change}%
              </span>
              {changeLabel && <span className="text-xs text-muted-foreground">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", colors.bg)}>
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>
      </div>
    </motion.div>
  );
}

export function KPICardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="shimmer h-3 w-24 rounded mb-3" />
          <div className="shimmer h-7 w-32 rounded mb-2" />
          <div className="shimmer h-3 w-20 rounded" />
        </div>
        <div className="shimmer h-10 w-10 rounded-xl shrink-0" />
      </div>
    </div>
  );
}
