import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <footer className="border-t border-ash mt-24" style={{ background: "var(--graphite-black)" }}>
      <div className="mx-auto max-w-[1240px] px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
                <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" stroke="var(--copper-ledger)" fill="none" />
                <path d="M5 14l4-4 3 3 5-6" stroke="var(--copper-ledger)" strokeWidth="1.25" fill="none" strokeLinecap="round" />
              </svg>
              <span className="font-display text-bone">Licentra<span className="text-copper">.</span></span>
            </div>
            <p className="mt-4 text-[14px] text-stone max-w-[280px] leading-[1.6]">
              The command center for SaaS licenses, subscriptions & spend.
            </p>
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
            >
              <label className="eyebrow block mb-2" htmlFor="ft-email">Monthly avoidable spend report</label>
              <div className="flex border border-ash rounded-[3px] overflow-hidden focus-within:border-copper">
                <input
                  id="ft-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent px-3 py-2 text-[14px] outline-none text-bone placeholder:text-stone/60"
                />
                <button className="px-4 text-[13px] font-medium text-copper hover:bg-ash" type="submit">
                  {sent ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            </form>
          </div>

          <FooterCol title="Product" links={[
            { to: "/product", label: "Overview" },
            { to: "/product", label: "Auto-Discovery" },
            { to: "/product", label: "Redundancy Radar" },
            { to: "/pricing", label: "Pricing" },
          ]} />
          <FooterCol title="Company" links={[
            { to: "/about", label: "About" },
            { to: "/careers", label: "Careers" },
            { to: "/security", label: "Security & Trust" },
            { to: "/contact", label: "Contact" },
          ]} />
          <FooterCol title="Resources" links={[
            { to: "/resources", label: "Blog" },
            { to: "/resources", label: "State of SaaS Spend" },
            { to: "/resources", label: "ROI Calculator" },
          ]} />
          <FooterCol title="Legal" links={[
            { to: "/security", label: "Privacy" },
            { to: "/security", label: "Terms" },
            { to: "/security", label: "DPA" },
          ]} />
        </div>

        <div className="mt-16 pt-6 border-t border-ash flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <ComplianceBadge label="SOC 2" />
            <ComplianceBadge label="GDPR" />
            <ComplianceBadge label="CCPA" />
          </div>
          <div className="flex items-center gap-6 text-stone">
            <a href="#" aria-label="LinkedIn" className="hover:text-copper">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" /><path d="M5 7v6M5 5.2v.1M8 13V7m0 2.2c0-1.2.9-2.2 2.1-2.2s2 1 2 2.2V13" stroke="currentColor" strokeLinecap="round" /></svg>
            </a>
            <a href="#" aria-label="X" className="hover:text-copper">
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.25" /></svg>
            </a>
          </div>
          <p className="text-[13px] text-stone font-mono">© {new Date().getFullYear()} Licentra AI, Inc.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-[14px] text-bone/80 hover:text-copper transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComplianceBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 h-8 border border-ash rounded-[3px]">
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l4 2v3c0 3-4 5-4 5S2 9 2 6V3l4-2z" stroke="var(--stone)" fill="none" /></svg>
      <span className="text-[12px] font-mono text-stone">{label}</span>
    </div>
  );
}
