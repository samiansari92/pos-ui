"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MapPin, Phone, Users, Store, MoreHorizontal, Edit, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const branches = [
  { id: "br_01", name: "MG Road", city: "Bengaluru", address: "42, MG Road, Bengaluru 560001", phone: "+91 98765 43210", manager: "Vikram Joshi", tables: 10, staff: 22, active: true, isHQ: true, revenue: "₹12.4L / month" },
  { id: "br_02", name: "Koramangala", city: "Bengaluru", address: "15, 5th Block, Koramangala, Bengaluru 560095", phone: "+91 98765 99100", manager: "Suresh Kumar", tables: 8, staff: 18, active: true, isHQ: false, revenue: "₹9.2L / month" },
  { id: "br_03", name: "Anna Nagar", city: "Chennai", address: "28, 2nd Ave, Anna Nagar, Chennai 600040", phone: "+91 98765 88200", manager: "Meenakshi R", tables: 12, staff: 24, active: false, isHQ: false, revenue: "₹6.8L / month" },
];

export default function BranchesPage() {
  const [branchList, setBranchList] = useState(branches);

  const toggleBranch = (id) => {
    setBranchList(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
    const branch = branchList.find(b => b.id === id);
    toast.success(`${branch.name} branch ${branch.active ? "deactivated" : "activated"}`);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Branches</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{branchList.filter(b => b.active).length} active of {branchList.length} branches</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add Branch</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branchList.map((branch, i) => (
          <motion.div key={branch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={cn("rounded-xl border bg-card p-5 transition-all hover:shadow-md", !branch.active && "opacity-60")}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold">{branch.name}</p>
                    {branch.isHQ && <Badge variant="info" className="text-[9px] h-4 px-1.5">HQ</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{branch.city}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2 text-xs"><Edit className="h-3.5 w-3.5" />Edit Branch</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-xs" onClick={() => toggleBranch(branch.id)}>
                    <Power className="h-3.5 w-3.5" />{branch.active ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{branch.address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0" />{branch.phone}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-sm font-bold">{branch.tables}</p>
                <p className="text-[10px] text-muted-foreground">Tables</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-sm font-bold">{branch.staff}</p>
                <p className="text-[10px] text-muted-foreground">Staff</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-xs font-bold">{branch.revenue.split(" ")[0]}</p>
                <p className="text-[10px] text-muted-foreground">Revenue</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Branch {branch.active ? "Active" : "Inactive"}</span>
              <Switch checked={branch.active} onCheckedChange={() => toggleBranch(branch.id)} />
            </div>
          </motion.div>
        ))}

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 p-8 text-muted-foreground hover:border-primary hover:text-primary transition-all min-h-[280px]">
          <Plus className="h-8 w-8" />
          <span className="text-sm font-medium">Add New Branch</span>
        </motion.button>
      </div>
    </PageContainer>
  );
}