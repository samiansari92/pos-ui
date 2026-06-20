"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Download, Copy, QrCode, ExternalLink, Check, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tables } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const baseUrl = "https://spicegarden.in/menu";

export default function QRPage() {
  const [selectedTable, setSelectedTable] = useState(tables[0]);
  const [copied, setCopied] = useState(false);

  const qrUrl = `${baseUrl}?table=${selectedTable?.number}&branch=mgroad`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("URL copied to clipboard");
  };

  const handleDownload = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-table-${selectedTable.number}.svg`;
    link.click();
    toast.success(`QR for Table ${selectedTable.number} downloaded`);
  };

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">QR Ordering</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Generate and manage QR codes for table ordering</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" />Bulk Download All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Generator */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold mb-1">QR Generator</h2>
              <p className="text-xs text-muted-foreground">Select a table to generate its QR code</p>
            </div>

            {/* Table selector */}
            <div className="space-y-1.5">
              <Label className="text-xs">Select Table</Label>
              <div className="grid grid-cols-4 gap-1.5">
                {tables.slice(0, 8).map(table => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={cn(
                      "rounded-lg border p-2 text-xs font-medium transition-all",
                      selectedTable?.id === table.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {table.number}
                  </button>
                ))}
              </div>
            </div>

            {/* QR Preview */}
            <div className="flex flex-col items-center gap-4 p-5 rounded-xl bg-white border border-border">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">SPICE GARDEN</p>
                <p className="text-xs font-semibold text-gray-700">Table {selectedTable?.number}</p>
              </div>
              <QRCodeSVG
                id="qr-code"
                value={qrUrl}
                size={160}
                level="H"
                fgColor="#0f172a"
                imageSettings={{
                  src: "",
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
              <div className="text-center">
                <p className="text-[10px] font-medium text-gray-600">Scan to order</p>
                <p className="text-[10px] text-gray-400">Powered by Spice Garden</p>
              </div>
            </div>

            {/* URL display */}
            <div className="space-y-1.5">
              <Label className="text-xs">QR URL</Label>
              <div className="flex gap-2">
                <Input value={qrUrl} readOnly className="h-8 text-xs font-mono text-muted-foreground" />
                <Button variant="outline" size="icon-sm" onClick={handleCopy}>
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs" onClick={handleDownload}>
                <Download className="h-3.5 w-3.5" />Download SVG
              </Button>
              <Button size="sm" className="flex-1 gap-1.5 text-xs" asChild>
                <a href={qrUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />Preview Menu
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* All QR codes */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">All Tables</h2>
              <Badge variant="secondary" className="text-xs">{tables.length} tables</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {tables.map((table, i) => (
                <motion.div
                  key={table.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "rounded-xl border p-3 cursor-pointer transition-all hover:shadow-md",
                    selectedTable?.id === table.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  )}
                  onClick={() => setSelectedTable(table)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <QRCodeSVG
                      value={`${baseUrl}?table=${table.number}&branch=mgroad`}
                      size={80}
                      level="M"
                      fgColor="#0f172a"
                    />
                    <div className="text-center">
                      <p className="text-xs font-bold">{table.number}</p>
                      <p className="text-[10px] text-muted-foreground">{table.floor} · {table.capacity} seats</p>
                    </div>
                    <Badge
                      variant={table.status === "available" ? "success" : table.status === "occupied" ? "occupied" : table.status === "reserved" ? "reserved" : "info"}
                      className="text-[9px] h-4 px-1.5"
                    >
                      {table.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "QR Scans Today", value: "247", icon: Smartphone, color: "text-blue-500" },
          { label: "Orders via QR", value: "38", icon: QrCode, color: "text-green-500" },
          { label: "QR Revenue Today", value: "₹48,620", icon: QrCode, color: "text-purple-500" },
          { label: "Active QR Tables", value: "8", icon: QrCode, color: "text-orange-500" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
}