"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { providers } from "@/content/providers";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useAudience } from "@/context/audience-context";
import { cn } from "@/lib/utils";

const HUB = { x: 500, y: 190 };
const APP = { x: 500, y: 44 };
const ROW_Y = [380, 480];

const COPY = {
  startup: {
    title: "One integration. Every provider.",
    description:
      "Inferect sits as a single gateway between your application and the model layer, routing each request live based on cost, latency, and quality signals.",
  },
  investor: {
    title: "The chokepoint every AI request will pass through.",
    description:
      "One integration point, ten-plus providers behind it, and the routing intelligence to keep switching costs high as usage compounds.",
  },
} as const;

export function Architecture() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const { audience } = useAudience();
  const copy = COPY[audience];

  const nodes = useMemo(
    () =>
      providers.map((p, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 120 + col * 190;
        const y = ROW_Y[row] ?? ROW_Y[0]!;
        return { ...p, x, y };
      }),
    []
  );

  return (
    <section id="architecture" className="scroll-mt-24 border-t border-border py-24 md:py-32">
      <div className="container-content">
        <SectionHeading
          align="center"
          eyebrow="Architecture"
          title={copy.title}
          description={copy.description}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="relative mt-12 overflow-hidden sm:mt-16"
        >
          <svg
            viewBox="0 0 1080 540"
            className="mx-auto h-auto w-full max-w-[1080px]"
            role="img"
            aria-label="Diagram: application connects to Inferect, which routes to ten model providers"
          >
            <path
              d={`M ${APP.x} ${APP.y + 24} L ${HUB.x} ${HUB.y - 34}`}
              stroke="var(--border-strong)"
              strokeWidth="2"
              fill="none"
            />
            {!reducedMotion && (
              <circle r="4" fill="var(--trace-blue)">
                <animateMotion
                  dur="1.6s"
                  repeatCount="indefinite"
                  path={`M ${APP.x} ${APP.y + 24} L ${HUB.x} ${HUB.y - 34}`}
                />
              </circle>
            )}

            {nodes.map((node) => {
              const isActive = hovered === node.id;
              const isDimmed = hovered !== null && !isActive;
              const path = `M ${HUB.x} ${HUB.y + 34} C ${HUB.x} ${(HUB.y + node.y) / 2}, ${node.x} ${(HUB.y + node.y) / 2}, ${node.x} ${node.y - 26}`;
              return (
                <g key={node.id}>
                  <path
                    d={path}
                    fill="none"
                    stroke={isActive ? node.color : "var(--border-strong)"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    opacity={isDimmed ? 0.25 : 1}
                    style={{ transition: "opacity 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease" }}
                  />
                  {!reducedMotion && (
                    <circle r={isActive ? 4.5 : 3} fill={node.color} opacity={isDimmed ? 0.2 : 0.9}>
                      <animateMotion
                        dur={isActive ? "1s" : "2.6s"}
                        repeatCount="indefinite"
                        path={path}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Application node */}
            <g>
              <rect x={APP.x - 74} y={APP.y - 22} width="148" height="46" rx="10" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1.5" />
              <text x={APP.x} y={APP.y + 5} textAnchor="middle" fill="var(--text)" fontSize="15" fontFamily="var(--font-display)" fontWeight="500">
                Your app
              </text>
            </g>

            {/* Inferect hub */}
            <g>
              <circle cx={HUB.x} cy={HUB.y} r="46" fill="var(--surface)" stroke="var(--trace-blue)" strokeWidth="1.75" />
              <circle cx={HUB.x} cy={HUB.y} r="46" fill="var(--trace-blue)" opacity="0.08" />
              <text x={HUB.x} y={HUB.y - 2} textAnchor="middle" fill="var(--text)" fontSize="17" fontFamily="var(--font-display)" fontWeight="600">
                Inferect
              </text>
              <text x={HUB.x} y={HUB.y + 17} textAnchor="middle" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
                ROUTER
              </text>
            </g>

            {/* Provider nodes */}
            {nodes.map((node) => {
              const isActive = hovered === node.id;
              const isDimmed = hovered !== null && !isActive;
              return (
                <g
                  key={`node-${node.id}`}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                  style={{ transition: "opacity 0.3s ease" }}
                  opacity={isDimmed ? 0.4 : 1}
                >
                  <rect
                    x={node.x - 68}
                    y={node.y - 22}
                    width="136"
                    height="44"
                    rx="9"
                    fill="var(--bg-elevated)"
                    stroke={isActive ? node.color : "var(--border)"}
                    strokeWidth={isActive ? 2 : 1.25}
                    style={{ transition: "stroke 0.3s ease" }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill={isActive ? "var(--text)" : "var(--text-muted)"}
                    fontSize="13.5"
                    fontFamily="var(--font-body)"
                    fontWeight="500"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        <p className="mt-6 text-center font-mono text-xs text-text-faint">
          Hover a provider to trace its live routing path
        </p>
      </div>
    </section>
  );
}
