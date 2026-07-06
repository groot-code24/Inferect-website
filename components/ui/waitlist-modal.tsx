"use client";

import { useRouter } from "next/navigation";

export type WaitlistRole = "startup" | "investor" | "developer";

/**
 * Historically this opened an in-page modal. The waitlist flow now lives on
 * its own dedicated page (`/waitlist`) so people can pick Startup Owner,
 * Investor, or Developer and get a tailored confirmation — this hook keeps
 * the same call-site API (`openWaitlist()`) used across the navbar, hero,
 * and CTA sections, but routes to that page instead of toggling a dialog.
 */
export function useWaitlistModal() {
  const router = useRouter();

  function openWaitlist(role?: WaitlistRole) {
    router.push(role ? `/waitlist?role=${role}` : "/waitlist");
  }

  return { openWaitlist };
}
