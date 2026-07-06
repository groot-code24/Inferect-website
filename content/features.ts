import {
  Network,
  Split,
  Zap,
  PiggyBank,
  BarChart2,
  Wand,
  Shrink,
  Hash,
  Database,
  Activity,
  Gauge,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import type { FeatureCard } from "@/types";

export const featureCards: FeatureCard[] = [
  { id: "gateway", title: "AI Gateway", description: "One endpoint in front of every model you use, with consistent auth, retries, and rate limits.", icon: Network, category: "Core" },
  { id: "router", title: "Model Router", description: "Routes each request to the best available model against your latency, cost, and quality policy.", icon: Split, category: "Core" },
  { id: "latency", title: "Latency Optimizer", description: "Streams, batches, and pre-warms connections to shave milliseconds off every hop.", icon: Zap, category: "Performance" },
  { id: "cost", title: "Cost Optimizer", description: "Continuously reprices traffic across providers to hold spend to your target margin.", icon: PiggyBank, category: "Performance" },
  { id: "benchmarking", title: "Provider Benchmarking", description: "Live quality and speed scores across 18+ providers, refreshed on real traffic.", icon: BarChart2, category: "Intelligence" },
  { id: "prompt-optimizer", title: "Prompt Optimizer", description: "Rewrites prompts per-model to preserve intent while trimming unnecessary tokens.", icon: Wand, category: "Intelligence" },
  { id: "compression", title: "Context Compression", description: "Summarizes and prunes long context windows without losing the details that matter.", icon: Shrink, category: "Intelligence" },
  { id: "token-analytics", title: "Token Analytics", description: "See exactly where tokens go — by prompt, model, team, or customer.", icon: Hash, category: "Visibility" },
  { id: "caching", title: "Caching", description: "Semantic and exact-match caching layers cut redundant calls automatically.", icon: Database, category: "Performance" },
  { id: "observability", title: "Observability", description: "Full request tracing with exports to Datadog, Grafana, and your existing stack.", icon: Activity, category: "Visibility" },
  { id: "rate-limiting", title: "Rate Limiting", description: "Per-key, per-team, and per-model limits that protect budgets without paging anyone.", icon: Gauge, category: "Control" },
  { id: "security", title: "Enterprise Security", description: "SOC 2 Type II, SSO, audit logs, and field-level redaction out of the box.", icon: ShieldCheck, category: "Control" },
  { id: "recommendations", title: "Recommendations Engine", description: "Ranked, quantified suggestions for routing and prompt changes, updated daily.", icon: Sparkles, category: "Intelligence" },
  { id: "dashboard", title: "Dashboard", description: "A single pane for cost, latency, and quality across every model in production.", icon: LayoutDashboard, category: "Visibility" },
];
