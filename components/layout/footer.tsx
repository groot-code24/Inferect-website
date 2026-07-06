import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { footerLinks, siteConfig } from "@/config/site";
import { InferectMark } from "@/components/ui/inferect-mark";
import { TraceDivider } from "@/components/ui/trace-divider";

export function Footer() {
  return (
    <footer id="careers" className="relative border-t border-border bg-bg-elevated">
      <TraceDivider className="absolute -top-px" pulses={2} />
      <div className="container-content grid grid-cols-1 gap-x-8 gap-y-12 py-16 sm:grid-cols-2 md:grid-cols-6 md:py-20">
        <div className="col-span-1 flex flex-col gap-4 sm:col-span-2">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Inferect home">
            <InferectMark className="h-7 w-7 shrink-0" />
            <span className="font-display text-[15px] font-semibold tracking-tight text-text">
              {siteConfig.name}
            </span>
          </Link>
          <p className="max-w-[26ch] text-sm leading-relaxed text-text-muted">
            {siteConfig.tagline}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={siteConfig.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-text-muted transition-colors hover:text-text"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-text-muted transition-colors hover:text-text"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="flex flex-col gap-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
              {title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-1 flex flex-col gap-3 sm:col-span-2 md:col-span-2">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
            Stay in the loop
          </h4>
          <p className="text-sm text-text-muted">
            Infrastructure notes and benchmark releases, roughly monthly.
          </p>
          <form
            action="/waitlist"
            method="get"
            className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
            aria-label="Join the waitlist"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="h-10 w-full rounded-sm border border-border-strong bg-surface px-3.5 text-sm text-text placeholder:text-text-faint focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-trace-blue"
            />
            <button
              type="submit"
              className="h-10 shrink-0 rounded-sm bg-text px-4 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Join waitlist
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-6 text-xs text-text-faint md:flex-row">
          <p>© {new Date().getFullYear()} Inferect, Inc. All rights reserved.</p>
          <p className="font-mono">Built for the inference layer.</p>
        </div>
      </div>
    </footer>
  );
}
