"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FlaskConical, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — theme is only known client-side.
  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "lab"} mode`}
      aria-pressed={isLight}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={cn(
        "relative flex h-9 w-[68px] shrink-0 items-center rounded-full border border-border-strong bg-surface px-1 transition-colors duration-300",
        className
      )}
    >
      <motion.span
        layout
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-elevated shadow-sm"
        style={{ marginLeft: isLight ? 30 : 0 }}
      >
        {isLight ? (
          <FlaskConical className="h-3.5 w-3.5 text-trace-blue" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-trace-purple" />
        )}
      </motion.span>
      <span className="sr-only">Toggle between dark mode and lab mode</span>
    </button>
  );
}
