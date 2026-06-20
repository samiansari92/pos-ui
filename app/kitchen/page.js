"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChefHat, Check, AlertCircle, Bell, RefreshCw, Timer, Flame, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/lib/dummy-data";
import { timeAgo, cn } from "@/lib/utils";
import { toast } from "sonner";

const kitchenOrders = [
  {
    id: "ko_01", orderNo: "ORD-2402", tableName: "T3", type: "dine-in",
    waiter: "Priya M", covers: 4, priority: "high",
    items: [
      { id: "i1", name: "Chicken Biryani", qty: 2, station: "Biryani", status: "preparing", notes: "" },
      { id: "i2", name: "Palak Paneer", qty: 1, station: "Main", status: "pending", notes: "Less spicy" },
    ],
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    elapsedMin: 12,
    status: "preparing",
  },
  {
    id: "ko_02", orderNo: "ORD-2401", tableName: "T2", type: "dine-in",
    waiter: "Ravi K", covers: 3, priority: "normal",
    items: [
      { id: "i3", name: "Garlic Naan", qty: 4, station: "Tandoor", status: "preparing", notes: "" },
    ],
    createdAt: new Date(Date.now() - 8 * 60000).toISOString(),
    elapsedMin: 8,
    status: "preparing",
  },
  {
    id: "ko_03", orderNo: "ORD-2404", tableName: "T9", type: "dine-in",
    waiter: "Meena R", covers: 2, priority: "normal",
    items: [
      { id: "i5", name: "Paneer Tikka", qty: 1, station: "Tandoor", status: "ready", notes: "" },
      { id: "i6", name: "Mango Lassi", qty: 2, station: "Beverage", status: "ready", notes: "" },
    ],
    createdAt: new Date(Date.now() - 16 * 60000).toISOString(),
    elapsedMin: 16,
    status: "ready",
  },
  {
    id: "ko_04", orderNo: "ORD-2405", tableName: null, type: "delivery",
    waiter: "Online", covers: 1, priority: "normal",
    items: [
      { id: "i7", name: "Chicken Biryani", qty: 1, station: "Biryani", status: "pending", notes: "Extra raita" },
    ],
    createdAt: new Date(Date.now() - 4 * 60000).toISOString(),
    elapsedMin: 4,
    status: "pending",
  },
  {
    id: "ko_05", orderNo: "ORD-2406", tableName: "T7", type: "dine-in",
    waiter: "Arjun S", covers: 7, priority: "urgent",
    items: [
      { id: "i8", name: "Butter Chicken", qty: 3, station: "Main", status: "preparing", notes: "" },
      { id: "i9", name: "Dal Makhani", qty: 2, station: "Main", status: "pending", notes: "" },
      { id: "i10", name: "Naan", qty: 8, station: "Tandoor", status: "preparing", notes: "" },
    ],
    createdAt: new Date(Date.now() - 22 * 60000).toISOString(),
    elapsedMin: 22,
    status: "delayed",
  },
];

function KitchenOrderCard({ order, onMarkReady, onComplete }) {
  const isDelayed = order.elapsedMin > 20;
  const isUrgent = order.priority === "urgent";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      className={cn(
        "rounded-2xl border-2 bg-card overflow-hidden flex flex-col",
        order.status === "ready" && "border-green-400 dark:border-green-600",
        order.status === "delayed" && "border-red-400 dark:border-red-600",
        order.status === "pending" && "border-blue-300 dark:border-blue-700",
        order.status === "preparing" && !isDelayed && "border-amber-300 dark:border-amber-600",
        isDelayed && order.status !== "ready" && "border-red-400 dark:border-red-600",
      )}
    >
      {/* Header */}
      <div className={cn(
        "px-4 py-3 flex items-center justify-between border-b",
        order.status === "ready" ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/50"
          : isDelayed ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50"
            : "bg-muted/50 border-border"
      )}>
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight">{order.orderNo}</span>
          {order.tableName ? (
            <Badge variant="outline" className="text-xs font-bold">
              Table {order.tableName}
            </Badge>
          ) : (
            <Badge variant="purple" className="text-xs">Delivery</Badge>
          )}
          {isUrgent && (
            <Badge variant="error" className="text-xs flex items-center gap-1">
              <Flame className="h-2.5 w-2.5" />URGENT
            </Badge>
          )}
        </div>
        <div className={cn(
          "flex items-center gap-1.5 text-sm font-bold",
          isDelayed ? "text-red-600" : order.elapsedMin > 12 ? "text-amber-600" : "text-muted-foreground"
        )}>
          <Timer className="h-4 w-4" />
          {order.elapsedMin}m
          {isDelayed && <AlertCircle className="h-4 w-4 text-red-600" />}
        </div>
      </div>

      {/* Waiter info */}
      <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border bg-muted/20">
        {order.covers} covers · {order.waiter}
      </div>

      {/* Items */}
      <div className="flex-1 p-4 space-y-2.5">
        {order.items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start gap-3 rounded-xl p-3 border transition-all",
              item.status === "ready" ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30"
                : item.status === "preparing" ? "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30"
                  : "bg-muted/50 border-border"
            )}
          >
            <div className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black",
              item.status === "ready" ? "bg-green-500 text-white"
                : item.status === "preparing" ? "bg-amber-500 text-white"
                  : "bg-muted-foreground/20 text-foreground"
            )}>
              {item.qty}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.station}</p>
              {item.notes && (
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 font-medium flex items-center gap-1">
                    <StickyNote className="h-3 w-3 shrink-0" />{item.notes}
                  </p>
                )}
            </div>
            <Badge
              variant={item.status === "ready" ? "success" : item.status === "preparing" ? "warning" : "info"}
              className="text-[10px] shrink-0"
            >
              {item.status}
            </Badge>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 flex gap-2">
        {order.status !== "ready" && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-10 text-xs gap-1.5"
            onClick={() => onMarkReady(order.id)}
          >
            <Check className="h-4 w-4" />
            Mark Ready
          </Button>
        )}
        {order.status === "ready" && (
          <Button
            variant="success"
            size="sm"
            className="flex-1 h-10 text-xs gap-1.5"
            onClick={() => onComplete(order.id)}
          >
            <Bell className="h-4 w-4" />
            Notify Waiter
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default function KitchenPage() {
  const [orders_, setOrders] = useState(kitchenOrders);
  const [filter, setFilter] = useState("all");

  const handleMarkReady = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "ready" } : o));
    toast.success("Order marked as ready!", { description: "Waiter has been notified" });
  };

  const handleComplete = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    toast.success("Order sent to waiter", { duration: 2000 });
  };

  const filtered = filter === "all" ? orders_ : orders_.filter(o => o.status === filter);

  const counts = {
    all: orders_.length,
    pending: orders_.filter(o => o.status === "pending").length,
    preparing: orders_.filter(o => o.status === "preparing" || o.status === "delayed").length,
    ready: orders_.filter(o => o.status === "ready").length,
  };

  return (
    <div className="flex flex-col h-full">
      {/* KDS Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950/30">
              <ChefHat className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Kitchen Display System</h1>
              <p className="text-xs text-muted-foreground">{orders_.length} active orders · Spice Garden MG Road</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500 pulse-dot" />
              Live
            </span>
            <Button variant="ghost" size="icon-sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mt-4">
          {[
            { key: "all", label: "All Orders" },
            { key: "pending", label: "New" },
            { key: "preparing", label: "Preparing" },
            { key: "ready", label: "Ready" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                filter === key ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {label}
              {counts[key] > 0 && (
                <span className={cn(
                  "flex h-4 min-w-4 items-center justify-center rounded-full text-[10px] font-bold px-1",
                  filter === key ? "bg-background/20 text-background" : "bg-muted text-foreground"
                )}>
                  {counts[key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(order => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onMarkReady={handleMarkReady}
                onComplete={handleComplete}
              />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <ChefHat className="h-16 w-16 text-muted-foreground/20 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Kitchen is all caught up!</p>
              <p className="text-sm text-muted-foreground mt-1">No {filter === "all" ? "" : filter} orders right now</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
