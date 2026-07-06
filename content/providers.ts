import type { Provider } from "@/types";

export const providers: Provider[] = [
  { id: "openai", name: "OpenAI", color: "var(--trace-cyan)" },
  { id: "anthropic", name: "Anthropic", color: "var(--trace-blue)" },
  { id: "google", name: "Google", color: "var(--trace-purple)" },
  { id: "mistral", name: "Mistral", color: "var(--trace-cyan)" },
  { id: "deepseek", name: "DeepSeek", color: "var(--trace-blue)" },
  { id: "qwen", name: "Qwen", color: "var(--trace-purple)" },
  { id: "meta", name: "Meta", color: "var(--trace-cyan)" },
  { id: "groq", name: "Groq", color: "var(--trace-blue)" },
  { id: "fireworks", name: "Fireworks", color: "var(--trace-purple)" },
  { id: "modal", name: "Modal", color: "var(--trace-cyan)" },
];

export const logos: { id: string; name: string }[] = [
  { id: "l1", name: "Northwind AI" },
  { id: "l2", name: "Helix Labs" },
  { id: "l3", name: "Cortex Health" },
  { id: "l4", name: "Statute AI" },
  { id: "l5", name: "Orbital Systems" },
  { id: "l6", name: "Verity Research" },
  { id: "l7", name: "Fathom Data" },
  { id: "l8", name: "Anchorpoint" },
];
