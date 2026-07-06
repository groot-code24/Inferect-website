"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useAudience } from "@/context/audience-context";
import { useWaitlistModal } from "@/components/ui/waitlist-modal";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { HeroArchitecture } from "@/components/sections/hero-architecture";

const COPY = {
  startup: {
    badge: "Now routing across 18 providers",
    title: (
      <>
        The intelligence layer <span className="text-trace-gradient">for AI inference.</span>
      </>
    ),
    description:
      "Inferect sits between your application and every model provider — routing, optimizing, and analyzing each request in real time to cut inference cost and latency without touching your prompts.",
    stats: ["99.98% routing uptime", "Avg. 34% cost reduction", "SOC 2 Type II"],
  },
  investor: {
    badge: "Pre-seed · raising now",
    title: (
      <>
        The routing layer <span className="text-trace-gradient">every AI app will run through.</span>
      </>
    ),
    description:
      "Every team shipping AI needs one thing infrastructure has never given them: a single, model-agnostic gateway. Inferect is building the default routing layer for the inference economy.",
    primaryLabel: "Request the deck",
    primaryHref: "#cta",
    stats: ["18 providers integrated", "Avg. 34% cost reduction for users", "Category-defining moat"],
  },
} as const;

export function Hero() {
  const [containerRef, mouse] = useMousePosition<HTMLDivElement>();
  const { audience } = useAudience();
  const { openWaitlist } = useWaitlistModal();
  const copy = COPY[audience];

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 md:pt-36"
    >
      <div className="bg-lab-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--trace-blue) 12%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-content relative z-10 flex min-w-0 flex-col items-center gap-12 sm:gap-14 md:gap-16">
        <motion.div
          key={audience}
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
          className="flex min-w-0 max-w-3xl flex-col items-center gap-6 text-center sm:gap-7"
        >
          <motion.div variants={fadeUp}>
            <Badge>
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal-positive" />
              {copy.badge}
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance font-display text-display-2xl font-medium text-text"
          >
            {copy.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-balance text-base leading-relaxed text-text-muted md:text-lg"
          >
            {copy.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex w-full flex-col items-stretch justify-center gap-3 xs:flex-row xs:items-center">
            {audience === "investor" ? (
              <Button size="lg" className="rounded-full" asChild>
                <Link href={COPY.investor.primaryHref}>
                  <TrendingUp className="h-4 w-4" />
                  {COPY.investor.primaryLabel}
                </Link>
              </Button>
            ) : null}
            <Button
              size="lg"
              variant={audience === "investor" ? "secondary" : "primary"}
              className="rounded-full"
              onClick={() => openWaitlist()}
            >
              <Rocket className="h-4 w-4" />
              Join Waitlist
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center justify-center gap-2 pt-2 font-mono text-xs text-text-faint sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3"
          >
            {copy.stats.map((stat, i) => (
              <span key={stat} className="flex items-center gap-8 text-center">
                {stat}
                {i < copy.stats.length - 1 ? (
                  <span className="hidden h-1 w-1 rounded-full bg-text-faint md:block" aria-hidden="true" />
                ) : null}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-w-0 w-full"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 50%, color-mix(in srgb, var(--trace-blue) 8%, transparent), transparent 75%)",
            }}
            aria-hidden="true"
          />
          <div className="overflow-hidden rounded-xl border border-border bg-bg-elevated/40 p-2 shadow-panel sm:p-8">
            <HeroArchitecture mouse={mouse} />
          </div>
          <p className="mt-6 text-center font-mono text-xs text-text-faint">
            Live routing across 18 providers — hover a node to trace the path
          </p>
        </motion.div>
      </div>
    </section>
  );
}
