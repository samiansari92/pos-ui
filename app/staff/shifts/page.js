"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight, Sun, Moon, Sunset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { staff } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [16, 17, 18, 19, 20, 21, 22];

const shiftData = {
  "emp_01": { Mon: "M", Tue: "M", Wed: "M", Thu: "M", Fri: "M", Sat: "OFF", Sun: "OFF" },
  "emp_02": { Mon: "M", Tue: "M", Wed: "E", Thu: "M", Fri: "E", Sat: "M", Sun: "OFF" },
  "emp_03": { Mon: "E", Tue: "E", Wed: "M", Thu: "E", Fri: "E", Sat: "E", Sun: "OFF" },
  "emp_04": { Mon: "M", Tue: "M", Wed: "M", Thu: "M", Fri: "M", Sat: "M", Sun: "M" },
  "emp_05": { Mon: "E", Tue: "E", Wed: "E", Thu: "E", Fri: "E", Sat: "E", Sun: "OFF" },
  "emp_06": { Mon: "E", Tue: "OFF", Wed: "E", Thu: "E", Fri: "E", Sat: "E", Sun: "E" },
  "emp_07": { Mon: "M", Tue: "M", Wed: "M", Thu: "M", Fri: "M", Sat: "OFF", Sun: "OFF" },
  "emp_08": { Mon: "E", Tue: "E", Wed: "E", Thu: "E", Fri: "E", Sat: "E", Sun: "E" },
};

const shiftConfig = {
  M: { label: "Morning", short: "M", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", icon: Sun, time: "8AM-4PM" },
  E: { label: "Evening", short: "E", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300", icon: Sunset, time: "4PM-12AM" },
  N: { label: "Night", short: "N", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", icon: Moon, time: "12AM-8AM" },
  OFF: { label: "Day Off", short: "OFF", color: "bg-muted text-muted-foreground", icon: null, time: "Off" },
};

export default function ShiftsPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const todayIdx = 3; // Thursday

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Shift Schedule</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Week of June 16–22, 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-border">
            <Button variant="ghost" size="icon-sm" onClick={() => setWeekOffset(w => w - 1)} className="rounded-r-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-3 text-xs font-medium">Jun 16–22</span>
            <Button variant="ghost" size="icon-sm" onClick={() => setWeekOffset(w => w + 1)} className="rounded-l-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add Shift</Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 flex-wrap">
        {Object.entries(shiftConfig).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs">
            <span className={cn("px-2 py-0.5 rounded-md font-medium text-[10px]", val.color)}>{val.short}</span>
            <span className="text-muted-foreground">{val.label} · {val.time}</span>
          </div>
        ))}
      </div>

      {/* Shift grid */}
      <div className="rounded-xl border bg-card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-border bg-muted/30">
          <div className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee</div>
          {days.map((day, i) => (
            <div key={day} className={cn("px-2 py-3 text-center", i === todayIdx && "bg-primary/10")}>
              <p className="text-xs font-semibold text-muted-foreground">{day}</p>
              <p className={cn("text-sm font-bold", i === todayIdx ? "text-primary" : "text-foreground")}>{dates[i]}</p>
              {i === todayIdx && <p className="text-[9px] text-primary font-medium">Today</p>}
            </div>
          ))}
        </div>

        {/* Rows */}
        {staff.map((emp, i) => {
          const empShifts = shiftData[emp.id] || {};
          return (
            <motion.div key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className={cn("grid grid-cols-[200px_repeat(7,1fr)] items-center", i < staff.length - 1 && "border-b border-border")}>
              <div className="flex items-center gap-2.5 px-4 py-3">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">{emp.avatar}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{emp.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-muted-foreground capitalize truncate">{emp.role.replace("_", " ")}</p>
                </div>
              </div>
              {days.map((day, di) => {
                const shift = empShifts[day] || "OFF";
                const config = shiftConfig[shift];
                return (
                  <div key={day} className={cn("flex items-center justify-center p-2", di === todayIdx && "bg-primary/5")}>
                    <span className={cn("px-2 py-1 rounded-lg text-[11px] font-semibold w-full text-center cursor-pointer hover:opacity-80 transition-opacity", config.color)}>
                      {shift}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
        {days.map((day, i) => {
          const onDuty = staff.filter(s => shiftData[s.id]?.[day] !== "OFF" && shiftData[s.id]?.[day]).length;
          return (
            <div key={day} className={cn("rounded-lg border p-3 text-center", i === todayIdx && "border-primary/30 bg-primary/5")}>
              <p className="text-xs text-muted-foreground">{day}</p>
              <p className="text-lg font-bold mt-0.5">{onDuty}</p>
              <p className="text-[10px] text-muted-foreground">on duty</p>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}