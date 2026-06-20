import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num) {
  return new Intl.NumberFormat("en-IN").format(num);
}

export function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(new Date(date));
}

export function formatTime(date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateOrderId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}`;
}

export function calculateTax(amount, rate = 18) {
  return (amount * rate) / 100;
}

export function calculateDiscount(amount, discount, type = "percentage") {
  if (type === "percentage") return (amount * discount) / 100;
  return discount;
}

export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return formatDate(date);
}

export function getStatusColor(status) {
  const colors = {
    active: "green",
    inactive: "gray",
    pending: "yellow",
    processing: "blue",
    completed: "green",
    cancelled: "red",
    occupied: "orange",
    available: "green",
    reserved: "purple",
    cleaning: "blue",
    low: "yellow",
    critical: "red",
    out_of_stock: "red",
  };
  return colors[status?.toLowerCase()] || "gray";
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

export function sortBy(array, key, direction = "asc") {
  return [...array].sort((a, b) => {
    if (direction === "asc") return a[key] > b[key] ? 1 : -1;
    return a[key] < b[key] ? 1 : -1;
  });
}

export const ROLES = {
  OWNER: "owner",
  MANAGER: "manager",
  CASHIER: "cashier",
  CAPTAIN: "captain",
  WAITER: "waiter",
  CHEF: "chef",
  KITCHEN_MANAGER: "kitchen_manager",
  STORE_MANAGER: "store_manager",
  ACCOUNTANT: "accountant",
  DELIVERY: "delivery",
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: [ROLES.OWNER, ROLES.MANAGER, ROLES.CASHIER, ROLES.CHEF, ROLES.KITCHEN_MANAGER, ROLES.STORE_MANAGER, ROLES.ACCOUNTANT],
  MANAGE_MENU: [ROLES.OWNER, ROLES.MANAGER],
  MANAGE_ORDERS: [ROLES.OWNER, ROLES.MANAGER, ROLES.CASHIER, ROLES.CAPTAIN, ROLES.WAITER],
  MANAGE_TABLES: [ROLES.OWNER, ROLES.MANAGER, ROLES.CAPTAIN, ROLES.WAITER],
  VIEW_KITCHEN: [ROLES.OWNER, ROLES.MANAGER, ROLES.CHEF, ROLES.KITCHEN_MANAGER],
  MANAGE_INVENTORY: [ROLES.OWNER, ROLES.MANAGER, ROLES.STORE_MANAGER],
  VIEW_REPORTS: [ROLES.OWNER, ROLES.MANAGER, ROLES.ACCOUNTANT],
  MANAGE_STAFF: [ROLES.OWNER, ROLES.MANAGER],
  MANAGE_SETTINGS: [ROLES.OWNER],
  PROCESS_PAYMENT: [ROLES.OWNER, ROLES.MANAGER, ROLES.CASHIER],
  APPLY_DISCOUNT: [ROLES.OWNER, ROLES.MANAGER, ROLES.CASHIER],
  MANAGE_CRM: [ROLES.OWNER, ROLES.MANAGER],
  MANAGE_PRODUCTION: [ROLES.OWNER, ROLES.MANAGER, ROLES.KITCHEN_MANAGER],
};
