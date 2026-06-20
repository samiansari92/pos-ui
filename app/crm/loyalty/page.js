"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift, Star, Crown, TrendingUp, Users, Zap,
  Award, Settings, Plus, Edit, Medal, Diamond, CircleDot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { customers } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";

const tiers = [
  {
    name: "Bronze", TierIcon: Medal, minSpend: 0, maxSpend: 9999, pointsRate: 1,
    color: "border-amber-200 bg-amber-50 dark:bg-amber-950/20",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    iconColor: "text-amber-600",
    count: customers.filter(c => c.tier === "Bronze").length,
    perks: ["1 point per ₹10 spent", "Birthday discount 5%"],
  },
  {
    name: "Silver", TierIcon: Star, minSpend: 10000, maxSpend: 29999, pointsRate: 1.5,
    color: "border-gray-300 bg-gray-50 dark:bg-gray-900/20",
    badge: "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300",
    iconColor: "text-gray-500",
    count: customers.filter(c => c.tier === "Silver").length,
    perks: ["1.5 points per ₹10 spent", "Birthday discount 10%", "Priority seating"],
  },
  {
    name: "Gold", TierIcon: Crown, minSpend: 30000, maxSpend: 59999, pointsRate: 2,
    color: "border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20",
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    iconColor: "text-yellow-600",
    count: customers.filter(c => c.tier === "Gold").length,
    perks: ["2 points per ₹10 spent", "Birthday discount 15%", "Priority seating", "Complimentary dessert"],
  },
  {
    name: "Platinum", TierIcon: Diamond, minSpend: 60000, maxSpend: Infinity, pointsRate: 3,
    color: "border-purple-300 bg-purple-50 dark:bg-purple-950/20",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    iconColor: "text-purple-600",
    count: customers.filter(c => c.tier === "Platinum").length,
    perks: ["3 points per ₹10 spent", "Birthday discount 20%", "Reserved table", "Complimentary dish", "Personal host"],
  },
];

const rewardOptions = [
  { id: "r1", name: "Free Dessert", pointsCost: 200, category: "Food", active: true, redemptions: 34 },
  { id: "r2", name: "₹100 Off Next Bill", pointsCost: 500, category: "Discount", active: true, redemptions: 67 },
  { id: "r3", name: "Free Beverage", pointsCost: 150, category: "Food", active: true, redemptions: 89 },
  { id: "r4", name: "10% Off Entire Bill", pointsCost: 800, category: "Discount", active: false, redemptions: 12 },
  { id: "r5", name: "Free Starter", pointsCost: 300, category: "Food", active: true, redemptions: 45 },
];

export default function LoyaltyPage() {
  const [rewards, setRewards] = useState(rewardOptions);
  const totalPoints = customers.reduce((s, c) => s + c.loyaltyPoints, 0);

  const toggleReward = (id) => {
    setRewards(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Loyalty Program</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage tiers, points and rewards</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Settings className="h-3.5 w-3.5" />Program Settings
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Members", value: customers.length, icon: Users, color: "text-blue-500" },
          { label: "Points Issued", value: totalPoints.toLocaleString(), icon: Star, color: "text-yellow-500" },
          { label: "Rewards Redeemed", value: "247", icon: Gift, color: "text-green-500" },
          { label: "Avg Points/Member", value: Math.round(totalPoints / customers.length), icon: TrendingUp, color: "text-purple-500" },
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

      {/* Tier Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Membership Tiers</h2>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs"><Edit className="h-3 w-3" />Edit Tiers</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tiers.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={cn("rounded-xl border-2 p-4", tier.color)}>
              <div className="flex items-center justify-between mb-3">
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center", tier.badge)}>
                  <tier.TierIcon className={cn("h-5 w-5", tier.iconColor)} />
                </div>
                <span className={cn("text-xs font-bold px-2 py-1 rounded-full", tier.badge)}>{tier.name}</span>
              </div>
              <p className="text-2xl font-black">{tier.count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">members</p>

              <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground">
                  Spend: {tier.minSpend === 0 ? "₹0" : formatCurrency(tier.minSpend)}
                  {tier.maxSpend === Infinity ? "+" : ` - ${formatCurrency(tier.maxSpend)}`}
                </p>
                <p className="text-[11px] font-medium">{tier.pointsRate}x points multiplier</p>
                {tier.perks.slice(0, 2).map((perk, pi) => (
                  <div key={pi} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                    <Zap className="h-3 w-3 shrink-0 mt-0.5 text-primary" />
                    {perk}
                  </div>
                ))}
                {tier.perks.length > 2 && (
                  <p className="text-[10px] text-primary cursor-pointer hover:underline">+{tier.perks.length - 2} more perks</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rewards Catalog */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Rewards Catalog</h2>
          <Button size="sm" className="gap-1.5 text-xs"><Plus className="h-3 w-3" />Add Reward</Button>
        </div>
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            <span>Reward</span>
            <span className="w-24 text-center">Category</span>
            <span className="w-24 text-center">Points Cost</span>
            <span className="w-24 text-center">Redeemed</span>
            <span className="w-16 text-center">Active</span>
          </div>
          {rewards.map((reward, i) => (
            <motion.div key={reward.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className={cn("grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3.5 items-center hover:bg-muted/30 transition-colors", i < rewards.length - 1 && "border-b border-border")}>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Gift className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium">{reward.name}</p>
              </div>
              <div className="w-24 flex justify-center">
                <Badge variant="secondary" className="text-xs">{reward.category}</Badge>
              </div>
              <div className="w-24 text-center">
                <span className="flex items-center justify-center gap-1 text-sm font-bold">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                  {reward.pointsCost}
                </span>
              </div>
              <div className="w-24 text-center text-sm text-muted-foreground">{reward.redemptions}</div>
              <div className="w-16 flex justify-center">
                <Switch checked={reward.active} onCheckedChange={() => toggleReward(reward.id)} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}