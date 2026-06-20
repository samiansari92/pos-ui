"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Tag, Copy, Check, Percent, DollarSign, Clock, Users, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";

const coupons = [
  { id: "c1", code: "WELCOME20", type: "percent", value: 20, minOrder: 500, maxDiscount: 200, usageLimit: 500, used: 234, active: true, expiry: "2026-12-31", description: "New customer welcome discount", category: "New User" },
  { id: "c2", code: "FLAT100", type: "flat", value: 100, minOrder: 800, maxDiscount: 100, usageLimit: 200, used: 187, active: true, expiry: "2026-07-31", description: "Flat ₹100 off on orders above ₹800", category: "General" },
  { id: "c3", code: "BDAY50", type: "percent", value: 50, minOrder: 0, maxDiscount: 500, usageLimit: 1000, used: 89, active: true, expiry: "2026-12-31", description: "Birthday special 50% off", category: "Birthday" },
  { id: "c4", code: "MONSOON15", type: "percent", value: 15, minOrder: 600, maxDiscount: 300, usageLimit: 300, used: 312, active: false, expiry: "2026-07-15", description: "Monsoon season offer", category: "Seasonal" },
  { id: "c5", code: "FRIDAY200", type: "flat", value: 200, minOrder: 1500, maxDiscount: 200, usageLimit: 100, used: 45, active: true, expiry: "2026-06-30", description: "Friday special flat ₹200 off", category: "Day Special" },
];

const categoryColors = {
  "New User": "info",
  "General": "secondary",
  "Birthday": "purple",
  "Seasonal": "orange",
  "Day Special": "warning",
};

export default function CouponsPage() {
  const [couponList, setCouponList] = useState(coupons);
  const [copied, setCopied] = useState(null);

  const toggleCoupon = (id) => {
    setCouponList(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
    toast.success(`Code "${code}" copied!`);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Coupons</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{couponList.filter(c => c.active).length} active coupons</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Create Coupon</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Coupons", value: coupons.length, icon: Tag },
          { label: "Active", value: coupons.filter(c => c.active).length, icon: Check },
          { label: "Total Redeemed", value: coupons.reduce((s, c) => s + c.used, 0), icon: BarChart2 },
          { label: "Discount Given", value: "₹38,450", icon: Percent },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Coupon cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {couponList.map((coupon, i) => {
          const usagePercent = Math.round((coupon.used / coupon.usageLimit) * 100);
          return (
            <motion.div key={coupon.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className={cn("rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md", !coupon.active && "opacity-60")}>
              {/* Coupon top - dashed border style */}
              <div className="p-4 border-b border-dashed border-border">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant={categoryColors[coupon.category] || "secondary"} className="text-[10px]">{coupon.category}</Badge>
                      {!coupon.active && <Badge variant="secondary" className="text-[10px]">Inactive</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{coupon.description}</p>
                  </div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 shrink-0">
                    {coupon.type === "percent" ? (
                      <span className="text-lg font-black text-primary">{coupon.value}%</span>
                    ) : (
                      <span className="text-sm font-black text-primary">₹{coupon.value}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Coupon code + details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2">
                    <span className="font-mono text-sm font-bold text-primary tracking-widest flex-1">{coupon.code}</span>
                    <button onClick={() => copyCode(coupon.code)} className="text-muted-foreground hover:text-primary transition-colors">
                      {copied === coupon.code ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <Switch checked={coupon.active} onCheckedChange={() => toggleCoupon(coupon.id)} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground">Min Order</p>
                    <p className="font-semibold">{coupon.minOrder ? formatCurrency(coupon.minOrder) : "No minimum"}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground">Max Discount</p>
                    <p className="font-semibold">{formatCurrency(coupon.maxDiscount)}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" />{coupon.used} / {coupon.usageLimit} used</span>
                    <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />Expires {coupon.expiry}</span>
                  </div>
                  <Progress value={usagePercent} className="h-1.5" indicatorClassName={usagePercent > 90 ? "bg-red-500" : usagePercent > 70 ? "bg-amber-500" : "bg-green-500"} />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Add new coupon card */}
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 p-8 text-muted-foreground hover:border-primary hover:text-primary transition-all min-h-[200px]">
          <Plus className="h-8 w-8" />
          <span className="text-sm font-medium">Create New Coupon</span>
        </motion.button>
      </div>
    </PageContainer>
  );
}