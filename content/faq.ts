import type { FaqItem } from "@/types";

export const faqItems: FaqItem[] = [
  {
    id: "f1",
    question: "How does Inferect route requests between providers?",
    answer:
      "Every request is scored against a policy you define — cost, latency, or quality-optimal — using live benchmark data across connected providers. The router picks a target in single-digit milliseconds and fails over automatically if a provider degrades mid-request.",
  },
  {
    id: "f2",
    question: "Do I need to rewrite my prompts or application code?",
    answer:
      "No. Inferect exposes an OpenAI-compatible API, so most teams switch by changing a base URL and API key. Prompt and context optimization happen transparently at the gateway layer.",
  },
  {
    id: "f3",
    question: "Which providers and models are supported?",
    answer:
      "OpenAI, Anthropic, Google, Mistral, DeepSeek, Qwen, Meta, Groq, Fireworks, and Modal are supported today, with new providers added as they reach production quality. Self-hosted endpoints can be connected as custom targets.",
  },
  {
    id: "f4",
    question: "How is sensitive data handled?",
    answer:
      "Inferect is SOC 2 Type II certified. Requests can be configured with field-level redaction, zero-retention routing, and per-key scoping, so sensitive fields never reach a model provider unless explicitly permitted.",
  },
  {
    id: "f5",
    question: "Can I see savings before switching production traffic?",
    answer:
      "Yes. Connect a read-only traffic sample and Inferect's recommendations engine will estimate cost and latency impact before you route a single live request through it.",
  },
  {
    id: "f6",
    question: "What happens if a provider has an outage?",
    answer:
      "The router detects degraded latency or error rates in real time and shifts affected traffic to your configured fallback models, then shifts it back once the primary provider recovers.",
  },
];
