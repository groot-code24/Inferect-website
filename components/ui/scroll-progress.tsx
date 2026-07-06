"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A slim trace-colored progress bar tracking scroll position, pinned above
 * the navbar. Reinforces the site's "routing/trace" visual motif instead of
 * being a generic loading bar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-trace-blue via-trace-purple to-trace-cyan"
      aria-hidden="true"
    />
  );
}
