"use client";
import { PageContainer } from "@/components/layout/page-container";
import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Users, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { staff } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";

const attendanceData = [
  { name: "Mon", present: 20, absent: 2 },
  { name: "Tue", present: 19, absent: 3 },
  { name: "Wed", present: 21, absent: 1 },
  { name: "Thu", present: 18, absent: 4 },
  { name: "Fri", present: 0, absent: 0 },
  { name: "Sat", present: 0, absent: 0 },
];

export default function StaffReportsPage() {
  const avgAttendance = Math.round(staff.reduce((s, e) => s + e.attendance, 0) / staff.length);
  const totalPayroll = staff.reduce((s, e) => s + e.salary, 0);

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Staff Reports</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Attendance, performance and payroll overview</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" />Export</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Staff", value: staff.length, icon: Users, color: "text-blue-500" },
          { label: "Avg Attendance", value: `${avgAttendance}%`, icon: Clock, color: "text-green-500" },
          { label: "Monthly Payroll", value: formatCurrency(totalPayroll), icon: TrendingUp, color: "text-purple-500" },
          { label: "Departments", value: [...new Set(staff.map(s => s.department))].length, icon: Star, color: "text-orange-500" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <kpi.icon className={cn("h-4 w-4", kpi.color)} />
            </div>
            <p className="text-xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Weekly Attendance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="present" name="Present" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top Performers</CardTitle><p className="text-xs text-muted-foreground">By attendance rate</p></CardHeader>
          <CardContent className="space-y-3">
            {[...staff].sort((a, b) => b.attendance - a.attendance).slice(0, 5).map((emp, i) => (
              <div key={emp.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">{emp.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="font-medium">{emp.name}</span>
                    <span className="font-bold text-green-600">{emp.attendance}%</span>
                  </div>
                  <Progress value={emp.attendance} className="h-1.5" indicatorClassName="bg-green-500" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Department Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { dept: "Service", count: staff.filter(s => s.department === "Service").length, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
              { dept: "Kitchen", count: staff.filter(s => s.department === "Kitchen").length, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
              { dept: "Accounts", count: staff.filter(s => s.department === "Accounts").length, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
              { dept: "Delivery", count: staff.filter(s => s.department === "Delivery").length, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
              { dept: "Operations", count: staff.filter(s => s.department === "Operations").length, color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
            ].map(item => (
              <div key={item.dept} className={cn("rounded-xl p-4 text-center", item.color)}>
                <p className="text-2xl font-black">{item.count}</p>
                <p className="text-xs font-medium mt-1">{item.dept}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}