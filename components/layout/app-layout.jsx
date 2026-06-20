"use client";
import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { CommandMenu } from "./command-menu";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

export function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Navbar
          onToggleSidebar={() => setCollapsed(!collapsed)}
          onOpenCommand={() => setCommandOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-muted/20 pb-16 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />

      {/* Command palette */}
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
