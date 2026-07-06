import type { BlogPost, ResearchNote } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Why request-level routing beats model-level defaults",
    excerpt:
      "A breakdown of how per-request scoring outperforms hardcoded model selection across cost, latency, and quality.",
    category: "Engineering",
    date: "Jun 18, 2026",
    readTime: "7 min",
  },
  {
    id: "b2",
    title: "Semantic caching in production: a field guide",
    excerpt:
      "What we learned running semantic caching across billions of requests, and where it still falls short.",
    category: "Optimization",
    date: "Jun 5, 2026",
    readTime: "9 min",
  },
  {
    id: "b3",
    title: "Benchmarking 18 inference providers, transparently",
    excerpt:
      "Our methodology for continuous, traffic-weighted benchmarking — and why static leaderboards go stale fast.",
    category: "Research",
    date: "May 22, 2026",
    readTime: "11 min",
  },
];

export const researchNotes: ResearchNote[] = [
  {
    id: "r1",
    title: "Latency-aware routing under provider variance",
    tag: "Systems",
    summary:
      "A routing policy that adapts to intra-day provider latency drift, evaluated against 40M production requests.",
    date: "2026",
  },
  {
    id: "r2",
    title: "Context compression without semantic loss",
    tag: "Optimization",
    summary: "Token-level pruning techniques that preserve downstream task accuracy within 0.4%.",
    date: "2026",
  },
  {
    id: "r3",
    title: "A traffic-weighted benchmark for LLM providers",
    tag: "Benchmarking",
    summary: "Why static, prompt-set benchmarks misrepresent real-world provider performance.",
    date: "2025",
  },
];
