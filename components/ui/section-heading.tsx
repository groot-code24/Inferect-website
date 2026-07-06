"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-trace-blue">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance font-display text-display-lg font-medium text-text">{title}</h2>
      {description ? (
        <p className="text-balance text-base leading-relaxed text-text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
