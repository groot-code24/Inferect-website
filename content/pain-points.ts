import { DollarSign, Timer, Lock, Route, Coins, Cpu, EyeOff } from "lucide-react";
import type { PainPoint } from "@/types";

export const painPoints: PainPoint[] = [
  {
    id: "cost",
    title: "Expensive inference",
    description:
      "Every model call is billed at list price, regardless of whether a cheaper model would have answered just as well.",
    metric: "42%",
    metricLabel: "of spend on oversized models",
    icon: DollarSign,
  },
  {
    id: "latency",
    title: "High latency",
    description:
      "Single-provider calls have nowhere to fail over when a region slows down, so your p99 inherits their worst day.",
    metric: "1.8s",
    metricLabel: "avg. p99 without failover",
    icon: Timer,
  },
  {
    id: "lockin",
    title: "Provider lock-in",
    description:
      "Prompts, tools, and evals get wired to one vendor's SDK, making it expensive to test — or leave for — a better model.",
    metric: "1",
    metricLabel: "vendor holding your roadmap",
    icon: Lock,
  },
  {
    id: "routing",
    title: "Poor routing",
    description:
      "Requests are sent to the same endpoint whether they're a simple classification or a long, reasoning-heavy task.",
    metric: "0",
    metricLabel: "routing decisions per request",
    icon: Route,
  },
  {
    id: "tokens",
    title: "Token waste",
    description:
      "Bloated context windows and repeated boilerplate inflate every request's token count — and its bill.",
    metric: "31%",
    metricLabel: "of tokens are redundant",
    icon: Coins,
  },
  {
    id: "gpu",
    title: "GPU inefficiency",
    description:
      "Self-hosted fleets sit idle between bursts, or throttle under load, with no elastic layer to absorb demand.",
    metric: "38%",
    metricLabel: "average fleet utilization",
    icon: Cpu,
  },
  {
    id: "visibility",
    title: "Lack of visibility",
    description:
      "Cost, latency, and quality live in five different dashboards — or nowhere at all — until the invoice arrives.",
    metric: "0",
    metricLabel: "unified cost views",
    icon: EyeOff,
  },
];
