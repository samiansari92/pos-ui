// ===== RESTAURANT INFO =====
export const restaurant = {
  id: "rest_01",
  name: "Spice Garden",
  tagline: "Authentic Indian Cuisine",
  logo: "/logo.svg",
  phone: "+91 98765 43210",
  email: "info@spicegarden.in",
  address: "42, MG Road, Bengaluru, Karnataka 560001",
  gstin: "29AABCU9603R1ZX",
  fssai: "12345678901234",
  currency: "INR",
  timezone: "Asia/Kolkata",
  branches: ["Bengaluru MG Road", "Bengaluru Koramangala", "Chennai Anna Nagar"],
  activeBranch: "Bengaluru MG Road",
};

// ===== CATEGORIES =====
export const categories = [
  { id: "cat_01", name: "Starters", icon: "Salad", color: "#FF6B6B", itemCount: 18, active: true, sortOrder: 1 },
  { id: "cat_02", name: "Main Course", icon: "UtensilsCrossed", color: "#4ECDC4", itemCount: 34, active: true, sortOrder: 2 },
  { id: "cat_03", name: "Breads", icon: "Wheat", color: "#45B7D1", itemCount: 12, active: true, sortOrder: 3 },
  { id: "cat_04", name: "Biryani", icon: "ChefHat", color: "#96CEB4", itemCount: 8, active: true, sortOrder: 4 },
  { id: "cat_05", name: "Desserts", icon: "IceCream", color: "#FFEAA7", itemCount: 10, active: true, sortOrder: 5 },
  { id: "cat_06", name: "Beverages", icon: "Cup", color: "#DDA0DD", itemCount: 20, active: true, sortOrder: 6 },
  { id: "cat_07", name: "Combos", icon: "Package", color: "#98D8C8", itemCount: 6, active: true, sortOrder: 7 },
  { id: "cat_08", name: "Soups", icon: "Soup", color: "#F7DC6F", itemCount: 8, active: false, sortOrder: 8 },
];

// ===== MENU ITEMS =====
export const menuItems = [
  { id: "item_01", categoryId: "cat_01", name: "Paneer Tikka", description: "Cottage cheese marinated in spices, grilled in tandoor", price: 320, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400", veg: true, spicy: 2, popular: true, available: true, preparationTime: 15, tags: ["bestseller", "tandoor"], rating: 4.8, reviews: 234 },
  { id: "item_02", categoryId: "cat_01", name: "Chicken 65", description: "Deep fried spicy chicken marinated with ginger garlic paste", price: 380, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400", veg: false, spicy: 3, popular: true, available: true, preparationTime: 18, tags: ["spicy", "bestseller"], rating: 4.7, reviews: 189 },
  { id: "item_03", categoryId: "cat_01", name: "Veg Spring Rolls", description: "Crispy rolls filled with fresh vegetables and spices", price: 250, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400", veg: true, spicy: 1, popular: false, available: true, preparationTime: 12, tags: ["crispy"], rating: 4.3, reviews: 98 },
  { id: "item_04", categoryId: "cat_02", name: "Butter Chicken", description: "Tender chicken pieces in rich tomato butter gravy", price: 450, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400", veg: false, spicy: 1, popular: true, available: true, preparationTime: 20, tags: ["bestseller", "mild"], rating: 4.9, reviews: 567 },
  { id: "item_05", categoryId: "cat_02", name: "Palak Paneer", description: "Fresh cottage cheese in creamy spinach gravy", price: 380, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400", veg: true, spicy: 1, popular: true, available: true, preparationTime: 18, tags: ["healthy", "bestseller"], rating: 4.6, reviews: 312 },
  { id: "item_06", categoryId: "cat_04", name: "Chicken Biryani", description: "Aromatic basmati rice with spiced chicken, saffron and caramelized onions", price: 520, image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400", veg: false, spicy: 2, popular: true, available: true, preparationTime: 30, tags: ["bestseller", "specialty"], rating: 4.9, reviews: 892 },
  { id: "item_07", categoryId: "cat_04", name: "Veg Biryani", description: "Fragrant basmati with fresh vegetables and whole spices", price: 420, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400", veg: true, spicy: 2, popular: false, available: true, preparationTime: 28, tags: ["specialty"], rating: 4.5, reviews: 234 },
  { id: "item_08", categoryId: "cat_03", name: "Garlic Naan", description: "Soft leavened bread with garlic and butter, baked in tandoor", price: 80, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400", veg: true, spicy: 0, popular: true, available: true, preparationTime: 8, tags: ["tandoor"], rating: 4.7, reviews: 445 },
  { id: "item_09", categoryId: "cat_05", name: "Gulab Jamun", description: "Soft khoya dumplings soaked in rose flavored sugar syrup", price: 160, image: "https://images.unsplash.com/photo-1620000751043-bb05a29b8c49?w=400", veg: true, spicy: 0, popular: true, available: true, preparationTime: 5, tags: ["sweet", "bestseller"], rating: 4.8, reviews: 367 },
  { id: "item_10", categoryId: "cat_06", name: "Mango Lassi", description: "Refreshing yogurt drink blended with Alphonso mango pulp", price: 150, image: "https://images.unsplash.com/photo-1604346702234-2c4b5d47df44?w=400", veg: true, spicy: 0, popular: true, available: true, preparationTime: 5, tags: ["refreshing", "seasonal"], rating: 4.6, reviews: 278 },
];

// ===== TABLES =====
export const tables = [
  { id: "tbl_01", number: "T1", capacity: 2, floor: "Ground", zone: "Window", status: "available", shape: "round", x: 80, y: 80, width: 80, height: 80 },
  { id: "tbl_02", number: "T2", capacity: 4, floor: "Ground", zone: "Window", status: "occupied", shape: "rect", x: 220, y: 80, width: 120, height: 80, orderId: "ord_001", waiter: "Ravi K", covers: 3, openedAt: "2026-06-18T12:30:00" },
  { id: "tbl_03", number: "T3", capacity: 4, floor: "Ground", zone: "Center", status: "occupied", shape: "rect", x: 400, y: 80, width: 120, height: 80, orderId: "ord_002", waiter: "Priya M", covers: 4, openedAt: "2026-06-18T12:45:00" },
  { id: "tbl_04", number: "T4", capacity: 6, floor: "Ground", zone: "Center", status: "reserved", shape: "rect", x: 80, y: 240, width: 160, height: 80, reservation: { name: "Sharma Family", time: "14:00", phone: "+91 98765 12345", covers: 6 } },
  { id: "tbl_05", number: "T5", capacity: 2, floor: "Ground", zone: "Bar", status: "cleaning", shape: "round", x: 320, y: 240, width: 80, height: 80 },
  { id: "tbl_06", number: "T6", capacity: 4, floor: "Ground", zone: "Bar", status: "available", shape: "rect", x: 460, y: 240, width: 120, height: 80 },
  { id: "tbl_07", number: "T7", capacity: 8, floor: "Ground", zone: "Private", status: "occupied", shape: "rect", x: 80, y: 400, width: 200, height: 100, orderId: "ord_003", waiter: "Arjun S", covers: 7, openedAt: "2026-06-18T11:30:00" },
  { id: "tbl_08", number: "T8", capacity: 4, floor: "First", zone: "Terrace", status: "available", shape: "rect", x: 80, y: 80, width: 120, height: 80 },
  { id: "tbl_09", number: "T9", capacity: 4, floor: "First", zone: "Terrace", status: "occupied", shape: "rect", x: 260, y: 80, width: 120, height: 80, orderId: "ord_004", waiter: "Meena R", covers: 2, openedAt: "2026-06-18T13:00:00" },
  { id: "tbl_10", number: "T10", capacity: 10, floor: "First", zone: "Hall", status: "available", shape: "rect", x: 80, y: 240, width: 260, height: 100 },
];

// ===== ORDERS =====
export const orders = [
  {
    id: "ord_001", orderNo: "ORD-2401", tableId: "tbl_02", tableName: "T2", type: "dine-in",
    status: "serving", waiter: "Ravi K", captain: "Vikram J",
    items: [
      { id: "item_01", name: "Paneer Tikka", qty: 1, price: 320, status: "served", addons: [] },
      { id: "item_04", name: "Butter Chicken", qty: 2, price: 450, status: "served", addons: [] },
      { id: "item_08", name: "Garlic Naan", qty: 4, price: 80, status: "preparing", addons: [] },
    ],
    subtotal: 1540, tax: 277.2, discount: 0, total: 1817.2, covers: 3,
    createdAt: "2026-06-18T12:30:00", updatedAt: "2026-06-18T12:48:00",
    paymentStatus: "unpaid", notes: "No onion in main course",
  },
  {
    id: "ord_002", orderNo: "ORD-2402", tableId: "tbl_03", tableName: "T3", type: "dine-in",
    status: "preparing", waiter: "Priya M", captain: "Vikram J",
    items: [
      { id: "item_06", name: "Chicken Biryani", qty: 2, price: 520, status: "preparing", addons: [] },
      { id: "item_05", name: "Palak Paneer", qty: 1, price: 380, status: "pending", addons: [] },
      { id: "item_10", name: "Mango Lassi", qty: 4, price: 150, status: "served", addons: [] },
    ],
    subtotal: 2000, tax: 360, discount: 100, total: 2260, covers: 4,
    createdAt: "2026-06-18T12:45:00", updatedAt: "2026-06-18T13:02:00",
    paymentStatus: "unpaid", notes: "",
  },
  {
    id: "ord_005", orderNo: "ORD-2405", tableId: null, tableName: null, type: "delivery",
    status: "dispatched", deliveryAgent: "Karan M", deliveryAddress: "12, 4th Cross, Koramangala",
    items: [
      { id: "item_06", name: "Chicken Biryani", qty: 1, price: 520, status: "packed", addons: [] },
      { id: "item_09", name: "Gulab Jamun", qty: 1, price: 160, status: "packed", addons: [] },
    ],
    subtotal: 680, tax: 122.4, discount: 50, total: 752.4, covers: 1,
    createdAt: "2026-06-18T12:55:00", updatedAt: "2026-06-18T13:15:00",
    paymentStatus: "paid", paymentMethod: "online", notes: "",
  },
];

// ===== STAFF =====
export const staff = [
  { id: "emp_01", name: "Vikram Joshi", role: "manager", phone: "+91 98765 11111", email: "vikram@spicegarden.in", avatar: "VJ", department: "Operations", shift: "Morning", salary: 45000, joinDate: "2023-01-15", status: "active", attendance: 96 },
  { id: "emp_02", name: "Ravi Kumar", role: "waiter", phone: "+91 98765 22222", email: "ravi@spicegarden.in", avatar: "RK", department: "Service", shift: "Morning", salary: 18000, joinDate: "2023-06-01", status: "active", attendance: 92 },
  { id: "emp_03", name: "Priya Menon", role: "waiter", phone: "+91 98765 33333", email: "priya@spicegarden.in", avatar: "PM", department: "Service", shift: "Evening", salary: 18000, joinDate: "2024-02-10", status: "active", attendance: 98 },
  { id: "emp_04", name: "Chef Rajesh Nair", role: "chef", phone: "+91 98765 44444", email: "rajesh@spicegarden.in", avatar: "RN", department: "Kitchen", shift: "Morning", salary: 55000, joinDate: "2022-08-20", status: "active", attendance: 99 },
  { id: "emp_05", name: "Arjun Singh", role: "captain", phone: "+91 98765 55555", email: "arjun@spicegarden.in", avatar: "AS", department: "Service", shift: "Evening", salary: 28000, joinDate: "2023-11-05", status: "active", attendance: 95 },
  { id: "emp_06", name: "Meena Reddy", role: "waiter", phone: "+91 98765 66666", email: "meena@spicegarden.in", avatar: "MR", department: "Service", shift: "Evening", salary: 18000, joinDate: "2024-08-01", status: "active", attendance: 88 },
  { id: "emp_07", name: "Anita Sharma", role: "cashier", phone: "+91 98765 77777", email: "anita@spicegarden.in", avatar: "AS", department: "Accounts", shift: "Morning", salary: 22000, joinDate: "2023-03-20", status: "active", attendance: 97 },
  { id: "emp_08", name: "Karan Mehta", role: "delivery", phone: "+91 98765 88888", email: "karan@spicegarden.in", avatar: "KM", department: "Delivery", shift: "Evening", salary: 16000, joinDate: "2024-05-15", status: "active", attendance: 91 },
];

// ===== INVENTORY =====
export const inventory = [
  { id: "inv_01", name: "Tomatoes", category: "Vegetables", unit: "kg", currentStock: 12.5, minStock: 5, maxStock: 50, unitCost: 40, supplier: "Fresh Farms", lastRestocked: "2026-06-16", expiryDate: "2026-06-22", status: "adequate" },
  { id: "inv_02", name: "Chicken (Boneless)", category: "Meat", unit: "kg", currentStock: 8.2, minStock: 10, maxStock: 40, unitCost: 380, supplier: "Meatz Co", lastRestocked: "2026-06-17", expiryDate: "2026-06-19", status: "low" },
  { id: "inv_03", name: "Paneer", category: "Dairy", unit: "kg", currentStock: 4.5, minStock: 3, maxStock: 20, unitCost: 280, supplier: "Milky Way Dairy", lastRestocked: "2026-06-17", expiryDate: "2026-06-20", status: "adequate" },
  { id: "inv_04", name: "Basmati Rice", category: "Grains", unit: "kg", currentStock: 45, minStock: 20, maxStock: 100, unitCost: 85, supplier: "Royal Grains", lastRestocked: "2026-06-10", expiryDate: null, status: "adequate" },
  { id: "inv_05", name: "Cooking Oil", category: "Oil", unit: "ltr", currentStock: 3.8, minStock: 5, maxStock: 30, unitCost: 140, supplier: "Fortune Foods", lastRestocked: "2026-06-14", expiryDate: null, status: "critical" },
  { id: "inv_06", name: "Spinach", category: "Vegetables", unit: "kg", currentStock: 2.1, minStock: 2, maxStock: 15, unitCost: 35, supplier: "Fresh Farms", lastRestocked: "2026-06-16", expiryDate: "2026-06-19", status: "low" },
  { id: "inv_07", name: "Wheat Flour (Maida)", category: "Grains", unit: "kg", currentStock: 28, minStock: 10, maxStock: 60, unitCost: 45, supplier: "Royal Grains", lastRestocked: "2026-06-12", expiryDate: null, status: "adequate" },
  { id: "inv_08", name: "Butter", category: "Dairy", unit: "kg", currentStock: 0, minStock: 2, maxStock: 10, unitCost: 450, supplier: "Milky Way Dairy", lastRestocked: "2026-06-14", expiryDate: null, status: "out_of_stock" },
];

// ===== KPI DATA =====
export const dashboardKPIs = {
  todayRevenue: 124680,
  yesterdayRevenue: 98340,
  weekRevenue: 712450,
  monthRevenue: 2845600,
  todayOrders: 87,
  activeOrders: 12,
  avgOrderValue: 1432,
  tableOccupancy: 65,
  customerCount: 213,
  pendingPayments: 3,
  kitchenLoad: 72,
  staffPresent: 18,
  totalStaff: 22,
  lowStockItems: 3,
};

// ===== SALES CHART DATA =====
export const salesChartData = [
  { time: "9 AM", revenue: 4200, orders: 8 },
  { time: "10 AM", revenue: 7800, orders: 14 },
  { time: "11 AM", revenue: 6400, orders: 12 },
  { time: "12 PM", revenue: 18600, orders: 28 },
  { time: "1 PM", revenue: 22400, orders: 35 },
  { time: "2 PM", revenue: 15200, orders: 22 },
  { time: "3 PM", revenue: 8900, orders: 11 },
  { time: "4 PM", revenue: 6200, orders: 9 },
  { time: "5 PM", revenue: 9800, orders: 14 },
  { time: "6 PM", revenue: 14600, orders: 20 },
  { time: "7 PM", revenue: 24800, orders: 38 },
  { time: "8 PM", revenue: 28400, orders: 42 },
  { time: "9 PM", revenue: 21600, orders: 31 },
];

export const weeklyData = [
  { day: "Mon", revenue: 82400, orders: 68 },
  { day: "Tue", revenue: 91200, orders: 74 },
  { day: "Wed", revenue: 78600, orders: 62 },
  { day: "Thu", revenue: 124680, orders: 87 },
  { day: "Fri", revenue: 0, orders: 0 },
  { day: "Sat", revenue: 0, orders: 0 },
  { day: "Sun", revenue: 0, orders: 0 },
];

export const topProducts = [
  { name: "Chicken Biryani", sales: 156, revenue: 81120, category: "Biryani" },
  { name: "Butter Chicken", sales: 134, revenue: 60300, category: "Main Course" },
  { name: "Paneer Tikka", sales: 118, revenue: 37760, category: "Starters" },
  { name: "Garlic Naan", sales: 298, revenue: 23840, category: "Breads" },
  { name: "Mango Lassi", sales: 187, revenue: 28050, category: "Beverages" },
];

// ===== CUSTOMERS =====
export const customers = [
  { id: "cust_01", name: "Rahul Sharma", phone: "+91 99887 12345", email: "rahul@email.com", visits: 24, totalSpent: 34680, lastVisit: "2026-06-17", loyaltyPoints: 346, tier: "Gold", city: "Bengaluru" },
  { id: "cust_02", name: "Priya Patel", phone: "+91 99887 23456", email: "priya@email.com", visits: 18, totalSpent: 28920, lastVisit: "2026-06-15", loyaltyPoints: 289, tier: "Silver", city: "Bengaluru" },
  { id: "cust_03", name: "Arun Kumar", phone: "+91 99887 34567", email: "arun@email.com", visits: 42, totalSpent: 68400, lastVisit: "2026-06-18", loyaltyPoints: 684, tier: "Platinum", city: "Bengaluru" },
  { id: "cust_04", name: "Sneha Reddy", phone: "+91 99887 45678", email: "sneha@email.com", visits: 7, totalSpent: 9840, lastVisit: "2026-06-10", loyaltyPoints: 98, tier: "Bronze", city: "Bengaluru" },
  { id: "cust_05", name: "Karthik Nair", phone: "+91 99887 56789", email: "karthik@email.com", visits: 31, totalSpent: 52400, lastVisit: "2026-06-16", loyaltyPoints: 524, tier: "Gold", city: "Bengaluru" },
];

// ===== NOTIFICATIONS =====
export const notifications = [
  { id: "notif_01", type: "order", title: "New Order Received", message: "Table T3 placed a new order (ORD-2402)", time: "2026-06-18T13:02:00", read: false, priority: "normal" },
  { id: "notif_02", type: "inventory", title: "Low Stock Alert", message: "Cooking Oil is below minimum stock level (3.8L remaining)", time: "2026-06-18T12:45:00", read: false, priority: "high" },
  { id: "notif_03", type: "inventory", title: "Out of Stock", message: "Butter is completely out of stock", time: "2026-06-18T11:30:00", read: false, priority: "critical" },
  { id: "notif_04", type: "staff", title: "Staff Check-in", message: "Meena Reddy checked in at 5:45 PM", time: "2026-06-18T17:45:00", read: true, priority: "low" },
  { id: "notif_05", type: "payment", title: "Payment Received", message: "Table T7 payment of ₹4,280 received via UPI", time: "2026-06-18T12:20:00", read: true, priority: "normal" },
  { id: "notif_06", type: "reservation", title: "New Reservation", message: "Sharma Family reserved T4 for 6 pax at 2:00 PM", time: "2026-06-18T10:00:00", read: true, priority: "normal" },
];
