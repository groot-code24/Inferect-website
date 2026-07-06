"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { useWaitlistModal } from "@/components/ui/waitlist-modal";
import { cn } from "@/lib/utils";

export function Cta() {
  const { openWaitlist } = useWaitlistModal();

  function join(role: "startup" | "investor") {
    openWaitlist(role);
  }

  return (
    <section id="cta" className="relative scroll-mt-24 overflow-hidden border-t border-border py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, color-mix(in srgb, var(--trace-purple) 14%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="bg-lab-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer(0.1)}
        className="container-content relative flex flex-col items-center gap-4 text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="max-w-2xl text-balance font-display text-display-lg font-medium text-text"
        >
          Ready to optimize your AI infrastructure?
        </motion.h2>
        <motion.p variants={fadeUp} className="max-w-lg text-balance text-text-muted">
          Whether you&apos;re shipping product or backing what&apos;s next, there&apos;s a seat at the table.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer(0.12)}
        className="container-content relative mt-14 grid gap-5 md:grid-cols-2"
      >
        {/* Startups */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-start gap-5 rounded-lg border border-border-strong bg-bg-elevated p-6 shadow-panel sm:p-8 md:p-10"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-trace-blue/10 text-trace-blue">
            <Rocket className="h-5 w-5" />
          </span>
          <div className="flex flex-col gap-2 text-left">
            <h3 className="font-display text-xl font-medium text-text">For startups &amp; teams</h3>
            <p className="text-balance text-sm leading-relaxed text-text-muted">
              Route your first request in minutes. No migration project, no rewritten prompts —
              get early access as we onboard new teams.
            </p>
          </div>
          <Button size="lg" className="mt-auto rounded-full" onClick={() => join("startup")}>
            Join Waitlist
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Investors */}
        <motion.div
          id="investors"
          variants={fadeUp}
          className={cn(
            "relative flex scroll-mt-28 flex-col items-start gap-5 overflow-hidden rounded-lg border border-border-strong p-6 shadow-glow-purple sm:p-8 md:p-10",
            "bg-bg-elevated"
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(80% 100% at 100% 0%, color-mix(in srgb, var(--trace-purple) 16%, transparent), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-sm bg-trace-purple/10 text-trace-purple">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div className="relative flex flex-col gap-2 text-left">
            <h3 className="font-display text-xl font-medium text-text">For investors</h3>
            <p className="text-balance text-sm leading-relaxed text-text-muted">
              We&apos;re building the routing layer every AI application will run through.
              Get in early on the infrastructure powering the next wave of intelligence.
            </p>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="relative mt-auto h-auto min-h-12 w-full rounded-2xl whitespace-normal px-4 py-3 text-center text-sm leading-snug xs:w-auto xs:rounded-full sm:text-base"
            onClick={() => join("investor")}
          >
            Join the Next Billion Dollar Frontier Lab
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
