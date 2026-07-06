"use client";

import { motion } from "framer-motion";
import { researchNotes } from "@/content/blog";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { useAudience } from "@/context/audience-context";

const COPY = {
  startup: {
    title: "Built by engineers who publish their work.",
    description:
      "Inferect's routing and optimization models are developed the way infrastructure should be — benchmarked, documented, and open to scrutiny.",
  },
  investor: {
    title: "Technical depth as a moat, not a marketing line.",
    description:
      "The team ships benchmarks and routing research in the open — the same rigor that compounds into the model quality competitors will spend years catching up to.",
  },
} as const;

export function Research() {
  const { audience } = useAudience();
  const copy = COPY[audience];

  return (
    <section id="research" className="scroll-mt-24 border-t border-border py-24 md:py-32">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Research"
            title={copy.title}
            description={copy.description}
            className="max-w-xl"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer(0.08)}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {researchNotes.map((note) => (
            <motion.article
              key={note.id}
              variants={fadeUp}
              className="flex flex-col justify-between gap-8 rounded-md border border-border bg-surface/40 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-trace-blue">
                  {note.tag}
                </span>
              </div>
              <div>
                <h3 className="font-display text-base font-medium leading-snug text-text">
                  {note.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{note.summary}</p>
              </div>
              <span className="font-mono text-xs text-text-faint">{note.date}</span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
