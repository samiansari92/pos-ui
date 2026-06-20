"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Package, Truck, CheckCircle, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

const purchaseOrders = [
  {
    id: "po_001", poNumber: "PO-2024-001", supplier: "Meatz Co",
    items: [
      { name: "Chicken Boneless", qty: 25, unit: "kg", unitCost: 380, total: 9500 },
      { name: "Mutton", qty: 10, unit: "kg", unitCost: 650, total: 6500 },
    ],
    total: 16000, status: "pending", createdAt: "2026-06-17", expectedDate: "2026-06-19",
    createdBy: "Vikram J",
  },
  {
    id: "po_002", poNumber: "PO-2024-002", supplier: "Fresh Farms",
    items: [
      { name: "Tomatoes", qty: 50, unit: "kg", unitCost: 40, total: 2000 },
      { name: "Onions", qty: 30, unit: "kg", unitCost: 30, total: 900 },
      { name: "Spinach", qty: 20, unit: "kg", unitCost: 35, total: 700 },
    ],
    total: 3600, status: "approved", createdAt: "2026-06-17", expectedDate: "2026-06-18",
    createdBy: "Vikram J",
  },
  {
    id: "po_003", poNumber: "PO-2024-003", supplier: "Fortune Foods",
    items: [
      { name: "Cooking Oil", qty: 20, unit: "ltr", unitCost: 140, total: 2800 },
    ],
    total: 2800, status: "received", createdAt: "2026-06-15", expectedDate: "2026-06-16",
    createdBy: "Store Manager",
  },
  {
    id: "po_004", poNumber: "PO-2024-004", supplier: "Milky Way Dairy",
    items: [
      { name: "Paneer", qty: 15, unit: "kg", unitCost: 280, total: 4200 },
      { name: "Butter", qty: 5, unit: "kg", unitCost: 450, total: 2250 },
      { name: "Cream", qty: 10, unit: "ltr", unitCost: 120, total: 1200 },
    ],
    total: 7650, status: "approved", createdAt: "2026-06-18", expectedDate: "2026-06-20",
    createdBy: "Vikram J",
  },
];

const statusConfig = {
  pending: { label: "Pending Approval", color: "warning", icon: Clock },
  approved: { label: "Approved", color: "info", icon: CheckCircle },
  received: { label: "Received", color: "success", icon: Package },
  cancelled: { label: "Cancelled", color: "cancelled", icon: FileText },
};

export default function PurchaseOrdersPage() {
  const [search, setSearch] = useState("");
  const [selectedPO, setSelectedPO] = useState(purchaseOrders[0]);

  const filtered = purchaseOrders.filter(po =>
    po.poNumber.toLowerCase().includes(search.toLowerCase()) ||
    po.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* Left list */}
      <div className="w-80 border-r border-border flex flex-col bg-card shrink-0">
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold">Purchase Orders</h1>
            <Button size="sm" className="h-7 text-xs gap-1"><Plus className="h-3 w-3" />New PO</Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search POs..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-8 text-xs" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {filtered.map(po => {
            const status = statusConfig[po.status];
            return (
              <button
                key={po.id}
                onClick={() => setSelectedPO(po)}
                className={cn(
                  "w-full text-left rounded-xl p-3.5 border transition-all",
                  selectedPO?.id === po.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted border-transparent"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold">{po.poNumber}</span>
                  <Badge variant={status.color} className="text-[10px] h-4 px-1.5">{po.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{po.supplier}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-xs font-bold">{formatCurrency(po.total)}</p>
                  <p className="text-[10px] text-muted-foreground">{formatDate(po.createdAt)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PO Detail */}
      {selectedPO && (
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{selectedPO.poNumber}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Supplier: {selectedPO.supplier} · Created {formatDate(selectedPO.createdAt)} by {selectedPO.createdBy}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={statusConfig[selectedPO.status].color} className="text-xs px-2.5 py-1">
                {statusConfig[selectedPO.status].label}
              </Badge>
              {selectedPO.status === "pending" && (
                <Button size="sm" className="gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />Approve
                </Button>
              )}
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Order Total", value: formatCurrency(selectedPO.total) },
              { label: "Expected Delivery", value: formatDate(selectedPO.expectedDate) },
              { label: "Items", value: `${selectedPO.items.length} products` },
            ].map(item => (
              <div key={item.label} className="rounded-xl border bg-card p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-sm font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Items table */}
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="text-sm font-semibold">Order Items</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Item</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">Qty</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">Unit Cost</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedPO.items.map((item, i) => (
                  <tr key={i} className={cn("hover:bg-muted/20", i < selectedPO.items.length - 1 && "border-b border-border")}>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{item.qty} {item.unit}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{formatCurrency(item.unitCost)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/20">
                  <td colSpan={3} className="px-4 py-3 text-right font-bold text-sm">Order Total</td>
                  <td className="px-4 py-3 text-right font-bold text-base">{formatCurrency(selectedPO.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Delivery info */}
          {selectedPO.status !== "received" && (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 p-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-600" />
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  Expected delivery on {formatDate(selectedPO.expectedDate)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
