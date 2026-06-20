"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight, UtensilsCrossed, Truck, QrCode } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { orders } from "@/lib/dummy-data";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

const statusConfig = {
  pending: { label: "Pending", color: "pending" },
  preparing: { label: "Preparing", color: "preparing" },
  serving: { label: "Serving", color: "ready" },
  dispatched: { label: "Dispatched", color: "info" },
  completed: { label: "Completed", color: "served" },
  cancelled: { label: "Cancelled", color: "cancelled" },
};

const typeIcons = {
  "dine-in": UtensilsCrossed,
  delivery: Truck,
  "qr-order": QrCode,
};

export function LiveOrders() {
  const liveOrders = orders.filter(o => !["completed", "cancelled"].includes(o.status));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <CardTitle>Live Orders</CardTitle>
          <span className="flex h-2 w-2 rounded-full bg-green-500 pulse-dot" />
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
          <Link href="/pos">View all <ChevronRight className="h-3 w-3 ml-0.5" /></Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {liveOrders.map((order, i) => {
          const TypeIcon = typeIcons[order.type] || UtensilsCrossed;
          const status = statusConfig[order.status] || statusConfig.pending;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer group border border-transparent hover:border-border"
            >
              <div className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                order.type === "delivery" ? "bg-purple-100 dark:bg-purple-950/30" : "bg-blue-100 dark:bg-blue-950/30"
              )}>
                <TypeIcon className={cn("h-4 w-4", order.type === "delivery" ? "text-purple-600" : "text-blue-600")} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{order.orderNo}</span>
                  <Badge variant={status.color} className="text-[10px] h-4 px-1.5">{status.label}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {order.tableName ? `Table ${order.tableName}` : order.deliveryAddress?.slice(0, 25) + "..."}
                  {" · "}{order.items.length} items
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold">{formatCurrency(order.total)}</p>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <Clock className="h-2.5 w-2.5 text-muted-foreground" />
                  <p className="text-[10px] text-muted-foreground">{timeAgo(order.createdAt)}</p>
                </div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </motion.div>
          );
        })}
        {liveOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <UtensilsCrossed className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">No active orders</p>
            <p className="text-xs text-muted-foreground mt-1">Orders will appear here in real-time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
