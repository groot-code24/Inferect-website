import type { BenchmarkRow } from "@/types";

export const benchmarkRows: BenchmarkRow[] = [
  {
    metric: "p99 Latency",
    without: { value: "1.8s", percent: 35 },
    with: { value: "480ms", percent: 88 },
  },
  {
    metric: "Cost per 1M tokens",
    without: { value: "$18.40", percent: 28 },
    with: { value: "$7.10", percent: 82 },
  },
  {
    metric: "Reliability (uptime)",
    without: { value: "99.2%", percent: 60 },
    with: { value: "99.98%", percent: 97 },
  },
  {
    metric: "Throughput",
    without: { value: "420 req/s", percent: 40 },
    with: { value: "1,850 req/s", percent: 91 },
  },
  {
    metric: "Time to integrate",
    without: { value: "3–6 weeks", percent: 22 },
    with: { value: "< 1 day", percent: 95 },
  },
];
