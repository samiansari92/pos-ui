"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { staff } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

const attendanceToday = staff.map(s => ({
  ...s,
  checkIn: s.status === "active" ? (Math.random() > 0.2 ? new Date(Date.now() - Math.random() * 8 * 3600000).toISOString() : null) : null,
  checkOut: null,
  status: Math.random() > 0.15 ? "present" : Math.random() > 0.5 ? "late" : "absent",
  hoursWorked: Math.random() > 0.2 ? (4 + Math.random() * 4).toFixed(1) : 0,
}));

export default function AttendancePage() {
  const present = attendanceToday.filter(a => a.status === "present").length;
  const late = attendanceToday.filter(a => a.status === "late").length;
  const absent = attendanceToday.filter(a => a.status === "absent").length;

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Attendance</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Today · June 18, 2026</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Calendar className="h-3.5 w-3.5" />View Calendar
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Staff", value: staff.length, icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
          { label: "Present", value: present, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/20" },
          { label: "Late", value: late, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20" },
          { label: "Absent", value: absent, icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/20" },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center", item.bg)}>
                <item.icon className={cn("h-4 w-4", item.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold">{item.value}</p>
            <Progress value={(item.value / staff.length) * 100} className="mt-2 h-1" indicatorClassName={item.color.replace("text", "bg")} />
          </motion.div>
        ))}
      </div>

      {/* Attendance table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h2 className="text-sm font-semibold">Today's Attendance Log</h2>
        </div>
        <div className="divide-y divide-border">
          {attendanceToday.map((emp, i) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-4 py-3.5 hover:bg-muted/30 transition-colors"
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">{emp.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{emp.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{emp.role.replace("_", " ")} · {emp.shift} Shift</p>
              </div>
              <div className="text-center w-28">
                {emp.checkIn ? (
                  <div>
                    <p className="text-xs font-medium flex items-center gap-1 justify-center">
                      <Clock className="h-3 w-3 text-green-500" />
                      {new Date(emp.checkIn).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Check-in</p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
                )}
              </div>
              <div className="text-center w-20">
                <p className="text-xs font-medium">{emp.hoursWorked}h</p>
                <p className="text-[10px] text-muted-foreground">Hours</p>
              </div>
              <div className="w-20 flex justify-end">
                <Badge
                  variant={emp.status === "present" ? "success" : emp.status === "late" ? "warning" : "error"}
                  className="text-[10px] capitalize"
                >
                  {emp.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}