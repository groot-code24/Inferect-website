"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Loader2,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";

type Role = "startup" | "investor" | "developer";

const ROLE_IDS: Role[] = ["startup", "investor", "developer"];

const ROLES: {
  id: Role;
  label: string;
  description: string;
  icon: typeof Rocket;
}[] = [
  {
    id: "startup",
    label: "Startup Owner",
    description: "I'm building or running a team shipping AI in production.",
    icon: Rocket,
  },
  {
    id: "investor",
    label: "Investor",
    description: "I back infrastructure and AI-native companies.",
    icon: TrendingUp,
  },
  {
    id: "developer",
    label: "Developer",
    description: "I build with LLMs and want early access to the API.",
    icon: Code2,
  },
];

const ROLE_CTA_LABEL: Record<Role, string> = {
  startup: "Get early access",
  investor: "Request the deck",
  developer: "Get early API access",
};

const ROLE_SUCCESS_COPY: Record<Role, string> = {
  startup: "You're in for v1 — our team will contact you shortly.",
  investor: "Welcome to Inferect — the world's next billion-dollar AI Frontier Lab.",
  developer: "You're in for v1 — our team will contact you shortly.",
};

type Status = "idle" | "loading" | "success" | "error";

function isRole(value: string | null): value is Role {
  return !!value && (ROLE_IDS as string[]).includes(value);
}

export function WaitlistExperience() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role");
  const initialEmail = searchParams.get("email")?.slice(0, 254) ?? "";

  const [role, setRole] = useState<Role | null>(isRole(initialRole) ? initialRole : null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const step: "role" | "form" | "success" = status === "success" ? "success" : role ? "form" : "role";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!role) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 md:pt-36">
      <div className="bg-lab-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--trace-blue) 12%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-content relative z-10 w-full">
        <div className="mx-auto flex w-full max-w-[600px] flex-col items-center">
          <AnimatePresence mode="wait">
            {step === "role" && (
              <motion.div
                key="role"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                variants={staggerContainer(0.08)}
                className="flex w-full flex-col items-center gap-3 text-center"
              >
                <motion.span
                  variants={fadeUp}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-trace-blue"
                >
                  Join the waitlist
                </motion.span>
                <motion.h1
                  variants={fadeUp}
                  className="text-balance font-display text-display-md font-medium text-text sm:text-display-lg"
                >
                  Tell us who you are
                </motion.h1>
                <motion.p variants={fadeUp} className="max-w-md text-balance text-text-muted">
                  We&apos;ll route you to the right onboarding track and send a confirmation
                  straight away.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  role="radiogroup"
                  aria-label="I am a"
                  className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  {ROLES.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={role === option.id}
                        onClick={() => setRole(option.id)}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex flex-col items-center gap-3 rounded-md border border-border bg-surface/50 p-6 text-center transition-colors duration-300 hover:border-trace-blue/50 hover:bg-surface hover:shadow-glow"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-trace-blue/10 text-trace-blue">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <div>
                          <h3 className="font-display text-sm font-medium text-text">
                            {option.label}
                          </h3>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
                            {option.description}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Link
                    href="/"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-text-faint transition-colors hover:text-text"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to the site
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {step === "form" && role && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="w-full rounded-lg border border-border-strong bg-bg-elevated p-5 shadow-panel xs:p-7 sm:p-9"
              >
                <button
                  type="button"
                  onClick={() => {
                    setRole(null);
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                  className="mb-6 inline-flex items-center gap-1.5 text-xs text-text-faint transition-colors hover:text-text"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Change role
                </button>

                <div className="mb-6 flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-trace-blue/10 text-trace-blue">
                    {(() => {
                      const Icon = ROLES.find((r) => r.id === role)!.icon;
                      return <Icon className="h-4 w-4" strokeWidth={1.75} />;
                    })()}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-medium text-text">
                      Joining as {ROLES.find((r) => r.id === role)!.label}
                    </h2>
                    <p className="break-words text-xs text-text-muted">
                      We&apos;ll email your confirmation from find@inferect.online
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-name" className="text-xs font-medium text-text-muted">
                      Full name
                    </label>
                    <input
                      id="waitlist-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-sm border border-border-strong bg-surface px-4 text-sm text-text placeholder:text-text-faint focus:border-trace-blue/60 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-email" className="text-xs font-medium text-text-muted">
                      Email
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-sm border border-border-strong bg-surface px-4 text-sm text-text placeholder:text-text-faint focus:border-trace-blue/60 focus:outline-none"
                    />
                  </div>

                  {status === "error" ? (
                    <p className="text-sm text-signal-negative">{errorMessage}</p>
                  ) : null}

                  <Button type="submit" size="lg" className="mt-2 w-full" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending confirmation…
                      </>
                    ) : (
                      <>
                        {ROLE_CTA_LABEL[role]}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
                <p className="mt-4 text-center text-xs text-text-faint">
                  No spam. We&apos;ll only email you about onboarding.
                </p>
              </motion.div>
            )}

            {step === "success" && role && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                className="flex w-full flex-col items-center gap-5 rounded-lg border border-border-strong bg-bg-elevated p-9 text-center shadow-panel"
              >
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-signal-positive/10 text-signal-positive"
                >
                  <Check className="h-7 w-7" />
                </motion.span>
                <div>
                  <h2 className="font-display text-xl font-medium text-text">You&apos;re on the list</h2>
                  <p className="mt-2 max-w-sm text-balance text-sm leading-relaxed text-text-muted">
                    {ROLE_SUCCESS_COPY[role]}
                  </p>
                  <p className="mt-3 text-xs text-text-faint">
                    A confirmation is on its way to {email}.
                  </p>
                </div>
                <Button variant="secondary" className="mt-2 w-full max-w-[220px]" asChild>
                  <Link href="/">Back to the site</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
