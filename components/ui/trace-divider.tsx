"use client";

import { cn } from "@/lib/utils";

interface TraceDividerProps {
  className?: string;
  /** Number of traveling pulse dots along the line. */
  pulses?: number;
}

/**
 * Signature motif: a horizontal "request trace" line that runs between
 * sections, echoing the inference-routing visualization from the hero.
 * Purely decorative — hidden from assistive tech.
 */
export function TraceDivider({ className, pulses = 3 }: TraceDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-px w-full overflow-hidden bg-border", className)}
    >
      {Array.from({ length: pulses }).map((_, i) => (
        <span
          key={i}
          className="absolute top-1/2 h-1 w-16 -translate-y-1/2 bg-gradient-to-r from-transparent via-trace-blue to-transparent opacity-70"
          style={{
            animation: `trace-travel 5s linear infinite`,
            animationDelay: `${i * (5 / pulses)}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes trace-travel {
          0% {
            left: -10%;
          }
          100% {
            left: 110%;
          }
        }
      `}</style>
    </div>
  );
}
