import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
