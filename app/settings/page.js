"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Store, GitBranch, Calculator, Printer, Bell, Shield, ChevronRight,
  Save, Globe, Palette, Smartphone, Wifi, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { restaurant } from "@/lib/dummy-data";
import { toast } from "sonner";

const settingSections = [
  { id: "restaurant", label: "Restaurant", icon: Store, href: "/settings" },
  { id: "branches", label: "Branches", icon: GitBranch, href: "/settings/branches" },
  { id: "tax", label: "Tax & GST", icon: Calculator, href: "/settings/tax" },
  { id: "printers", label: "Printers", icon: Printer, href: "/settings/printers" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "/settings/notifications" },
  { id: "roles", label: "User Roles", icon: Shield, href: "/settings/roles" },
];

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: restaurant.name,
    tagline: restaurant.tagline,
    phone: restaurant.phone,
    email: restaurant.email,
    address: restaurant.address,
    gstin: restaurant.gstin,
    fssai: restaurant.fssai,
    currency: "INR",
    timezone: "Asia/Kolkata",
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    newOrder: true,
    paymentReceived: true,
    staffAttendance: false,
    dailyReport: true,
    customerFeedback: true,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="flex h-full">
      {/* Settings sidebar */}
      <div className="w-56 border-r border-border bg-card py-4 px-3 shrink-0 hidden md:block">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-2">Settings</p>
        <nav className="space-y-0.5">
          {settingSections.map(section => (
            <Link
              key={section.id}
              href={section.href}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <section.icon className="h-4 w-4 shrink-0" />
              {section.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main settings content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
        <div className="flex items-center justify-between max-w-2xl">
          <div>
            <h1 className="text-xl font-bold">Restaurant Settings</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Manage your restaurant profile and preferences</p>
          </div>
          <Button size="sm" className="gap-1.5" onClick={handleSave}>
            <Save className="h-3.5 w-3.5" />Save Changes
          </Button>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Basic Info */}
          <div className="rounded-xl border bg-card p-5">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Store className="h-4 w-4 text-muted-foreground" />
              Restaurant Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Restaurant Name</Label>
                  <Input id="name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="h-8 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tagline" className="text-xs">Tagline</Label>
                  <Input id="tagline" value={formData.tagline} onChange={e => setFormData(p => ({ ...p, tagline: e.target.value }))} className="h-8 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Phone</Label>
                  <Input id="phone" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="h-8 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="h-8 text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address" className="text-xs">Address</Label>
                <Input id="address" value={formData.address} onChange={e => setFormData(p => ({ ...p, address: e.target.value }))} className="h-8 text-sm" />
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="rounded-xl border bg-card p-5">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              Legal & Compliance
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="gstin" className="text-xs">GSTIN</Label>
                <Input id="gstin" value={formData.gstin} onChange={e => setFormData(p => ({ ...p, gstin: e.target.value }))} className="h-8 text-sm font-mono" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fssai" className="text-xs">FSSAI License</Label>
                <Input id="fssai" value={formData.fssai} onChange={e => setFormData(p => ({ ...p, fssai: e.target.value }))} className="h-8 text-sm font-mono" />
              </div>
            </div>
          </div>

          {/* Regional */}
          <div className="rounded-xl border bg-card p-5">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Regional Settings
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Currency</Label>
                <Select value={formData.currency} onValueChange={v => setFormData(p => ({ ...p, currency: v }))}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Timezone</Label>
                <Select value={formData.timezone} onValueChange={v => setFormData(p => ({ ...p, timezone: v }))}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-xl border bg-card p-5">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              Notification Preferences
            </h2>
            <div className="space-y-3">
              {Object.entries(notifications).map(([key, val]) => {
                const labels = {
                  lowStock: "Low Stock Alerts",
                  newOrder: "New Order Notifications",
                  paymentReceived: "Payment Received",
                  staffAttendance: "Staff Attendance",
                  dailyReport: "Daily Summary Report",
                  customerFeedback: "Customer Feedback",
                };
                return (
                  <div key={key} className="flex items-center justify-between">
                    <p className="text-sm">{labels[key]}</p>
                    <Switch checked={val} onCheckedChange={v => setNotifications(p => ({ ...p, [key]: v }))} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
