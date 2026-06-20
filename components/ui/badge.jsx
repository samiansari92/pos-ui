import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        success: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        warning: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        error: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        purple: "border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        orange: "border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        // Status specific
        available: "border-transparent bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        occupied: "border-transparent bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        reserved: "border-transparent bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        cleaning: "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        // Order status
        pending: "border-transparent bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        preparing: "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        ready: "border-transparent bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        served: "border-transparent bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
        cancelled: "border-transparent bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
