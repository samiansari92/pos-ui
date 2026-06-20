import { cn } from "@/lib/utils";

/**
 * Consistent page wrapper used across all content pages.
 * Matches the dashboard's full-width layout (max-w-screen-2xl).
 */
export function PageContainer({ children, className }) {
  return (
    <div className={cn("w-full max-w-screen-2xl mx-auto p-6 space-y-6", className)}>
      {children}
    </div>
  );
}

/**
 * Page header — title, subtitle, and optional right-side actions.
 */
export function PageHeader({ title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight truncate">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 shrink-0">{children}</div>
      )}
    </div>
  );
}
