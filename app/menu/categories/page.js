"use client";
import React, { useState } from "react";
import { Plus, GripVertical, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CategoryIcon } from "@/components/ui/category-icon";
import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { categories } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [cats, setCats] = useState(categories);

  const toggleActive = (id) => {
    setCats(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    const cat = cats.find(c => c.id === id);
    toast.success(`${cat.name} is now ${cat.active ? "inactive" : "active"}`);
  };

  return (
    <PageContainer>
      <PageHeader title="Menu Categories" description={`${cats.filter(c => c.active).length} active categories`}>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />Add Category
        </Button>
      </PageHeader>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-4 py-2.5 border-b border-border bg-muted/30 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
          <span className="w-6" />
          <span>Category</span>
          <span className="w-16 text-center">Items</span>
          <span className="w-16 text-center">Active</span>
          <span className="w-8" />
        </div>

        {cats.map((cat, i) => (
          <div key={cat.id} className={cn("grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-4 py-3.5 hover:bg-muted/30 transition-colors", i < cats.length - 1 && "border-b border-border")}>
            <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors w-6">
              <GripVertical className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: cat.color + "20" }}>
                <CategoryIcon name={cat.icon} style={{ color: cat.color }} />
              </div>
              <div>
                <p className="text-sm font-medium">{cat.name}</p>
                <p className="text-xs text-muted-foreground">Sort order: {cat.sortOrder}</p>
              </div>
            </div>

            <div className="w-16 flex justify-center">
              <Badge variant="secondary" className="text-xs">{cat.itemCount}</Badge>
            </div>

            <div className="w-16 flex justify-center">
              <Switch checked={cat.active} onCheckedChange={() => toggleActive(cat.id)} />
            </div>

            <div className="w-8 flex justify-center">
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full rounded-xl border-2 border-dashed border-border flex items-center justify-center gap-2 p-5 text-muted-foreground hover:border-primary hover:text-primary transition-all">
        <Plus className="h-5 w-5" />
        <span className="text-sm font-medium">Add New Category</span>
      </button>
    </PageContainer>
  );
}
