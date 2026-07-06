import { cn } from "@/lib/utils";

/**
 * The Inferect mark: three converging traces meeting at a single routed
 * node — the same motif used for the hero's routing visualization,
 * reduced to its simplest form.
 */
export function InferectMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-text", className)}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M70 180L220 256M70 256H220M70 332L220 256" />
        <path d="M292 256H442" />
      </g>
      <g fill="currentColor">
        <circle cx="70" cy="180" r="6" />
        <circle cx="70" cy="256" r="6" />
        <circle cx="70" cy="332" r="6" />
        <circle cx="220" cy="256" r="6" />
        <circle cx="442" cy="256" r="6" />
      </g>
      <g stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <path d="M256 90C220 90 220 140 256 165V347C220 372 220 422 256 422" />
        <path d="M256 90C292 90 292 140 256 165V347C292 372 292 422 256 422" />
      </g>
    </svg>
  );
}
