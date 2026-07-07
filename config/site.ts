import type { NavLink } from "@/types";

export const siteConfig = {
  name: "Inferect",
  tagline: "The Intelligence Layer for AI Inference.",
  description:
    "Inferect intelligently routes, optimizes, and analyzes every AI inference request — cutting cost, reducing latency, and removing provider lock-in.",
  url: "https://inferect.online",
  ogImage: "https://inferect.online/og.png",
  github: "https://github.com/groot-code24/Inferect-website",
  twitter: "https://x.com/inferect",
  linkedin: "https://www.linkedin.com/company/inferect",

  keywords: [
    "AI inference",
    "LLM routing",
    "model gateway",
    "inference optimization",
    "AI infrastructure",
    "LLM cost optimization",
    "AI observability",
  ],
} as const;

export const navLinks: NavLink[] = [
  { label: "Problem", href: "/#problem" },
  { label: "Solution", href: "/#solution" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Research", href: "/#research" },
];

export const footerLinks = {
  Product: [
    { label: "The problem", href: "/#problem" },
    { label: "The solution", href: "/#solution" },
    { label: "Architecture", href: "/#architecture" },
  ],
  Resources: [
    { label: "Research", href: "/#research" },
    { label: "Investors", href: "/#cta" },
    { label: "Join waitlist", href: "/waitlist" },
  ],
  Company: [
    { label: "Contact", href: "mailto:find@inferect.online" },
  ],
} as const;
