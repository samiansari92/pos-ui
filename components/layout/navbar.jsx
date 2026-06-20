"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Bell, Search, Menu, Sun, Moon, ChevronDown,
  Settings, LogOut, User, HelpCircle, Store,
  ShoppingBag, Package, UserCircle, CreditCard, CalendarDays
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/lib/dummy-data";
import { timeAgo, cn } from "@/lib/utils";

const notifIconMap = {
  order: ShoppingBag,
  inventory: Package,
  staff: UserCircle,
  payment: CreditCard,
  reservation: CalendarDays,
};

export function Navbar({ onToggleSidebar, onOpenCommand }) {
  const { theme, setTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4">
      {/* Sidebar toggle */}
      <Button variant="ghost" size="icon-sm" onClick={onToggleSidebar} className="shrink-0">
        <Menu className="h-4 w-4" />
      </Button>

      {/* Branch selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hidden md:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium hover:bg-accent transition-colors">
            <Store className="h-3.5 w-3.5 text-muted-foreground" />
            <span>MG Road</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Branches</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            MG Road <Badge variant="success" className="ml-auto text-[10px] px-1.5 py-0 h-4">Active</Badge>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" />
            Koramangala
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" />
            Chennai Anna Nagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search / Command */}
      <button
        onClick={onOpenCommand}
        className="hidden md:flex flex-1 max-w-sm items-center gap-2 rounded-lg border border-input bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
      >
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1 text-left">Search anything...</span>
        <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium opacity-60">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <div className="flex-1" />

      {/* Quick actions */}
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon-sm" onClick={onOpenCommand} className="md:hidden">
          <Search className="h-4 w-4" />
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="relative">
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <p className="text-sm font-semibold">Notifications</p>
              <Badge variant="info" className="text-[10px] h-5 px-2">{unread} new</Badge>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => {
              const NotifIcon = notifIconMap[notif.type] || Bell;
              return (
                <div
                  key={notif.id}
                  className={cn(
                    "flex gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50 last:border-0",
                    !notif.read && "bg-blue-50/50 dark:bg-blue-950/20"
                  )}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    notif.priority === "critical" ? "bg-red-100 dark:bg-red-900/30" :
                    notif.priority === "high" ? "bg-orange-100 dark:bg-orange-900/30" :
                    "bg-muted"
                  )}>
                    <NotifIcon className={cn(
                      "h-4 w-4",
                      notif.priority === "critical" ? "text-red-600" :
                      notif.priority === "high" ? "text-orange-500" :
                      "text-muted-foreground"
                    )} />
                  </div>
                  <div className="min-w-0">
                    <p className={cn("text-xs font-medium", !notif.read && "text-foreground")}>{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{timeAgo(notif.time)}</p>
                  </div>
                  {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                </div>
              );
            })}
            </div>
            <div className="p-3 border-t">
              <Button variant="ghost" className="w-full h-8 text-xs text-primary">View all notifications</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-accent transition-colors">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-[10px] font-bold bg-primary text-primary-foreground">VJ</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-medium leading-none">Vikram Joshi</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Manager</p>
              </div>
              <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <p className="font-medium">Vikram Joshi</p>
              <p className="text-xs font-normal text-muted-foreground">vikram@spicegarden.in</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/settings" className="gap-2"><User className="h-4 w-4" />Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/settings" className="gap-2"><Settings className="h-4 w-4" />Settings</Link></DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><HelpCircle className="h-4 w-4" />Help & Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" />Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
