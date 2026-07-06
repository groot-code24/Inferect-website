import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    id: "developer",
    name: "Developer",
    price: "$0",
    cadence: "/month",
    description: "For side projects and evaluating the platform.",
    features: [
      "100K routed requests / month",
      "3 connected providers",
      "Semantic caching",
      "7-day trace retention",
      "Community support",
    ],
    cta: "Start Free",
  },
  {
    id: "startup",
    name: "Startup",
    price: "$249",
    cadence: "/month",
    description: "For teams putting inference into production.",
    features: [
      "5M routed requests / month",
      "Unlimited providers",
      "Prompt & context optimization",
      "90-day trace retention",
      "Recommendations engine",
      "Priority support",
    ],
    cta: "Start Free",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For regulated, high-volume, and multi-team deployments.",
    features: [
      "Unlimited requests",
      "SOC 2 Type II & custom DPAs",
      "SSO, SCIM, audit logs",
      "Dedicated routing policies",
      "Uptime SLA & solutions engineer",
    ],
    cta: "Book Demo",
  },
];
