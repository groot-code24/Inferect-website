"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { capabilities } from "@/content/capabilities";
import { SectionHeading } from "@/components/ui/section-heading";
import { CodeBlock } from "@/components/ui/code-block";
import { fadeUp } from "@/animations/variants";
import { useAudience } from "@/context/audience-context";
import { cn } from "@/lib/utils";

const COPY = {
  startup: {
    title: "One layer that routes, optimizes, and explains every request.",
    description:
      "Nine capabilities work together at the gateway level — so the model you call is always the right one, at the right price, with full visibility after the fact.",
  },
  investor: {
    title: "A defensible product surface, not a thin routing wrapper.",
    description:
      "Nine integrated capabilities — routing, optimization, and observability — compound into switching costs competitors can't replicate with a single API proxy.",
  },
} as const;

export function Solution() {
  const [activeId, setActiveId] = useState(capabilities[0]!.id);
  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0]!;
  const { audience } = useAudience();
  const copy = COPY[audience];

  return (
    <section id="solution" className="scroll-mt-24 border-t border-border py-24 md:py-32">
      <div className="container-content">
        <SectionHeading eyebrow="The solution" title={copy.title} description={copy.description} />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              const isActive = cap.id === activeId;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveId(cap.id)}
                  className={cn(
                    "group flex flex-col items-start gap-3 rounded-md border p-5 text-left transition-all duration-300 ease-signal",
                    isActive
                      ? "border-trace-blue/50 bg-surface shadow-glow"
                      : "border-border bg-surface/40 hover:border-border-strong"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors duration-300",
                      isActive ? "text-trace-blue" : "text-text-faint group-hover:text-text-muted"
                    )}
                    strokeWidth={1.75}
                  />
                  <div>
                    <h3 className="font-display text-sm font-medium text-text">{cap.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
                      {cap.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="min-w-0 flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start"
          >
            <CodeBlock code={active.code} language={active.language} />
            <div className="flex flex-col gap-4 rounded-md border border-border bg-surface/50 p-5 xs:flex-row xs:items-center xs:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-2xl font-medium text-text">{active.stat.value}</p>
                <p className="mt-1 text-xs text-text-muted">{active.stat.label}</p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-faint xs:text-right">
                {active.title}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
