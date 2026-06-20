"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, AlertTriangle, TrendingDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inventory } from "@/lib/dummy-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { toast } from "sonner";

const wastageLog = [
  { id: "w1", item: "Tomatoes", qty: 2.5, unit: "kg", reason: "Spoilage", cost: 100, recordedBy: "Chef Rajesh", date: "2026-06-18", category: "Vegetables" },
  { id: "w2", item: "Chicken", qty: 0.8, unit: "kg", reason: "Expired", cost: 304, recordedBy: "Vikram J", date: "2026-06-17", category: "Meat" },
  { id: "w3", item: "Bread Rolls", qty: 12, unit: "pcs", reason: "Over-preparation", cost: 144, recordedBy: "Chef Rajesh", date: "2026-06-17", category: "Bakery" },
  { id: "w4", item: "Spinach", qty: 0.5, unit: "kg", reason: "Spoilage", cost: 17.5, recordedBy: "Store Mgr", date: "2026-06-16", category: "Vegetables" },
  { id: "w5", item: "Paneer", qty: 0.3, unit: "kg", reason: "Contamination", cost: 84, recordedBy: "Chef Rajesh", date: "2026-06-16", category: "Dairy" },
];

const reasonColors = { Spoilage: "error", Expired: "warning", "Over-preparation": "orange", Contamination: "purple", Dropped: "secondary" };

export default function WastagePage() {
  const [log, setLog] = useState(wastageLog);
  const [showForm, setShowForm] = useState(false);

  const totalWastageCost = log.reduce((s, w) => s + w.cost, 0);

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Wastage Tracking</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Track and reduce food waste</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-3.5 w-3.5" />Record Wastage
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Today's Wastage", value: formatCurrency(log.filter(w => w.date === "2026-06-18").reduce((s, w) => s + w.cost, 0)), icon: TrendingDown, color: "text-red-500" },
          { label: "This Week", value: formatCurrency(totalWastageCost), icon: Calendar, color: "text-amber-500" },
          { label: "Items Wasted", value: log.length, icon: Trash2, color: "text-orange-500" },
          { label: "Avg Daily Loss", value: formatCurrency(totalWastageCost / 3), icon: AlertTriangle, color: "text-purple-500" },
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

      {/* Quick entry form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold mb-4">Record Wastage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Item</Label>
              <Select><SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select item" /></SelectTrigger>
                <SelectContent>{inventory.map(i => <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Quantity</Label>
              <Input type="number" placeholder="0" className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Reason</Label>
              <Select><SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select reason" /></SelectTrigger>
                <SelectContent>
                  {["Spoilage", "Expired", "Over-preparation", "Contamination", "Dropped"].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button size="sm" onClick={() => { toast.success("Wastage recorded"); setShowForm(false); }}>Save Record</Button>
          </div>
        </motion.div>
      )}

      {/* Wastage log */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h2 className="text-sm font-semibold">Wastage Log</h2>
        </div>
        <div className="divide-y divide-border">
          {log.map((entry, i) => (
            <motion.div key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 px-4 py-3.5 hover:bg-muted/30 transition-colors">
              <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center shrink-0">
                <Trash2 className="h-4 w-4 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{entry.item}</p>
                  <Badge variant={reasonColors[entry.reason] || "secondary"} className="text-[10px]">{entry.reason}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{entry.qty} {entry.unit} · {entry.category} · by {entry.recordedBy}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-red-500">-{formatCurrency(entry.cost)}</p>
                <p className="text-[10px] text-muted-foreground">{formatDate(entry.date)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}