"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Audience = "startup" | "investor";

interface AudienceContextValue {
  audience: Audience;
  setAudience: (audience: Audience) => void;
}

const AudienceContext = createContext<AudienceContextValue | undefined>(undefined);

const STORAGE_KEY = "inferect-audience";

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("startup");

  // Restore any previously chosen audience after mount (avoids hydration mismatch).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "startup" || stored === "investor") {
      setAudienceState(stored);
    }
  }, []);

  function setAudience(next: Audience) {
    setAudienceState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience(): AudienceContextValue {
  const ctx = useContext(AudienceContext);
  if (!ctx) {
    throw new Error("useAudience must be used within an AudienceProvider");
  }
  return ctx;
}
