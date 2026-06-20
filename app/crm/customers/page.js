"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Heart, Crown, TrendingUp, Award, Medal, Star, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { customers } from "@/lib/dummy-data";
import { formatCurrency, getInitials, formatDate, cn } from "@/lib/utils";

const tierConfig = {
  Bronze: { color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20", Icon: Medal },
  Silver: { color: "text-gray-500",  bg: "bg-gray-50 dark:bg-gray-900/20",   Icon: Star  },
  Gold:   { color: "text-yellow-600",bg: "bg-yellow-50 dark:bg-yellow-950/20",Icon: Crown },
  Platinum:{ color: "text-purple-600",bg:"bg-purple-50 dark:bg-purple-950/20",Icon: Diamond},
};

const kpis = [
  { label: "Total Customers", value: customers.length, icon: Heart },
  { label: "Platinum Members", value: customers.filter(c => c.tier === "Platinum").length, icon: Crown },
  { label: "Avg Lifetime Value", value: formatCurrency(customers.reduce((s, c) => s + c.totalSpent, 0) / customers.length), icon: TrendingUp },
  { label: "Total Loyalty Points", value: customers.reduce((s, c) => s + c.loyaltyPoints, 0).toLocaleString(), icon: Award },
];

import { PageContainer, PageHeader } from "@/components/layout/page-container";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("all");

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchTier = filterTier === "all" || c.tier === filterTier;
    return matchSearch && matchTier;
  });

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Customers</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{customers.length} registered customers</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add Customer</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-8 text-xs" />
        </div>
        <div className="flex gap-1.5">
          {["all", "Bronze", "Silver", "Gold", "Platinum"].map(tierKey => (
            <button key={tierKey} onClick={() => setFilterTier(tierKey)} className={cn("flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all", filterTier === tierKey ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted")}>
              {tierKey !== "all" && (() => { const Ic = tierConfig[tierKey].Icon; return <Ic className="h-3 w-3" />; })()}
              {tierKey === "all" ? "All" : tierKey}
            </button>
          ))}
        </div>
      </div>

      {/* Customer cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((customer, i) => {
          const tier = tierConfig[customer.tier];
          return (
            <motion.div key={customer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">{getInitials(customer.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold truncate">{customer.name}</p>
                    <span className={cn("flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full", tier.bg, tier.color)}>
                      <tier.Icon className="h-3 w-3" />{customer.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground">{customer.phone}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-sm font-bold">{customer.visits}</p>
                  <p className="text-[10px] text-muted-foreground">Visits</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-sm font-bold">{formatCurrency(customer.totalSpent)}</p>
                  <p className="text-[10px] text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-sm font-bold">{customer.loyaltyPoints}</p>
                  <p className="text-[10px] text-muted-foreground">Points</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last visit: {formatDate(customer.lastVisit)}</span>
                <span className="text-primary group-hover:underline">View Profile →</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </PageContainer>
  );
}
