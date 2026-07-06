"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/** Animated area sparkline — draws in on scroll, no axes (ambient, not analytical). */
export function Sparkline({
  data,
  color = "var(--trace-blue)",
  height = 64,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const gradientId = useId();
  const width = 240;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 8) - 4;
    return [x, y] as const;
  });

  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/** Animated donut chart for provider/traffic distribution. */
export function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offsetAccumulator = 0;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0 -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--surface-2)" strokeWidth="12" />
        {segments.map((segment) => {
          const fraction = segment.value / total;
          const dash = fraction * circumference;
          const dashArray = `${dash} ${circumference - dash}`;
          const dashOffset = -offsetAccumulator * circumference;
          offsetAccumulator += fraction;
          return (
            <motion.circle
              key={segment.label}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="12"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          );
        })}
      </svg>
      <ul className="flex flex-col gap-2">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-xs text-text-muted">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
            {segment.label}
            <span className="font-mono text-text-faint">
              {Math.round((segment.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Radial gauge for a single 0–100 score. */
export function RadialGauge({ value, label, color = "var(--trace-blue)" }: { value: number; label: string; color?: string }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--surface-2)" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - dash }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-xl font-medium text-text">{value}</span>
        <span className="text-[10px] text-text-faint">{label}</span>
      </div>
    </div>
  );
}

/** Minimal grouped bar chart for token usage or throughput comparisons. */
export function BarChart({ data, color = "var(--trace-purple)" }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex h-24 items-end gap-2.5">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <motion.div
            className="w-full rounded-t-xs"
            style={{ backgroundColor: color }}
            initial={{ height: 0 }}
            whileInView={{ height: `${(d.value / max) * 80}px` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="font-mono text-[10px] text-text-faint">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
