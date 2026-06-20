"use client";
import React from "react";
import { AlertTriangle, XCircle, Package, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { inventory } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function InventoryAlerts() {
  const alerts = inventory.filter(i => ["low", "critical", "out_of_stock"].includes(i.status));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Inventory Alerts</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{alerts.length} items need attention</p>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
          <Link href="/inventory">View all <ChevronRight className="h-3 w-3 ml-0.5" /></Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {alerts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-3 rounded-lg p-3 border",
              item.status === "out_of_stock"
                ? "bg-red-50/50 border-red-100 dark:bg-red-950/20 dark:border-red-900/30"
                : item.status === "critical"
                  ? "bg-orange-50/50 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30"
                  : "bg-yellow-50/50 border-yellow-100 dark:bg-yellow-950/20 dark:border-yellow-900/30"
            )}
          >
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              item.status === "out_of_stock" ? "bg-red-100 dark:bg-red-900/30"
                : item.status === "critical" ? "bg-orange-100 dark:bg-orange-900/30"
                  : "bg-yellow-100 dark:bg-yellow-900/30"
            )}>
              {item.status === "out_of_stock"
                ? <XCircle className="h-4 w-4 text-red-600" />
                : <AlertTriangle className="h-4 w-4 text-orange-500" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium truncate">{item.name}</p>
                <Badge
                  variant={item.status === "out_of_stock" ? "error" : item.status === "critical" ? "orange" : "warning"}
                  className="text-[9px] h-3.5 px-1.5 py-0 shrink-0"
                >
                  {item.status === "out_of_stock" ? "Out of Stock" : item.status === "critical" ? "Critical" : "Low Stock"}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {item.currentStock} {item.unit} remaining · Min: {item.minStock} {item.unit}
              </p>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="flex flex-col items-center py-6 text-center">
            <Package className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">All stock levels are healthy</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
