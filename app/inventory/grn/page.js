"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Package, Check, AlertCircle, FileCheck, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { toast } from "sonner";

const grnList = [
  {
    id: "grn_01", grnNo: "GRN-2024-001", poRef: "PO-2024-003", supplier: "Fortune Foods",
    receivedDate: "2026-06-16", receivedBy: "Store Manager",
    items: [
      { name: "Cooking Oil", ordered: 20, received: 20, unit: "ltr", unitCost: 140, condition: "good" },
    ],
    total: 2800, status: "completed", notes: "",
  },
  {
    id: "grn_02", grnNo: "GRN-2024-002", poRef: "PO-2024-002", supplier: "Fresh Farms",
    receivedDate: "2026-06-18", receivedBy: "Store Manager",
    items: [
      { name: "Tomatoes", ordered: 50, received: 48, unit: "kg", unitCost: 40, condition: "good" },
      { name: "Onions", ordered: 30, received: 30, unit: "kg", unitCost: 30, condition: "good" },
      { name: "Spinach", ordered: 20, received: 18, unit: "kg", unitCost: 35, condition: "partial" },
    ],
    total: 3450, status: "partial", notes: "2kg tomatoes returned - damaged. 2kg spinach short delivery.",
  },
];

export default function GRNPage() {
  const [selected, setSelected] = useState(grnList[0]);

  return (
    <div className="flex h-full">
      {/* Left list */}
      <div className="w-72 border-r border-border flex flex-col bg-card shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-bold">Goods Received</h1>
            <Button size="sm" className="h-7 text-xs gap-1"><Plus className="h-3 w-3" />New GRN</Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {grnList.map(grn => (
            <button key={grn.id} onClick={() => setSelected(grn)} className={cn("w-full text-left rounded-xl p-3.5 border transition-all", selected?.id === grn.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted")}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">{grn.grnNo}</span>
                <Badge variant={grn.status === "completed" ? "success" : "warning"} className="text-[10px]">{grn.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{grn.supplier}</p>
              <div className="flex justify-between mt-1.5 text-xs">
                <span className="text-muted-foreground">Ref: {grn.poRef}</span>
                <span className="font-bold">{formatCurrency(grn.total)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      {selected && (
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{selected.grnNo}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selected.supplier} · Received {formatDate(selected.receivedDate)} by {selected.receivedBy}
              </p>
              <p className="text-xs text-muted-foreground">PO Reference: {selected.poRef}</p>
            </div>
            <Badge variant={selected.status === "completed" ? "success" : "warning"} className="text-sm px-3 py-1.5 capitalize flex items-center gap-1.5">
              {selected.status === "completed"
                ? <><CheckCircle className="h-4 w-4" />Fully Received</>
                : <><AlertCircle className="h-4 w-4" />Partial Receipt</>
              }
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Items", value: selected.items.length },
              { label: "Total Value", value: formatCurrency(selected.total) },
              { label: "Condition", value: selected.status === "completed" ? "All Good" : "Has Issues" },
            ].map(item => (
              <div key={item.label} className="rounded-xl border bg-card p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-sm font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="text-sm font-semibold">Items Received</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Item</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">Ordered</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">Received</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">Condition</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Value</th>
                </tr>
              </thead>
              <tbody>
                {selected.items.map((item, i) => (
                  <tr key={i} className={cn("hover:bg-muted/20", i < selected.items.length - 1 && "border-b border-border")}>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{item.ordered} {item.unit}</td>
                    <td className={cn("px-4 py-3 text-center font-semibold", item.received < item.ordered ? "text-amber-600" : "text-green-600")}>
                      {item.received} {item.unit}
                      {item.received < item.ordered && <span className="text-[10px] text-amber-500 ml-1">(short {item.ordered - item.received})</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={item.condition === "good" ? "success" : "warning"} className="text-[10px] capitalize">{item.condition}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCurrency(item.received * item.unitCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selected.notes && (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">Notes / Discrepancies</p>
                  <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-1">{selected.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
