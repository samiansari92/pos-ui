"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Tag, Layers, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

const variantGroups = [
  {
    id: "vg1", name: "Size", type: "single", required: true,
    options: [
      { id: "v1", name: "Regular", additionalPrice: 0, active: true },
      { id: "v2", name: "Large", additionalPrice: 80, active: true },
      { id: "v3", name: "Family", additionalPrice: 200, active: true },
    ],
    linkedProducts: 12,
  },
  {
    id: "vg2", name: "Spice Level", type: "single", required: false,
    options: [
      { id: "v4", name: "Mild", additionalPrice: 0, active: true },
      { id: "v5", name: "Medium", additionalPrice: 0, active: true },
      { id: "v6", name: "Spicy", additionalPrice: 0, active: true },
      { id: "v7", name: "Extra Spicy", additionalPrice: 0, active: true },
    ],
    linkedProducts: 18,
  },
];

const addonGroups = [
  {
    id: "ag1", name: "Extra Cheese", type: "addon", required: false,
    options: [
      { id: "a1", name: "Processed Cheese", additionalPrice: 40, active: true },
      { id: "a2", name: "Mozzarella", additionalPrice: 60, active: true },
    ],
    linkedProducts: 6,
  },
  {
    id: "ag2", name: "Extra Sauce", type: "addon", required: false,
    options: [
      { id: "a3", name: "Mint Chutney", additionalPrice: 20, active: true },
      { id: "a4", name: "Tamarind Chutney", additionalPrice: 20, active: true },
      { id: "a5", name: "Raita", additionalPrice: 30, active: true },
    ],
    linkedProducts: 15,
  },
];

function GroupCard({ group, type }) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{group.name}</p>
          <Badge variant={type === "variant" ? "info" : "purple"} className="text-[10px]">
            {type === "variant" ? "Variant" : "Add-on"}
          </Badge>
          {group.required && <Badge variant="warning" className="text-[10px]">Required</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{group.linkedProducts} products</span>
          <Button variant="ghost" size="icon-sm"><ChevronRight className="h-3.5 w-3.5" /></Button>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {group.options.map(opt => (
          <div key={opt.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">{opt.name}</span>
              {opt.additionalPrice > 0 && (
                <span className="text-xs text-green-600 font-medium">+{formatCurrency(opt.additionalPrice)}</span>
              )}
            </div>
            <Switch checked={opt.active} />
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full h-7 text-xs gap-1 text-muted-foreground border border-dashed border-border mt-1">
          <Plus className="h-3 w-3" />Add Option
        </Button>
      </div>
    </div>
  );
}

export default function VariantsPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Variants & Add-ons</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage product customization options</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add Group</Button>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="h-4 w-4 text-blue-500" />
          <h2 className="text-sm font-semibold">Variant Groups</h2>
          <Badge variant="info" className="text-xs">{variantGroups.length}</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {variantGroups.map((g, i) => (
            <motion.div key={g.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <GroupCard group={g} type="variant" />
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-purple-500" />
          <h2 className="text-sm font-semibold">Add-on Groups</h2>
          <Badge variant="purple" className="text-xs">{addonGroups.length}</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {addonGroups.map((g, i) => (
            <motion.div key={g.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <GroupCard group={g} type="addon" />
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}