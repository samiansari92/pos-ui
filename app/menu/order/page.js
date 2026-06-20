"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingCart, Star, Plus, Minus, X, Bell,
  FileText, ArrowRight, Check, Flame, Clock,
  Salad, UtensilsCrossed, Wheat, ChefHat, IceCream,
  Coffee, Package, Soup
} from "lucide-react";
import { menuItems, categories, restaurant } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";

// Map category icon name strings to Lucide components
const CATEGORY_ICONS = {
  Salad, UtensilsCrossed, Wheat, ChefHat, IceCream,
  Cup: Coffee, Package, Soup,
};

function CatIcon({ name, className }) {
  const Icon = CATEGORY_ICONS[name] || UtensilsCrossed;
  return <Icon className={cn("h-3.5 w-3.5", className)} />;
}

// Customer-facing PWA menu page
export default function CustomerMenuPage() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const searchRef = useRef(null);

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === "all" || item.categoryId === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && item.available;
  });

  const addToCart = (item, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { ...item, qty }];
    });
    toast.success(`${item.name} added to cart`, { duration: 1500 });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0));
  };

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const tax = cartTotal * 0.05; // 5% for takeout/QR
  const grandTotal = cartTotal + tax;

  const placeOrder = () => {
    setShowCart(false);
    setOrderPlaced(true);
    setCart([]);
  };

  // Order placed success screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm w-full">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
            <Check className="h-12 w-12 text-white" strokeWidth={3} />
          </motion.div>
          <h1 className="text-2xl font-black text-green-800 dark:text-green-200">Order Placed!</h1>
          <p className="text-green-700 dark:text-green-300 mt-2 text-sm">Your order has been sent to the kitchen</p>
          <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-green-900/30 border border-green-200 dark:border-green-800">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">Estimated time</p>
            <p className="text-3xl font-black text-green-700 dark:text-green-300 mt-1">25–30 min</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-green-300 bg-white dark:bg-green-900/30 text-green-700 dark:text-green-300 py-3 text-sm font-semibold hover:bg-green-50 transition-colors">
              <Bell className="h-4 w-4" />Call Waiter
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 text-white py-3 text-sm font-semibold hover:bg-green-700 transition-colors">
              <FileText className="h-4 w-4" />Track Order
            </button>
          </div>
          <button onClick={() => setOrderPlaced(false)} className="mt-4 text-sm text-green-600 dark:text-green-400 underline underline-offset-4">
            Order more items
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 max-w-md mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black">{restaurant.name}</h1>
            <p className="text-xs text-gray-500">Table T3 · Dine In</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-1.5 bg-primary text-primary-foreground rounded-2xl px-3 py-2 text-sm font-semibold"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{formatCurrency(cartTotal)}</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            ref={searchRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for dishes..."
            className="w-full h-10 pl-9 pr-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn("flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all", activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300")}
          >
            All
          </button>
          {categories.filter(c => c.active).map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={cn("flex-shrink-0 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap", activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300")}>
              <CatIcon name={cat.icon} />{cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-3 pb-32">
        {filtered.map((item, i) => {
          const inCart = cart.find(c => c.id === item.id);
          return (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-3 p-3">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-1.5 mb-1">
                    <div className={cn("h-4 w-4 flex items-center justify-center rounded border-2 shrink-0 mt-0.5", item.veg ? "border-green-600" : "border-red-600")}>
                      <span className={cn("h-2 w-2 rounded-full", item.veg ? "bg-green-600" : "bg-red-600")} />
                    </div>
                    <p className="text-sm font-bold leading-tight">{item.name}</p>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mb-1.5">{item.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{item.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">·</span>
                    <div className="flex items-center gap-0.5 text-[11px] text-gray-500">
                      <Clock className="h-3 w-3" />{item.preparationTime}m
                    </div>
                    {item.spicy > 0 && (
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: item.spicy }).map((_, i) => (
                          <Flame key={i} className="h-3 w-3 text-red-500" />
                        ))}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black">{formatCurrency(item.price)}</span>
                    {inCart ? (
                      <div className="flex items-center gap-2 bg-primary rounded-full px-1 py-0.5">
                        <button onClick={() => updateQty(item.id, -1)} className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Minus className="h-3 w-3 text-white" />
                        </button>
                        <span className="text-sm font-bold text-white w-4 text-center">{inCart.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Plus className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item)} className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1.5 text-xs font-bold hover:bg-primary/90 transition-colors">
                        <Plus className="h-3.5 w-3.5" />Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Search className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">No items found</p>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      {cartCount > 0 && !showCart && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-6 z-20">
          <button onClick={() => setShowCart(true)} className="w-full flex items-center justify-between bg-primary text-primary-foreground rounded-2xl px-4 py-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold">{cartCount}</span>
              <span className="text-sm font-semibold">View Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{formatCurrency(cartTotal)}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </motion.div>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCart(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl z-50 max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black">Your Order</h2>
                  <button onClick={() => setShowCart(false)} className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{cartCount} items · Table T3</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-xl object-cover shrink-0" onError={e => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"; }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-1 py-0.5">
                      <button onClick={() => updateQty(item.id, -1)} className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold w-16 text-right shrink-0">{formatCurrency(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span><span>{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>GST (5%)</span><span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between font-black text-base pt-1 border-t border-gray-100 dark:border-gray-800">
                    <span>Total</span><span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <button onClick={placeOrder} className="w-full flex items-center justify-between bg-primary text-primary-foreground rounded-2xl px-4 py-4 font-bold">
                  <span>Place Order</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Bell className="h-4 w-4" />Call Waiter
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <FileText className="h-4 w-4" />Request Bill
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
