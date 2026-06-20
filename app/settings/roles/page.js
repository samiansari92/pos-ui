"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Check, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const roles = [
  { id: "owner", label: "Owner", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", description: "Full access" },
  { id: "manager", label: "Manager", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", description: "Operational access" },
  { id: "cashier", label: "Cashier", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", description: "Billing access" },
  { id: "captain", label: "Captain", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400", description: "Floor supervision" },
  { id: "waiter", label: "Waiter", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400", description: "Service access" },
  { id: "chef", label: "Chef", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", description: "Kitchen access" },
  { id: "kitchen_manager", label: "Kitchen Manager", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", description: "Kitchen management" },
  { id: "accountant", label: "Accountant", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400", description: "Reports access" },
];

const permissions = [
  { id: "view_dashboard", label: "View Dashboard", module: "Dashboard" },
  { id: "manage_menu", label: "Manage Menu", module: "Menu" },
  { id: "manage_orders", label: "Manage Orders", module: "Orders" },
  { id: "process_payment", label: "Process Payment", module: "POS" },
  { id: "apply_discount", label: "Apply Discounts", module: "POS" },
  { id: "manage_tables", label: "Manage Tables", module: "Tables" },
  { id: "view_kitchen", label: "View Kitchen", module: "Kitchen" },
  { id: "manage_inventory", label: "Manage Inventory", module: "Inventory" },
  { id: "manage_production", label: "Manage Production", module: "Production" },
  { id: "manage_crm", label: "Manage CRM", module: "CRM" },
  { id: "manage_staff", label: "Manage Staff", module: "Staff" },
  { id: "view_reports", label: "View Reports", module: "Reports" },
  { id: "manage_settings", label: "Manage Settings", module: "Settings" },
];

const initialMatrix = {
  owner: ["view_dashboard", "manage_menu", "manage_orders", "process_payment", "apply_discount", "manage_tables", "view_kitchen", "manage_inventory", "manage_production", "manage_crm", "manage_staff", "view_reports", "manage_settings"],
  manager: ["view_dashboard", "manage_menu", "manage_orders", "process_payment", "apply_discount", "manage_tables", "view_kitchen", "manage_inventory", "manage_production", "manage_crm", "manage_staff", "view_reports"],
  cashier: ["view_dashboard", "manage_orders", "process_payment", "apply_discount"],
  captain: ["view_dashboard", "manage_orders", "manage_tables"],
  waiter: ["manage_orders", "manage_tables"],
  chef: ["view_dashboard", "view_kitchen"],
  kitchen_manager: ["view_dashboard", "view_kitchen", "manage_production"],
  accountant: ["view_dashboard", "view_reports"],
};

export default function RolesPage() {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [expandedRole, setExpandedRole] = useState(null);

  const togglePermission = (role, permission) => {
    setMatrix(prev => ({
      ...prev,
      [role]: prev[role]?.includes(permission)
        ? prev[role].filter(p => p !== permission)
        : [...(prev[role] || []), permission],
    }));
  };

  const hasPermission = (role, permission) => matrix[role]?.includes(permission);

  const modules = [...new Set(permissions.map(p => p.module))];

  return (
    <PageContainer>
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/30">
          <Shield className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold">User Roles & Permissions</h1>
          <p className="text-xs text-muted-foreground">Control what each role can access and do</p>
        </div>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {roles.map(role => (
          <div key={role.id} className="rounded-xl border bg-card p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", role.color)}>
                {role.label}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{role.description}</p>
            <p className="text-xs font-medium mt-1">{matrix[role.id]?.length || 0} permissions</p>
          </div>
        ))}
      </div>

      {/* Permission matrix */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-48 sticky left-0 bg-muted/30">
                  Permission
                </th>
                {roles.map(role => (
                  <th key={role.id} className="px-3 py-3 text-center min-w-24">
                    <span className={cn("inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium", role.color)}>
                      {role.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map(module => (
                <React.Fragment key={module}>
                  <tr className="bg-muted/20">
                    <td colSpan={roles.length + 1} className="px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider sticky left-0 bg-muted/20">
                      {module}
                    </td>
                  </tr>
                  {permissions.filter(p => p.module === module).map(perm => (
                    <tr key={perm.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 text-sm font-medium sticky left-0 bg-card hover:bg-muted/20">
                        {perm.label}
                      </td>
                      {roles.map(role => (
                        <td key={role.id} className="px-3 py-2.5 text-center">
                          <button
                            onClick={() => role.id !== "owner" && togglePermission(role.id, perm.id)}
                            disabled={role.id === "owner"}
                            className={cn(
                              "h-5 w-5 rounded flex items-center justify-center mx-auto transition-all",
                              hasPermission(role.id, perm.id)
                                ? "bg-green-500 text-white"
                                : "bg-muted border border-border text-muted-foreground",
                              role.id !== "owner" && "cursor-pointer hover:scale-110"
                            )}
                          >
                            {hasPermission(role.id, perm.id)
                              ? <Check className="h-3 w-3" />
                              : <X className="h-3 w-3 opacity-30" />
                            }
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}