import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "We swapped four separate provider SDKs for one Inferect endpoint and cut our inference bill by a third in the first month, without touching a single prompt.",
    name: "Priya Raman",
    role: "Co-founder & CTO",
    company: "Northwind AI",
    initials: "PR",
  },
  {
    id: "t2",
    quote:
      "The routing engine caught a latency regression on a provider we'd have never noticed until customers complained. It failed over in under a second.",
    name: "Marcus Webb",
    role: "ML Engineer",
    company: "Helix Labs",
    initials: "MW",
  },
  {
    id: "t3",
    quote:
      "Our compliance team signed off in a week. Field-level redaction and audit logs were exactly what we needed to bring LLMs into clinical workflows.",
    name: "Dr. Amara Osei",
    role: "Head of Applied Research",
    company: "Cortex Health",
    initials: "AO",
  },
  {
    id: "t4",
    quote:
      "Inferect's benchmarking dashboard is now how we decide which model ships. It's the first tool that made provider comparisons an actual data conversation.",
    name: "Tom Delacroix",
    role: "Founder",
    company: "Statute AI",
    initials: "TD",
  },
];
