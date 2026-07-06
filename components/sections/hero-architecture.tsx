"use client";

import { useMemo, useState } from "react";
import { providers } from "@/content/providers";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface HeroArchitectureProps {
  mouse: { x: number; y: number };
}

const HUB = { x: 540, y: 150 };
const APP = { x: 540, y: 34 };
const ROW_Y = [320, 410];

/**
 * The hero's centerpiece visual — a larger, always-live rendition of the
 * Architecture section's hub-and-spoke diagram, brought up so the site's
 * most compelling proof point (one gateway, every provider) is the first
 * thing people see.
 */
export function HeroArchitecture({ mouse }: HeroArchitectureProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const nodes = useMemo(
    () =>
      providers.map((p, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 96 + col * 212;
        const y = ROW_Y[row] ?? ROW_Y[0]!;
        return { ...p, x, y };
      }),
    []
  );

  return (
    <div
      className="relative mx-auto w-full max-w-[1120px]"
      style={{
        transform: `translate3d(${mouse.x * -4}px, ${mouse.y * -4}px, 0)`,
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <svg
        viewBox="0 0 1080 460"
        className="mx-auto h-auto w-full"
        role="img"
        aria-label="Diagram: your application connects to Inferect, which routes live across ten model providers"
      >
        <path
          d={`M ${APP.x} ${APP.y + 24} L ${HUB.x} ${HUB.y - 42}`}
          stroke="var(--border-strong)"
          strokeWidth="2"
          fill="none"
        />
        {!reducedMotion && (
          <circle r="4.5" fill="var(--trace-blue)">
            <animateMotion
              dur="1.6s"
              repeatCount="indefinite"
              path={`M ${APP.x} ${APP.y + 24} L ${HUB.x} ${HUB.y - 42}`}
            />
          </circle>
        )}

        {nodes.map((node) => {
          const isActive = hovered === node.id;
          const isDimmed = hovered !== null && !isActive;
          const path = `M ${HUB.x} ${HUB.y + 42} C ${HUB.x} ${(HUB.y + node.y) / 2}, ${node.x} ${(HUB.y + node.y) / 2}, ${node.x} ${node.y - 28}`;
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
                    dur={isActive ? "1s" : `${2.4 + (node.x % 5) * 0.2}s`}
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
          <rect
            x={APP.x - 76}
            y={APP.y - 22}
            width="152"
            height="46"
            rx="12"
            fill="var(--bg-elevated)"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
          />
          <text
            x={APP.x}
            y={APP.y + 5}
            textAnchor="middle"
            fill="var(--text)"
            fontSize="15"
            fontFamily="var(--font-display)"
            fontWeight="500"
          >
            Your app
          </text>
        </g>

        {/* Inferect hub */}
        <g>
          <circle cx={HUB.x} cy={HUB.y} r="52" fill="var(--surface)" stroke="var(--trace-blue)" strokeWidth="1.75" />
          <circle cx={HUB.x} cy={HUB.y} r="52" fill="var(--trace-blue)" opacity="0.1" />
          {!reducedMotion && (
            <circle cx={HUB.x} cy={HUB.y} r="52" fill="none" stroke="var(--trace-blue)" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="52;70;52" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={HUB.x} y={HUB.y - 3} textAnchor="middle" fill="var(--text)" fontSize="18" fontFamily="var(--font-display)" fontWeight="600">
            Inferect
          </text>
          <text
            x={HUB.x}
            y={HUB.y + 16}
            textAnchor="middle"
            fill="var(--text-faint)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            letterSpacing="1.5"
          >
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
                rx="10"
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
                fontSize="13"
                fontFamily="var(--font-body)"
                fontWeight="500"
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
