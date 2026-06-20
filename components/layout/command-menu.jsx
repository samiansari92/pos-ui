"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  LayoutDashboard, TableProperties, QrCode, BookOpen, ShoppingCart,
  Monitor, Package, FlaskConical, Heart, UserCheck, BarChart3,
  Settings, Search, ArrowRight, Zap
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const commands = [
  { group: "Pages", icon: LayoutDashboard, label: "Dashboard Overview", href: "/dashboard", shortcut: "D" },
  { group: "Pages", icon: TableProperties, label: "Table Management", href: "/tables", shortcut: "T" },
  { group: "Pages", icon: QrCode, label: "QR Ordering", href: "/qr", shortcut: "Q" },
  { group: "Pages", icon: ShoppingCart, label: "POS / New Sale", href: "/pos", shortcut: "P" },
  { group: "Pages", icon: Monitor, label: "Kitchen Display", href: "/kitchen", shortcut: "K" },
  { group: "Pages", icon: BookOpen, label: "Menu Products", href: "/menu/products" },
  { group: "Pages", icon: BookOpen, label: "Menu Categories", href: "/menu/categories" },
  { group: "Pages", icon: Package, label: "Inventory Stock", href: "/inventory" },
  { group: "Pages", icon: Package, label: "Purchase Orders", href: "/inventory/purchase-orders" },
  { group: "Pages", icon: Heart, label: "CRM Customers", href: "/crm/customers" },
  { group: "Pages", icon: Heart, label: "Loyalty Program", href: "/crm/loyalty" },
  { group: "Pages", icon: UserCheck, label: "Staff Employees", href: "/staff/employees" },
  { group: "Pages", icon: UserCheck, label: "Attendance", href: "/staff/attendance" },
  { group: "Pages", icon: BarChart3, label: "Sales Reports", href: "/reports/sales" },
  { group: "Pages", icon: Settings, label: "Settings", href: "/settings" },
  { group: "Actions", icon: Zap, label: "New Sale", href: "/pos", shortcut: "N" },
  { group: "Actions", icon: Zap, label: "New Order", href: "/pos" },
  { group: "Actions", icon: Zap, label: "Add Product", href: "/menu/products/new" },
  { group: "Actions", icon: Zap, label: "Add Employee", href: "/staff/employees/new" },
];

export function CommandMenu({ open, onOpenChange }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const filtered = query
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const groups = [...new Set(filtered.map(c => c.group))];

  const handleSelect = (href) => {
    router.push(href);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-[520px] overflow-hidden">
        <Command className="rounded-2xl" shouldFilter={false}>
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search pages, actions..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-muted-foreground hover:text-foreground">
                Clear
              </button>
            )}
            <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="flex flex-col items-center justify-center py-8 text-sm text-muted-foreground gap-2">
              <Search className="h-8 w-8 opacity-30" />
              <p>No results for &quot;{query}&quot;</p>
            </Command.Empty>
            {groups.map((group) => (
              <Command.Group key={group} heading={group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
                {filtered.filter(c => c.group === group).map((cmd) => (
                  <Command.Item
                    key={cmd.href + cmd.label}
                    value={cmd.label}
                    onSelect={() => handleSelect(cmd.href)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors aria-selected:bg-accent"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted shrink-0">
                      <cmd.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="flex-1">{cmd.label}</span>
                    {cmd.shortcut && (
                      <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-aria-selected:opacity-100" />
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
          <div className="flex items-center gap-4 border-t border-border px-4 py-2">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <kbd className="inline-flex h-4 items-center rounded border border-border bg-muted px-1 font-mono text-[9px]">↑↓</kbd>
              Navigate
            </span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <kbd className="inline-flex h-4 items-center rounded border border-border bg-muted px-1 font-mono text-[9px]">↵</kbd>
              Open
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
