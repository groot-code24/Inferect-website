import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  code: string;
  language: string;
  stat: { value: string; label: string };
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

export interface Provider {
  id: string;
  name: string;
  color: string;
}

export interface BenchmarkRow {
  metric: string;
  without: { value: string; percent: number };
  with: { value: string; percent: number };
  unit?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export interface ResearchNote {
  id: string;
  title: string;
  tag: string;
  summary: string;
  date: string;
}

export interface LogoItem {
  id: string;
  name: string;
}
