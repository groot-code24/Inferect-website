import {
  Route,
  Gauge,
  BarChart3,
  Wand2,
  Database,
  Activity,
  LineChart,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import type { Capability } from "@/types";

export const capabilities: Capability[] = [
  {
    id: "routing",
    title: "Smart Routing",
    description:
      "Every request is scored in real time and sent to the model that clears your latency, cost, and quality bar — automatically.",
    icon: Route,
    stat: { value: "11ms", label: "routing decision time" },
    language: "ts",
    code: `const response = await inferect.route({
  prompt,
  policy: "cost-optimal",
  fallback: ["gpt-4o", "claude-sonnet-5"],
});`,
  },
  {
    id: "optimization",
    title: "Inference Optimization",
    description:
      "Batching, speculative decoding, and context trimming are applied per request, without changing a line of your prompt logic.",
    icon: Gauge,
    stat: { value: "2.4x", label: "faster time-to-first-token" },
    language: "ts",
    code: `inferect.configure({
  optimize: ["batching", "speculative-decode"],
  maxContextTokens: 8000,
});`,
  },
  {
    id: "benchmarking",
    title: "Provider Benchmarking",
    description:
      "Live, continuously refreshed benchmarks across every connected provider — quality, latency, and price, side by side.",
    icon: BarChart3,
    stat: { value: "18", label: "providers benchmarked live" },
    language: "bash",
    code: `curl https://api.inferect.ai/v1/benchmarks \\
  -H "Authorization: Bearer $INFERECT_KEY"`,
  },
  {
    id: "prompt",
    title: "Prompt Optimization",
    description:
      "Inferect rewrites and compresses prompts for the target model's tokenizer, preserving intent while cutting length.",
    icon: Wand2,
    stat: { value: "27%", label: "avg. token reduction" },
    language: "ts",
    code: `const optimized = await inferect.prompts.compress(
  prompt,
  { target: "claude-sonnet-5" }
);`,
  },
  {
    id: "caching",
    title: "Caching",
    description:
      "Semantic caching recognizes near-duplicate requests and serves them instantly, without a second call to any provider.",
    icon: Database,
    stat: { value: "63%", label: "cache hit rate, typical" },
    language: "ts",
    code: `inferect.configure({
  cache: { mode: "semantic", ttl: "1h" },
});`,
  },
  {
    id: "observability",
    title: "Observability",
    description:
      "Every request is traced end to end — model, latency, cost, and tokens — and exported to the tools your team already uses.",
    icon: Activity,
    stat: { value: "100%", label: "requests traced" },
    language: "ts",
    code: `inferect.on("request:complete", (trace) => {
  metrics.record(trace);
});`,
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Cost, quality, and usage trends broken down by model, team, and endpoint — no spreadsheet exports required.",
    icon: LineChart,
    stat: { value: "34", label: "metrics tracked per request" },
    language: "bash",
    code: `curl https://api.inferect.ai/v1/analytics/cost \\
  -d 'group_by=model'`,
  },
  {
    id: "recommendations",
    title: "Recommendations",
    description:
      "Inferect continuously suggests routing and prompt changes based on your live traffic — with the projected savings attached.",
    icon: Sparkles,
    stat: { value: "$4,200", label: "avg. monthly savings found" },
    language: "ts",
    code: `const suggestions = await inferect.recommendations.list();
// [{ action: "swap-model", savings: 1240, ... }]`,
  },
  {
    id: "security",
    title: "Security",
    description:
      "SOC 2 Type II controls, PII redaction, and per-key scoping keep every request compliant before it leaves your network.",
    icon: ShieldCheck,
    stat: { value: "SOC 2", label: "Type II certified" },
    language: "ts",
    code: `inferect.configure({
  redact: ["email", "ssn", "phone"],
  scope: "read-only",
});`,
  },
];
