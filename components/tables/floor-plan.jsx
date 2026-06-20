"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tables, orders } from "@/lib/dummy-data";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, UtensilsCrossed, X, ChevronRight } from "lucide-react";
import Link from "next/link";

const tableStatusStyle = {
  available: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800/50",
    text: "text-green-700 dark:text-green-400",
    dot: "bg-green-500",
    label: "Available",
  },
  occupied: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800/50",
    text: "text-orange-700 dark:text-orange-400",
    dot: "bg-orange-500",
    label: "Occupied",
  },
  reserved: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800/50",
    text: "text-purple-700 dark:text-purple-400",
    dot: "bg-purple-500",
    label: "Reserved",
  },
  cleaning: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800/50",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
    label: "Cleaning",
  },
};

function TableCard({ table }) {
  const [showDetail, setShowDetail] = useState(false);
  const style = tableStatusStyle[table.status];
  const order = orders.find(o => o.id === table.orderId);
  const isRound = table.shape === "round";

  return (
    <>
      <motion.button
        onClick={() => setShowDetail(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "absolute border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer shadow-sm",
          isRound ? "rounded-full" : "rounded-xl",
          style.bg, style.border
        )}
        style={{ left: table.x, top: table.y, width: table.width, height: table.height }}
      >
        <span className={cn("text-sm font-bold", style.text)}>{table.number}</span>
        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
          <Users className="h-2.5 w-2.5" />{table.capacity}
        </span>
        {table.covers && (
          <span className="text-[10px] text-muted-foreground">{table.covers} pax</span>
        )}
        <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
      </motion.button>

      {/* Detail panel */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetail(false)} />
            <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-5">
              <button onClick={() => setShowDetail(false)} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors">
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold border-2", style.bg, style.border, style.text)}>
                  {table.number}
                </div>
                <div>
                  <h3 className="font-semibold">Table {table.number}</h3>
                  <p className="text-xs text-muted-foreground">{table.floor} · {table.zone} · {table.capacity} seats</p>
                </div>
                <Badge variant={table.status} className="ml-auto">{style.label}</Badge>
              </div>

              {table.status === "occupied" && order && (
                <div className="rounded-xl bg-muted/50 p-3 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Order</span>
                    <span className="font-medium">{order.orderNo}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Covers</span>
                    <span className="font-medium">{table.covers} guests</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Waiter</span>
                    <span className="font-medium">{table.waiter}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Opened</span>
                    <span className="font-medium">{timeAgo(table.openedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                    <span className="text-muted-foreground">Bill Amount</span>
                    <span className="font-bold text-foreground">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              )}

              {table.status === "reserved" && table.reservation && (
                <div className="rounded-xl bg-purple-50/50 dark:bg-purple-950/20 p-3 space-y-1.5 mb-4 border border-purple-100 dark:border-purple-800/30">
                  <p className="text-xs font-medium text-purple-700 dark:text-purple-400 mb-2">Reservation Details</p>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Guest</span><span className="font-medium">{table.reservation.name}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Time</span><span className="font-medium">{table.reservation.time}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Covers</span><span className="font-medium">{table.reservation.covers} pax</span></div>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Phone</span><span className="font-medium">{table.reservation.phone}</span></div>
                </div>
              )}

              <div className="flex gap-2">
                {table.status === "available" && (
                  <Button asChild className="flex-1 h-9 text-xs">
                    <Link href={`/pos?table=${table.id}`}><UtensilsCrossed className="h-3.5 w-3.5 mr-1.5" />New Order</Link>
                  </Button>
                )}
                {table.status === "occupied" && (
                  <>
                    <Button variant="outline" className="flex-1 h-9 text-xs">View Bill</Button>
                    <Button className="flex-1 h-9 text-xs">Settle</Button>
                  </>
                )}
                {table.status === "cleaning" && (
                  <Button variant="success" className="flex-1 h-9 text-xs">Mark Clean</Button>
                )}
                {table.status === "reserved" && (
                  <Button className="flex-1 h-9 text-xs">Seat Guests</Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function TableFloorPlan({ floor }) {
  const floorTables = tables.filter(t => t.floor === floor);
  const canvasW = 680;
  const canvasH = 540;

  return (
    <div className="flex-1 overflow-auto p-6">
      <div
        className="relative floor-canvas rounded-2xl border border-border bg-muted/20 mx-auto"
        style={{ width: canvasW, height: canvasH, minHeight: canvasH }}
      >
        {/* Zone labels */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {[...new Set(floorTables.map(t => t.zone))].map(zone => (
            <span key={zone} className="text-[10px] font-medium text-muted-foreground bg-background/80 backdrop-blur-sm border border-border rounded-md px-2 py-0.5">
              {zone}
            </span>
          ))}
        </div>

        {/* Tables */}
        {floorTables.map(table => (
          <TableCard key={table.id} table={table} />
        ))}

        {/* Legend */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-xl p-3">
          {Object.entries(tableStatusStyle).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className={cn("h-2 w-2 rounded-full", val.dot)} />
              {val.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
