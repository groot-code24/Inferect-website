"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

/**
 * Wraps next-themes to drive the site's two themes: "dark" (default) and
 * "light" (research-paper "lab" aesthetic). Persists to localStorage and
 * respects the OS-level color scheme on first visit.
 *
 * Important: the `themes` list must use the standard "dark" / "light"
 * names so next-themes' system-preference detection (which always
 * resolves to "light" or "dark") lines up with our own theme keys. The
 * previous setup used a custom "lab" theme name with a mismatched `value`
 * map, which caused the toggle to fall out of sync with the resolved
 * theme (and sometimes get stuck) whenever system detection kicked in.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      themes={["dark", "light"]}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
