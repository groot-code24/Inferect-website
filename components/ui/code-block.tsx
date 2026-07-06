"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showCopy?: boolean;
}

/**
 * Renders a code sample with a monospace face and a minimal token-color
 * pass (strings, comments, keywords) — deliberately lightweight rather
 * than pulling a full highlighter for a marketing page.
 */
export function CodeBlock({ code, language = "ts", className, showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-sm border border-border bg-[color-mix(in_srgb,var(--bg)_88%,transparent)]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-signal-negative/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6b450]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-positive/60" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-text-muted">{highlight(code)}</code>
      </pre>
      {showCopy ? (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="absolute right-3 top-11 rounded-xs border border-border-strong bg-surface p-1.5 text-text-faint opacity-100 transition-opacity duration-200 hover:text-text focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-signal-positive" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      ) : null}
    </div>
  );
}

/** Minimal keyword/string/comment tokenizer for visual flavor only. */
function highlight(code: string) {
  const lines = code.split("\n");
  return lines.map((line, i) => (
    <span key={i} className="block">
      {tokenize(line)}
      {"\n"}
    </span>
  ));
}

function tokenize(line: string) {
  const parts = line.split(/(".*?"|'.*?'|\/\/.*$)/g);
  return parts.map((part, i) => {
    if (/^".*"$|^'.*'$/.test(part)) {
      return (
        <span key={i} className="text-trace-cyan">
          {part}
        </span>
      );
    }
    if (part.startsWith("//")) {
      return (
        <span key={i} className="text-text-faint">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
