"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { menuItems, categories } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [items, setItems] = useState(menuItems);

  const filtered = items.filter(item => {
    const matchCat = activeCategory === "all" || item.categoryId === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleAvailability = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));
    const item = items.find(i => i.id === id);
    toast.success(`${item.name} marked ${item.available ? "unavailable" : "available"}`);
  };

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || "—";

  return (
    <PageContainer>
      <PageHeader title="Products" description={`${items.length} products across ${categories.length} categories`}>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-3.5 w-3.5" />Filters
        </Button>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />Add Product
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative min-w-[220px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-8 text-sm" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => setActiveCategory("all")} className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all", activeCategory === "all" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted")}>
            All
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all", activeCategory === cat.id ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted")}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filtered.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className={cn("rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all", !item.available && "opacity-60")}>
            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={e => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"; }} />
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <div className={cn("h-4 w-4 flex items-center justify-center rounded border-2 bg-white", item.veg ? "border-green-600" : "border-red-600")}>
                  <span className={cn("h-2 w-2 rounded-full", item.veg ? "bg-green-600" : "bg-red-600")} />
                </div>
                {item.popular && (
                  <Badge variant="warning" className="text-[9px] h-4 px-1.5 gap-1 inline-flex items-center">
                    <Star className="h-2.5 w-2.5 fill-current" />Popular
                  </Badge>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="h-6 w-6 bg-white/90 dark:bg-black/60 hover:bg-white">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2 text-xs"><Eye className="h-3.5 w-3.5" />View</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-xs"><Edit className="h-3.5 w-3.5" />Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-xs text-destructive focus:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-1">
                <p className="text-sm font-semibold leading-tight line-clamp-1 flex-1">{item.name}</p>
                <span className="text-sm font-bold shrink-0">{formatCurrency(item.price)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-1">{item.description}</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{getCategoryName(item.categoryId)}</Badge>
                <div className="flex items-center gap-0.5 text-[10px] text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="font-medium">{item.rating}</span>
                </div>
                {item.spicy > 0 && (
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: item.spicy }).map((_, idx) => (
                      <Flame key={idx} className="h-3 w-3 text-red-500" />
                    ))}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item.id)} className="scale-75" />
                  <span className="text-[11px] text-muted-foreground">{item.available ? "Available" : "Off"}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{item.preparationTime}m</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add card */}
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 p-6 text-muted-foreground hover:border-primary hover:text-primary transition-all min-h-[220px]">
          <Plus className="h-8 w-8" />
          <span className="text-sm font-medium">Add Product</span>
        </motion.button>
      </div>
    </PageContainer>
  );
}
