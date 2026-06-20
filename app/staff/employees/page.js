"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Phone, Mail, Star, Users, Clock, MoreHorizontal, Edit, Trash2, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { staff } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";

const roleColors = {
  manager: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  waiter: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  chef: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  captain: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  cashier: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  delivery: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  kitchen_manager: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  store_manager: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
};

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const roles = [...new Set(staff.map(s => s.role))];

  const filtered = staff.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || s.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Employees</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{staff.filter(s => s.status === "active").length} active staff members</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add Employee</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Staff", value: staff.length, icon: Users, color: "text-blue-500" },
          { label: "On Duty Today", value: 18, icon: UserCheck, color: "text-green-500" },
          { label: "Avg Attendance", value: "94%", icon: Clock, color: "text-amber-500" },
          { label: "Payroll / Month", value: formatCurrency(staff.reduce((s, e) => s + e.salary, 0)), icon: Star, color: "text-purple-500" },
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

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-8 text-xs" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => setFilterRole("all")} className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all", filterRole === "all" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted")}>All</button>
          {roles.map(role => (
            <button key={role} onClick={() => setFilterRole(role)} className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize", filterRole === role ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted")}>
              {role.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide items-center">
          <div className="w-8" />
          <span>Employee</span>
          <span className="w-24">Role</span>
          <span className="w-20 text-center">Shift</span>
          <span className="w-28 text-center">Attendance</span>
          <span className="w-28 text-right">Salary</span>
          <div className="w-8" />
        </div>

        {filtered.map((employee, i) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className={cn("grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 px-4 py-3.5 items-center hover:bg-muted/30 transition-colors", i < filtered.length - 1 && "border-b border-border")}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">{employee.avatar}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">{employee.name}</p>
              <p className="text-xs text-muted-foreground">{employee.email}</p>
            </div>

            <div className="w-24">
              <span className={cn("inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium capitalize", roleColors[employee.role] || "bg-gray-100 text-gray-600")}>
                {employee.role.replace("_", " ")}
              </span>
            </div>

            <div className="w-20 text-center">
              <Badge variant={employee.shift === "Morning" ? "info" : "purple"} className="text-[10px]">
                {employee.shift}
              </Badge>
            </div>

            <div className="w-28">
              <div className="flex items-center gap-2">
                <Progress value={employee.attendance} className="h-1.5 flex-1" indicatorClassName={employee.attendance >= 95 ? "bg-green-500" : employee.attendance >= 85 ? "bg-amber-500" : "bg-red-500"} />
                <span className="text-xs font-medium w-8 shrink-0">{employee.attendance}%</span>
              </div>
            </div>

            <div className="w-28 text-right">
              <p className="text-sm font-semibold">{formatCurrency(employee.salary)}</p>
              <p className="text-[10px] text-muted-foreground">/month</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="w-8"><MoreHorizontal className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2 text-xs"><Edit className="h-3.5 w-3.5" />Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-xs text-destructive focus:text-destructive"><Trash2 className="h-3.5 w-3.5" />Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
}