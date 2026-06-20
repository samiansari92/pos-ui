"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, CheckCircle, Clock, DollarSign, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { staff } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";

const payrollData = staff.map(emp => ({
  ...emp,
  basicPay: Math.round(emp.salary * 0.6),
  hra: Math.round(emp.salary * 0.2),
  allowances: Math.round(emp.salary * 0.1),
  overtime: Math.round(Math.random() * 3000),
  deductions: Math.round(emp.salary * 0.08),
  pf: Math.round(emp.salary * 0.12),
  netPay: 0,
  daysWorked: Math.round(25 + Math.random() * 4),
  paymentStatus: Math.random() > 0.3 ? "paid" : "pending",
})).map(e => ({
  ...e,
  netPay: e.basicPay + e.hra + e.allowances + e.overtime - e.deductions - e.pf,
}));

const totalPayroll = payrollData.reduce((s, e) => s + e.netPay, 0);
const paid = payrollData.filter(e => e.paymentStatus === "paid").length;

export default function PayrollPage() {
  const [month] = useState("June 2026");
  const [payroll, setPayroll] = useState(payrollData);

  const markPaid = (id) => {
    setPayroll(prev => prev.map(e => e.id === id ? { ...e, paymentStatus: "paid" } : e));
    toast.success("Payment marked as paid");
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Payroll</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{month} · {staff.length} employees</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ChevronDown className="h-3.5 w-3.5" />{month}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />Export
          </Button>
          <Button size="sm" className="gap-1.5">
            <CreditCard className="h-3.5 w-3.5" />Process All
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Payroll", value: formatCurrency(totalPayroll), icon: DollarSign, color: "text-blue-500" },
          { label: "Employees", value: staff.length, icon: Users, color: "text-purple-500" },
          { label: "Paid", value: paid, icon: CheckCircle, color: "text-green-600" },
          { label: "Pending", value: staff.length - paid, icon: Clock, color: "text-amber-600" },
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

      {/* Payroll Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Employee</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Basic</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">HRA</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Allowances</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Overtime</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground text-red-500">Deductions</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Net Pay</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody>
              {payroll.map((emp, i) => (
                <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className={cn("hover:bg-muted/20 transition-colors", i < payroll.length - 1 && "border-b border-border")}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">{emp.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{emp.name}</p>
                        <p className="text-[10px] text-muted-foreground capitalize">{emp.role.replace("_", " ")} · {emp.daysWorked} days</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(emp.basicPay)}</td>
                  <td className="px-4 py-3 text-right text-sm text-muted-foreground">{formatCurrency(emp.hra)}</td>
                  <td className="px-4 py-3 text-right text-sm text-muted-foreground">{formatCurrency(emp.allowances)}</td>
                  <td className="px-4 py-3 text-right text-sm text-green-600">+{formatCurrency(emp.overtime)}</td>
                  <td className="px-4 py-3 text-right text-sm text-red-500">-{formatCurrency(emp.deductions + emp.pf)}</td>
                  <td className="px-4 py-3 text-right font-bold text-sm">{formatCurrency(emp.netPay)}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={emp.paymentStatus === "paid" ? "success" : "warning"} className="text-[10px] capitalize">
                      {emp.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {emp.paymentStatus === "pending" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => markPaid(emp.id)}>
                        Pay
                      </Button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border bg-muted/20">
                <td className="px-4 py-3 font-bold text-sm" colSpan={6}>Total Payroll</td>
                <td className="px-4 py-3 text-right font-black text-base">{formatCurrency(totalPayroll)}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}