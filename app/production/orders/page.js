"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, FlaskConical, CheckCircle, Clock, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDate, cn } from "@/lib/utils";
import { toast } from "sonner";

const productionOrders = [
  { id: "prod_01", recipe: "Butter Chicken Base Gravy", batch: "Batch #24", quantity: 10, unit: "kg", status: "in_progress", startTime: "2026-06-18T08:00", endTime: "2026-06-18T10:00", assignedTo: "Chef Rajesh", progress: 65, yield: "9.8 kg estimated" },
  { id: "prod_02", recipe: "Biryani Masala Mix", batch: "Batch #23", quantity: 2, unit: "kg", status: "completed", startTime: "2026-06-18T06:00", endTime: "2026-06-18T07:30", assignedTo: "Chef Rajesh", progress: 100, yield: "1.95 kg actual" },
  { id: "prod_03", recipe: "Tandoor Marination", batch: "Batch #25", quantity: 15, unit: "kg", status: "scheduled", startTime: "2026-06-18T14:00", endTime: "2026-06-18T16:00", assignedTo: "Chef Rajesh", progress: 0, yield: "14.5 kg estimated" },
  { id: "prod_04", recipe: "Dal Makhani Base", batch: "Batch #22", quantity: 8, unit: "kg", status: "completed", startTime: "2026-06-17T09:00", endTime: "2026-06-17T11:00", assignedTo: "Chef Meena", progress: 100, yield: "7.8 kg actual" },
];

const statusConfig = {
  scheduled: { label: "Scheduled", variant: "info", icon: Clock },
  in_progress: { label: "In Progress", variant: "warning", icon: PlayCircle },
  completed: { label: "Completed", variant: "success", icon: CheckCircle },
  cancelled: { label: "Cancelled", variant: "cancelled", icon: null },
};

export default function ProductionOrdersPage() {
  const [orders, setOrders] = useState(productionOrders);

  const startOrder = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "in_progress", progress: 10 } : o));
    toast.success("Production started");
  };
  const completeOrder = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "completed", progress: 100 } : o));
    toast.success("Production completed! Stock updated.");
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Production Orders</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Track batch production and pre-preparation</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />New Order</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Scheduled", value: orders.filter(o => o.status === "scheduled").length, color: "text-blue-500" },
          { label: "In Progress", value: orders.filter(o => o.status === "in_progress").length, color: "text-amber-500" },
          { label: "Completed Today", value: orders.filter(o => o.status === "completed").length, color: "text-green-600" },
          { label: "Total Batches", value: orders.length, color: "text-purple-500" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-2">{kpi.label}</p>
            <p className={cn("text-2xl font-bold", kpi.color)}>{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((order, i) => {
          const status = statusConfig[order.status];
          return (
            <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FlaskConical className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{order.recipe}</p>
                      <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {order.batch} · {order.quantity} {order.unit} · {order.assignedTo}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.startTime, { hour: "2-digit", minute: "2-digit" })} → {formatDate(order.endTime, { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {order.status === "scheduled" && (
                    <Button size="sm" className="h-8 text-xs gap-1.5" onClick={() => startOrder(order.id)}>
                      <PlayCircle className="h-3.5 w-3.5" />Start
                    </Button>
                  )}
                  {order.status === "in_progress" && (
                    <Button variant="success" size="sm" className="h-8 text-xs gap-1.5" onClick={() => completeOrder(order.id)}>
                      <CheckCircle className="h-3.5 w-3.5" />Complete
                    </Button>
                  )}
                </div>
              </div>

              {order.status !== "scheduled" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} className="h-2" indicatorClassName={order.status === "completed" ? "bg-green-500" : "bg-amber-500"} />
                  <p className="text-[11px] text-muted-foreground">Expected yield: {order.yield}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </PageContainer>
  );
}