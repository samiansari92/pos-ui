"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TableProperties, Plus, Grid3x3, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { tables, orders } from "@/lib/dummy-data";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";
import { TableFloorPlan } from "@/components/tables/floor-plan";
import { TableListView } from "@/components/tables/table-list";

export default function TablesPage() {
  const [view, setView] = useState("floor");
  const [selectedFloor, setSelectedFloor] = useState("Ground");
  const floors = [...new Set(tables.map(t => t.floor))];

  const stats = {
    available: tables.filter(t => t.status === "available").length,
    occupied: tables.filter(t => t.status === "occupied").length,
    reserved: tables.filter(t => t.status === "reserved").length,
    cleaning: tables.filter(t => t.status === "cleaning").length,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Table Management</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{tables.length} tables · {selectedFloor} Floor</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-500" />{stats.available} Available</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-orange-500" />{stats.occupied} Occupied</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-purple-500" />{stats.reserved} Reserved</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" />{stats.cleaning} Cleaning</span>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Add Table
            </Button>
          </div>
        </div>

        {/* Floor selector + view toggle */}
        <div className="flex items-center justify-between mt-4 gap-4">
          <div className="flex items-center gap-1.5">
            {floors.map(floor => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  selectedFloor === floor
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {floor} Floor
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
            <button
              onClick={() => setView("floor")}
              className={cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all", view === "floor" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")}
            >
              <Grid3x3 className="h-3.5 w-3.5" /> Floor Plan
            </button>
            <button
              onClick={() => setView("list")}
              className={cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all", view === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")}
            >
              <Layers className="h-3.5 w-3.5" /> List View
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {view === "floor" ? (
          <TableFloorPlan floor={selectedFloor} />
        ) : (
          <TableListView floor={selectedFloor} />
        )}
      </div>
    </div>
  );
}
