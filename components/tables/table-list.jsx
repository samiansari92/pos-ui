"use client";
import React from "react";
import { tables, orders } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, UtensilsCrossed } from "lucide-react";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";
import Link from "next/link";

export function TableListView({ floor }) {
  const floorTables = tables.filter(t => t.floor === floor);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {floorTables.map((table) => {
          const order = orders.find(o => o.id === table.orderId);
          return (
            <div
              key={table.id}
              className={cn(
                "rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md group",
                table.status === "available" && "border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800/30",
                table.status === "occupied" && "border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-800/30",
                table.status === "reserved" && "border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 dark:border-purple-800/30",
                table.status === "cleaning" && "border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800/30",
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-base font-bold">{table.number}</span>
                <Badge variant={table.status} className="text-[9px] h-4 px-1.5">{table.status}</Badge>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-1">
                <Users className="h-3 w-3" />{table.capacity} seats
              </div>
              {table.status === "occupied" && order && (
                <>
                  <p className="text-[11px] text-muted-foreground">{table.covers} pax · {table.waiter}</p>
                  <p className="text-xs font-semibold mt-1.5">{formatCurrency(order.total)}</p>
                  <p className="text-[10px] text-muted-foreground">{timeAgo(table.openedAt)}</p>
                </>
              )}
              {table.status === "reserved" && table.reservation && (
                <>
                  <p className="text-[11px] font-medium truncate">{table.reservation.name}</p>
                  <p className="text-[10px] text-muted-foreground">{table.reservation.time} · {table.reservation.covers} pax</p>
                </>
              )}
              {table.status === "available" && (
                <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-xs" asChild>
                  <Link href={`/pos?table=${table.id}`}>
                    <UtensilsCrossed className="h-3 w-3 mr-1" />New Order
                  </Link>
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
