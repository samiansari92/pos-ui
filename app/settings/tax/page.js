"use client";
import React, { useState } from "react";
import { Plus, Calculator, Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const taxSlabs = [
  { id: "t1", name: "GST 5%", rate: 5, cgst: 2.5, sgst: 2.5, igst: 5, applicable: "Takeaway food, packaged meals", active: true, isDefault: false },
  { id: "t2", name: "GST 12%", rate: 12, cgst: 6, sgst: 6, igst: 12, applicable: "Processed/packaged goods", active: true, isDefault: false },
  { id: "t3", name: "GST 18%", rate: 18, cgst: 9, sgst: 9, igst: 18, applicable: "Restaurant (AC), fine dining", active: true, isDefault: true },
  { id: "t4", name: "GST 28%", rate: 28, cgst: 14, sgst: 14, igst: 28, applicable: "Aerated drinks, luxury items", active: false, isDefault: false },
];

import { PageContainer, PageHeader } from "@/components/layout/page-container";

export default function TaxSettingsPage() {
  const [slabs, setSlabs] = useState(taxSlabs);
  const [gstin, setGstin] = useState("29AABCU9603R1ZX");
  const [fssai, setFssai] = useState("12345678901234");
  const [inclusiveTax, setInclusiveTax] = useState(false);
  const [serviceCharge, setServiceCharge] = useState(true);
  const [serviceChargeRate, setServiceChargeRate] = useState(10);

  const toggleSlab = (id) => setSlabs(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  const setDefault = (id) => setSlabs(prev => prev.map(s => ({ ...s, isDefault: s.id === id })));

  return (
    <PageContainer className="max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Tax & GST Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Configure tax rates and compliance settings</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => toast.success("Tax settings saved")}>
          <Save className="h-3.5 w-3.5" />Save
        </Button>
      </div>

      {/* Registration */}
      <div className="rounded-xl border bg-card p-5">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-muted-foreground" />Registration Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">GSTIN</Label>
            <Input value={gstin} onChange={e => setGstin(e.target.value)} className="h-8 text-sm font-mono" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">FSSAI License No.</Label>
            <Input value={fssai} onChange={e => setFssai(e.target.value)} className="h-8 text-sm font-mono" />
          </div>
        </div>
      </div>

      {/* Tax slabs */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <h2 className="text-sm font-semibold">GST Slabs</h2>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Plus className="h-3 w-3" />Add Slab</Button>
        </div>
        <div className="divide-y divide-border">
          {slabs.map(slab => (
            <div key={slab.id} className={cn("flex items-center gap-4 px-4 py-3.5 hover:bg-muted/20 transition-colors", !slab.active && "opacity-50")}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold">{slab.name}</span>
                  {slab.isDefault && <Badge variant="success" className="text-[10px]">Default</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">
                  CGST {slab.cgst}% + SGST {slab.sgst}% · {slab.applicable}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {!slab.isDefault && slab.active && (
                  <button onClick={() => setDefault(slab.id)} className="text-xs text-primary hover:underline">Set Default</button>
                )}
                <Switch checked={slab.active} onCheckedChange={() => toggleSlab(slab.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax preferences */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="text-sm font-semibold">Tax Preferences</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Tax Inclusive Pricing</p>
            <p className="text-xs text-muted-foreground">Display prices inclusive of tax on menu</p>
          </div>
          <Switch checked={inclusiveTax} onCheckedChange={setInclusiveTax} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Service Charge</p>
            <p className="text-xs text-muted-foreground">Apply service charge on dine-in orders</p>
          </div>
          <div className="flex items-center gap-3">
            {serviceCharge && (
              <div className="flex items-center gap-1.5">
                <Input type="number" value={serviceChargeRate} onChange={e => setServiceChargeRate(Number(e.target.value))} className="h-7 w-16 text-xs text-center" min={0} max={20} />
                <span className="text-xs text-muted-foreground">%</span>
              </div>
            )}
            <Switch checked={serviceCharge} onCheckedChange={setServiceCharge} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
