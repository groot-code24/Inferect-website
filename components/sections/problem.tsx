"use client";

import { motion } from "framer-motion";
import { painPoints } from "@/content/pain-points";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { useAudience } from "@/context/audience-context";

const COPY = {
  startup: {
    title: "Inference infrastructure wasn't built for how fast AI moves.",
    description:
      "Every team running models in production hits the same wall — cost that scales faster than revenue, latency that varies by provider, and no single view of what's actually happening to a request.",
  },
  investor: {
    title: "The inference layer is the fastest-growing, least-owned line item in software.",
    description:
      "Every company shipping AI is quietly absorbing the same infrastructure tax — fragmented providers, opaque cost, and no defensible routing layer. That gap is the market.",
  },
} as const;

export function Problem() {
  const { audience } = useAudience();
  const copy = COPY[audience];

  return (
    <section id="problem" className="container-content scroll-mt-24 py-24 md:py-32">
      <SectionHeading eyebrow="The problem" title={copy.title} description={copy.description} />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.06)}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {painPoints.map((point) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={point.id}
              variants={fadeUp}
              className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-border bg-surface/50 p-6 transition-colors duration-300 hover:border-border-strong"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ background: "var(--trace-blue)" }}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-trace-blue" strokeWidth={1.75} />
                <span className="font-mono text-2xl font-medium text-signal-negative">
                  {point.metric}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="font-display text-base font-medium text-text">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{point.description}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-text-faint">
                  {point.metricLabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
