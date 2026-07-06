"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Rocket, X } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { useScrolled, useActiveSection } from "@/hooks/use-scroll-progress";
import { useWaitlistModal } from "@/components/ui/waitlist-modal";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InferectMark } from "@/components/ui/inferect-mark";

const sectionIds = navLinks
  .map((link) => link.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

export function Navbar() {
  const scrolled = useScrolled(16);
  const activeSection = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openWaitlist } = useWaitlistModal();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "glass mx-auto flex max-w-content items-center justify-between rounded-full px-3 shadow-panel transition-all duration-500 ease-signal sm:px-4",
          scrolled ? "h-14 max-w-[1180px]" : "h-16"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full pl-2 pr-3 transition-colors duration-200 hover:bg-surface"
          aria-label="Inferect home"
        >
          <InferectMark className="h-7 w-7 shrink-0" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-text">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-border/70 bg-bg/40 p-1 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const id = link.href.split("#")[1];
            const isActive = activeSection === id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm text-text-muted transition-colors duration-200 hover:text-text",
                  isActive && "text-text"
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2 shadow-sm"
                  />
                ) : null}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 pr-1 lg:flex">
          <ThemeToggle />
          <Button size="sm" className="rounded-full shadow-glow" onClick={() => openWaitlist()}>
            <Rocket className="h-3.5 w-3.5" />
            Join Waitlist
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors duration-200 hover:bg-surface lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 flex max-w-content flex-col gap-1 rounded-3xl p-4 shadow-panel lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-full px-4 py-2.5 text-sm text-text-muted hover:bg-surface hover:text-text"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-faint">
                Appearance
              </span>
              <ThemeToggle />
            </div>

            <div className="mt-3">
              <Button
                size="lg"
                className="w-full rounded-full shadow-glow"
                onClick={() => {
                  setMobileOpen(false);
                  openWaitlist();
                }}
              >
                <Rocket className="h-3.5 w-3.5" />
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
