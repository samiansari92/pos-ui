"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, QrCode, BookOpen,
  ShoppingCart, Monitor, Package, FlaskConical, Heart, UserCheck,
  BarChart3, Settings, ChevronRight,
  TableProperties, HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Tables", icon: TableProperties, href: "/tables", badge: "3" },
  { label: "QR Ordering", icon: QrCode, href: "/qr" },
  {
    label: "Menu", icon: BookOpen, href: "/menu",
    children: [
      { label: "Categories", href: "/menu/categories" },
      { label: "Products", href: "/menu/products" },
    ],
  },
  { label: "POS / Billing", icon: ShoppingCart, href: "/pos" },
  { label: "Kitchen Display", icon: Monitor, href: "/kitchen", badge: "5", badgeVariant: "warning" },
  {
    label: "Inventory", icon: Package, href: "/inventory", badge: "2", badgeVariant: "error",
    children: [
      { label: "Stock Dashboard", href: "/inventory" },
      { label: "Purchase Orders", href: "/inventory/purchase-orders" },
      { label: "Goods Received", href: "/inventory/grn" },
      { label: "Wastage", href: "/inventory/wastage" },
    ],
  },
  {
    label: "Production", icon: FlaskConical, href: "/production",
    children: [
      { label: "Recipes", href: "/production/recipes" },
      { label: "Production Orders", href: "/production/orders" },
    ],
  },
  {
    label: "CRM", icon: Heart, href: "/crm",
    children: [
      { label: "Customers", href: "/crm/customers" },
      { label: "Loyalty & Rewards", href: "/crm/loyalty" },
      { label: "Coupons", href: "/crm/coupons" },
      { label: "Feedback", href: "/crm/feedback" },
    ],
  },
  {
    label: "Staff", icon: UserCheck, href: "/staff",
    children: [
      { label: "Employees", href: "/staff/employees" },
      { label: "Attendance", href: "/staff/attendance" },
      { label: "Shifts", href: "/staff/shifts" },
      { label: "Payroll", href: "/staff/payroll" },
    ],
  },
  {
    label: "Reports", icon: BarChart3, href: "/reports",
    children: [
      { label: "Sales Reports", href: "/reports/sales" },
      { label: "Inventory Reports", href: "/reports/inventory" },
      { label: "Staff Reports", href: "/reports/staff" },
      { label: "Tax Reports", href: "/reports/tax" },
    ],
  },
  {
    label: "Settings", icon: Settings, href: "/settings",
    children: [
      { label: "Restaurant", href: "/settings" },
      { label: "Branches", href: "/settings/branches" },
      { label: "User Roles", href: "/settings/roles" },
    ],
  },
];

function NavItem({ item, collapsed }) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const [open, setOpen] = useState(() =>
    hasChildren ? item.children.some(c => pathname.startsWith(c.href)) : false
  );
  const isActive = hasChildren
    ? item.children.some(c => pathname === c.href || pathname.startsWith(c.href + "/")) || pathname === item.href
    : pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={hasChildren ? item.children[0].href : item.href}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-150 mx-auto",
                isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.badge && (
                <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">{item.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150",
            isActive ? "text-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant={item.badgeVariant || "info"} className="text-[10px] px-1.5 py-0 h-4 min-w-4">
              {item.badge}
            </Badge>
          )}
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="ml-6 mt-0.5 border-l border-border pl-3 py-0.5 space-y-0.5">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all duration-150",
                      pathname === child.href || pathname.startsWith(child.href + "/")
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150",
        isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <Badge variant={item.badgeVariant || "info"} className="text-[10px] px-1.5 py-0 h-4 min-w-4">
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}

export function Sidebar({ collapsed = false }) {
  return (
    <aside className={cn("flex flex-col h-full bg-card border-r border-border transition-all duration-300", collapsed ? "w-14" : "w-[220px]")}>
      {/* Logo */}
      <div className={cn("flex items-center border-b border-border", collapsed ? "h-14 justify-center" : "h-14 px-4 gap-3")}>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm shrink-0">
          SG
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Spice Garden</p>
            <p className="text-[10px] text-muted-foreground truncate">MG Road Branch</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className={cn("space-y-0.5", collapsed ? "px-2" : "px-3")}>
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} collapsed={collapsed} />
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom */}
      <div className={cn("border-t border-border py-3", collapsed ? "px-2 space-y-1" : "px-3 space-y-1")}>
        {collapsed ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors mx-auto">
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Help</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <button className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors w-full">
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>Help & Support</span>
          </button>
        )}
      </div>
    </aside>
  );
}
