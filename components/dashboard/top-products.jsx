"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { topProducts } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

export function TopProducts() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CardTitle>Top Products</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <p className="text-xs text-muted-foreground">By sales count this week</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {topProducts.map((product, i) => (
            <div key={product.name} className="flex items-center gap-3 group">
              <span className="text-xs font-bold text-muted-foreground w-4 shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium truncate">{product.name}</span>
                  <span className="text-xs font-semibold text-foreground shrink-0 ml-2">
                    {product.sales} sold
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(product.sales / topProducts[0].sales) * 100}%`,
                      backgroundColor: COLORS[i],
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 w-20 text-right">
                {formatCurrency(product.revenue)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
