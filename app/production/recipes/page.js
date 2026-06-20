"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, FlaskConical, Clock, ChevronRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { menuItems } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

const recipes = [
  {
    id: "rec_01", name: "Paneer Tikka", category: "Starters", servings: 2,
    prepTime: 15, cookTime: 15, yield: "300g",
    ingredients: [
      { name: "Paneer", qty: 200, unit: "g", cost: 56 },
      { name: "Yogurt", qty: 50, unit: "g", cost: 5 },
      { name: "Spice Mix", qty: 15, unit: "g", cost: 12 },
      { name: "Capsicum", qty: 30, unit: "g", cost: 4 },
      { name: "Onion", qty: 30, unit: "g", cost: 2 },
    ],
    totalCost: 79, sellingPrice: 320, grossMargin: 75.3,
  },
  {
    id: "rec_02", name: "Butter Chicken", category: "Main Course", servings: 2,
    prepTime: 20, cookTime: 25, yield: "400g",
    ingredients: [
      { name: "Chicken Boneless", qty: 250, unit: "g", cost: 95 },
      { name: "Tomatoes", qty: 150, unit: "g", cost: 6 },
      { name: "Cream", qty: 50, unit: "ml", cost: 25 },
      { name: "Butter", qty: 30, unit: "g", cost: 13.5 },
      { name: "Spice Mix", qty: 20, unit: "g", cost: 16 },
    ],
    totalCost: 155.5, sellingPrice: 450, grossMargin: 65.4,
  },
  {
    id: "rec_03", name: "Chicken Biryani", category: "Biryani", servings: 2,
    prepTime: 30, cookTime: 45, yield: "600g",
    ingredients: [
      { name: "Basmati Rice", qty: 200, unit: "g", cost: 17 },
      { name: "Chicken", qty: 300, unit: "g", cost: 114 },
      { name: "Whole Spices", qty: 10, unit: "g", cost: 15 },
      { name: "Onion (fried)", qty: 50, unit: "g", cost: 8 },
      { name: "Saffron", qty: 0.5, unit: "g", cost: 20 },
      { name: "Ghee", qty: 30, unit: "g", cost: 18 },
    ],
    totalCost: 192, sellingPrice: 520, grossMargin: 63.1,
  },
];

export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(recipes[0]);

  const filtered = recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex h-full">
      {/* Left panel */}
      <div className="w-72 border-r border-border flex flex-col bg-card shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-bold">Recipes</h1>
            <Button size="sm" className="h-7 text-xs gap-1"><Plus className="h-3 w-3" />New</Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search recipes..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-8 text-xs" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map(recipe => (
            <button
              key={recipe.id}
              onClick={() => setSelected(recipe)}
              className={cn("w-full text-left rounded-lg p-3 transition-all", selected?.id === recipe.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted border border-transparent")}
            >
              <p className="text-sm font-medium">{recipe.name}</p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                <span>{recipe.category}</span>
                <span>·</span>
                <span className="text-green-600 font-medium">{recipe.grossMargin}% margin</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Recipe detail */}
      {selected && (
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{selected.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="secondary">{selected.category}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />{selected.prepTime + selected.cookTime} min total
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Scale className="h-3 w-3" />Yield: {selected.yield}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit Recipe</Button>
          </div>

          {/* Cost analysis */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Cost per Serving", value: `₹${(selected.totalCost / selected.servings).toFixed(0)}`, color: "text-foreground" },
              { label: "Selling Price", value: `₹${selected.sellingPrice}`, color: "text-blue-600" },
              { label: "Gross Margin", value: `${selected.grossMargin}%`, color: "text-green-600" },
            ].map(item => (
              <div key={item.label} className="rounded-xl border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className={cn("text-xl font-bold", item.color)}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Ingredients */}
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="text-sm font-semibold">Ingredients ({selected.ingredients.length})</h3>
            </div>
            <div className="divide-y divide-border">
              {selected.ingredients.map((ing, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 items-center text-sm hover:bg-muted/30">
                  <p className="font-medium">{ing.name}</p>
                  <p className="text-muted-foreground">{ing.qty} {ing.unit}</p>
                  <p className="text-muted-foreground">₹{ing.cost.toFixed(1)}</p>
                  <p className="text-right text-xs text-muted-foreground">{((ing.cost / selected.totalCost) * 100).toFixed(0)}%</p>
                </motion.div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border bg-muted/20">
              <div className="flex justify-between text-sm font-bold">
                <span>Total Cost</span>
                <span>₹{selected.totalCost.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
