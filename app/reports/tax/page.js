"use client";
import { PageContainer } from "@/components/layout/page-container";
import React from "react";
import { motion } from "framer-motion";
import { Download, FileText, Calculator, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";

const taxData = [
  { month: "January", taxableSales: 1952174, cgst: 175695, sgst: 175695, totalGST: 351390, filingStatus: "filed" },
  { month: "February", taxableSales: 1720000, cgst: 154800, sgst: 154800, totalGST: 309600, filingStatus: "filed" },
  { month: "March", taxableSales: 2225000, cgst: 200250, sgst: 200250, totalGST: 400500, filingStatus: "filed" },
  { month: "April", taxableSales: 1895652, cgst: 170608, sgst: 170608, totalGST: 341216, filingStatus: "filed" },
  { month: "May", taxableSales: 2512174, cgst: 226095, sgst: 226095, totalGST: 452190, filingStatus: "filed" },
  { month: "June", taxableSales: 2479130, cgst: 223121, sgst: 223121, totalGST: 446242, filingStatus: "pending" },
];

const gstRateBreakdown = [
  { rate: "5% GST", sales: 4820000, tax: 241000, category: "Take-away food" },
  { rate: "12% GST", sales: 1200000, tax: 144000, category: "Packaged goods" },
  { rate: "18% GST", sales: 8763826, tax: 1577488, category: "Restaurant (AC)" },
];

export default function TaxReportsPage() {
  const totalTax = taxData.reduce((s, t) => s + t.totalGST, 0);
  const totalSales = taxData.reduce((s, t) => s + t.taxableSales, 0);

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Tax Reports</h1>
          <p className="text-xs text-muted-foreground mt-0.5">GST filing and tax summary · FY 2025-26</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><FileText className="h-3.5 w-3.5" />GSTR-1</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" />Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Taxable Sales", value: formatCurrency(totalSales), icon: TrendingUp, color: "text-blue-500" },
          { label: "Total GST Collected", value: formatCurrency(totalTax), icon: Calculator, color: "text-green-500" },
          { label: "CGST Payable", value: formatCurrency(totalTax / 2), icon: FileText, color: "text-purple-500" },
          { label: "SGST Payable", value: formatCurrency(totalTax / 2), icon: FileText, color: "text-orange-500" },
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

      <Card>
        <CardHeader>
          <CardTitle>Monthly GST Summary</CardTitle>
          <p className="text-xs text-muted-foreground">FY 2025-26 · GSTIN: 29AABCU9603R1ZX</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Month</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Taxable Sales</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">CGST (9%)</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">SGST (9%)</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Total GST</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {taxData.map((row, i) => (
                  <motion.tr key={row.month} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className={cn("hover:bg-muted/20 transition-colors", i < taxData.length - 1 && "border-b border-border")}>
                    <td className="px-4 py-3 font-medium">{row.month}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(row.taxableSales)}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{formatCurrency(row.cgst)}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{formatCurrency(row.sgst)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCurrency(row.totalGST)}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={row.filingStatus === "filed" ? "success" : "warning"} className="text-[10px] capitalize flex items-center gap-1 w-fit mx-auto">
                        {row.filingStatus === "filed"
                          ? <><CheckCircle className="h-3 w-3" />Filed</>
                          : <><Clock className="h-3 w-3" />Pending</>
                        }
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/20 font-bold">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(totalSales)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(totalTax / 2)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(totalTax / 2)}</td>
                  <td className="px-4 py-3 text-right text-base">{formatCurrency(totalTax)}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>GST Rate-wise Breakdown</CardTitle><p className="text-xs text-muted-foreground">Current financial year</p></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {gstRateBreakdown.map(item => (
              <div key={item.rate} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                  <span className="text-xs font-black text-primary">{item.rate.split(" ")[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.rate}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(item.sales)}</p>
                  <p className="text-xs text-muted-foreground">Sales</p>
                </div>
                <div className="text-right w-28">
                  <p className="text-sm font-bold text-primary">{formatCurrency(item.tax)}</p>
                  <p className="text-xs text-muted-foreground">Tax</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}