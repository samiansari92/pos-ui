"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Minus, Trash2, ChevronRight, Calculator, Tag,
  CreditCard, Smartphone, Banknote, Clock, X, Check, UtensilsCrossed,
  Salad, Wheat, ChefHat, IceCream, Coffee, Package, Soup
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { menuItems, categories, tables } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";

const CAT_ICONS = {
  Salad, UtensilsCrossed, Wheat, ChefHat, IceCream,
  Cup: Coffee, Package, Soup,
};
function CatIcon({ name }) {
  const Icon = CAT_ICONS[name] || UtensilsCrossed;
  return <Icon className="h-3.5 w-3.5" />;
}

const paymentMethods = [
  { id: "cash", label: "Cash", icon: Banknote, color: "text-green-600" },
  { id: "card", label: "Card", icon: CreditCard, color: "text-blue-600" },
  { id: "upi", label: "UPI", icon: Smartphone, color: "text-purple-600" },
];

export default function POSPage() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [discount, setDiscount] = useState(0);
  const [orderType, setOrderType] = useState("dine-in");
  const [selectedTable, setSelectedTable] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const filteredItems = menuItems.filter(item => {
    const matchCat = activeCategory === "all" || item.categoryId === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && item.available;
  });

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1, notes: "" }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c);
      return updated.filter(c => c.qty > 0);
    });
  };

  const removeItem = (id) => setCart(prev => prev.filter(c => c.id !== id));
  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discountAmt = (subtotal * discount) / 100;
  const taxable = subtotal - discountAmt;
  const tax = taxable * 0.18;
  const total = taxable + tax;

  const handlePayment = () => {
    toast.success(`Payment of ${formatCurrency(total)} received via ${selectedPayment.toUpperCase()}`, {
      description: "Order has been placed and sent to kitchen",
      duration: 4000,
    });
    clearCart();
    setShowPayment(false);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: Menu */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden border-r border-border">
        {/* Top bar */}
        <div className="p-4 border-b border-border bg-background space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              {["dine-in", "takeaway", "delivery"].map(t => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium transition-all capitalize",
                    orderType === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all border",
                activeCategory === "all"
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              All Items
            </button>
            {categories.filter(c => c.active).map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all border",
                  activeCategory === cat.id
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                )}
              >
                <CatIcon name={cat.icon} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => addToCart(item)}
                className="text-left rounded-xl border border-border bg-card p-3 hover:shadow-md hover:border-primary/20 transition-all group"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-2.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"; }}
                  />
                  <div className={cn(
                    "absolute top-1.5 left-1.5 h-4 w-4 flex items-center justify-center rounded-sm border-2",
                    item.veg ? "border-green-600 bg-white" : "border-red-600 bg-white"
                  )}>
                    <span className={cn("h-2 w-2 rounded-full", item.veg ? "bg-green-600" : "bg-red-600")} />
                  </div>
                  {item.popular && (
                    <Badge variant="warning" className="absolute top-1.5 right-1.5 text-[9px] h-4 px-1.5">
                      Popular
                    </Badge>
                  )}
                  {cart.find(c => c.id === item.id) && (
                    <div className="absolute bottom-1.5 right-1.5 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      {cart.find(c => c.id === item.id).qty}
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold leading-tight line-clamp-2 mb-1">{item.name}</p>
                <p className="text-sm font-bold text-foreground">{formatCurrency(item.price)}</p>
              </motion.button>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">No items found</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Bill */}
      <div className="w-[340px] xl:w-[380px] flex flex-col bg-card shrink-0">
        {/* Order header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold">New Order</p>
              <p className="text-[11px] text-muted-foreground capitalize">{orderType}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {orderType === "dine-in" && (
                <select
                  value={selectedTable || ""}
                  onChange={e => setSelectedTable(e.target.value)}
                  className="h-7 rounded-lg border border-input bg-background text-xs px-2 focus:ring-1 focus:ring-ring"
                >
                  <option value="">Select Table</option>
                  {tables.filter(t => t.status === "available").map(t => (
                    <option key={t.id} value={t.id}>{t.number} ({t.capacity} seats)</option>
                  ))}
                </select>
              )}
              {cart.length > 0 && (
                <Button variant="ghost" size="icon-sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <AnimatePresence>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UtensilsCrossed className="h-10 w-10 text-muted-foreground/20 mb-3" />
                <p className="text-sm text-muted-foreground">Cart is empty</p>
                <p className="text-xs text-muted-foreground mt-1">Click items to add to order</p>
              </div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/50 border border-border/50"
                >
                  <div className={cn("h-3 w-3 rounded-sm shrink-0 flex items-center justify-center border", item.veg ? "border-green-600" : "border-red-600")}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", item.veg ? "bg-green-600" : "bg-red-600")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => updateQty(item.id, -1)} className="h-6 w-6 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="h-6 w-6 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="h-6 w-6 rounded-lg flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-xs font-semibold w-16 text-right shrink-0">{formatCurrency(item.price * item.qty)}</span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Bill summary */}
        {cart.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
            {/* Discount */}
            <div className="flex items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <Input
                type="number"
                placeholder="Discount %"
                value={discount || ""}
                onChange={e => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="h-7 text-xs"
                min={0}
                max={100}
              />
              {discount > 0 && (
                <Button variant="ghost" size="icon-sm" onClick={() => setDiscount(0)}>
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cart.reduce((s, c) => s + c.qty, 0)} items)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-{formatCurrency(discountAmt)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>GST (18%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-foreground pt-1.5 border-t border-border">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div className="grid grid-cols-3 gap-1.5">
              {paymentMethods.map(pm => (
                <button
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl p-2.5 border text-xs font-medium transition-all",
                    selectedPayment === pm.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  <pm.icon className={cn("h-4 w-4", selectedPayment === pm.id ? "text-primary" : pm.color)} />
                  {pm.label}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 h-9 text-xs gap-1.5">
                <Clock className="h-3.5 w-3.5" />KOT
              </Button>
              <Button
                size="sm"
                className="flex-2 h-9 text-xs gap-1.5 flex-1"
                onClick={handlePayment}
              >
                <Check className="h-3.5 w-3.5" />
                Collect {formatCurrency(total)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
