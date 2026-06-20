"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TableProperties, ShoppingCart, Monitor, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: TableProperties, label: "Tables", href: "/tables" },
  { icon: ShoppingCart, label: "POS", href: "/pos" },
  { icon: Monitor, label: "Kitchen", href: "/kitchen" },
  { icon: Package, label: "Inventory", href: "/inventory" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-all", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && <span className="h-1 w-1 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
