import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CTA } from "@/components/cta";
import { Dashboard } from "@/components/dashboard";
import { LedgerLine } from "@/components/ledger";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product — Licentra AI" },
      { name: "description", content: "How Licentra AI reads your finance and identity systems to build the full software register — automatically, continuously, read-only." },
      { property: "og:title", content: "Product — Licentra AI" },
      { property: "og:description", content: "How Licentra connects, discovers, and acts on your software spend." },
    ],
  }),
  component: ProductPage,
});

const STEPS = [
  {
    n: "01",
    title: "Connect",
    short: "One afternoon, read-only.",
    detail:
      "Connect Ramp, Brex, Mercury, Google Workspace, Okta, or upload CSV. Licentra only ever requests read scopes — we never move money and never change your SSO configuration.",
    security: true,
  },
  {
    n: "02",
    title: "Discover",
    short: "The full software register, rebuilt from source.",
    detail:
      "We parse receipts, invoice metadata, and SSO login events into a normalized ledger. Every tool, every seat, every renewal cadence — cross-referenced across departments.",
  },
  {
    n: "03",
    title: "Act",
    short: "Flags, forecasts, and a renewal calendar.",
    detail:
      "Duplicate tools surface as reviewable flags. Renewals land 45 days out with negotiation context. Forecast rolls forward every night.",
  },
];

const CAPS = [
  {
    key: "spend",
    name: "Auto-Discovery",
    reads: "Receipts, invoice PDFs, SSO login events, HRIS seat data",
    triggers: "New charge on any monitored account · New app in SSO",
    action: "Auto-classifies vendor, assigns owner, opens a discovery card in the Overview.",
  },
  {
    key: "redundancy",
    name: "Redundancy Radar",
    reads: "Vendor category, feature-set embeddings, per-seat login activity",
    triggers: "Two+ vendors in the same category with overlapping active-user sets",
    action: "Groups the overlap, quantifies the saving from consolidating on the most-used tool.",
  },
  {
    key: "usage",
    name: "Usage Health Score",
    reads: "Per-seat activity from every connected tool, weighted by license type",
    triggers: "Score drops below 40 · Seats unused for 30+ days",
    action: "Suggests seats to remove ahead of the next renewal; drafts the cancellation ticket.",
  },
  {
    key: "spend",
    name: "Spend Forecasting",
    reads: "Renewal cadence, seat trajectory, historical price changes",
    triggers: "Runs nightly; alerts when the forecast moves >5% quarter-over-quarter",
    action: "Publishes an updated forecast to the CFO dashboard with the driver list.",
  },
  {
    key: "renewals",
    name: "Smart Renewal Alerts",
    reads: "Contract end dates, cadence, prior negotiation notes",
    triggers: "45, 15, and 5 days before renewal",
    action: "Slack/email alert with usage summary, cost trajectory, and alternatives shortlist.",
  },
];

function ProductPage() {
  return (
    <>
      <Header />
      <HowItWorks />
      <Capabilities />
      <ByRole />
      <BottomCTA />
    </>
  );
}

function Header() {
  return (
    <section className="border-b border-ash">
      <div className="mx-auto max-w-[1240px] px-6 pt-20 pb-14 grid lg:grid-cols-[minmax(0,540px)_1fr] gap-14 items-end">
        <div>
          <p className="eyebrow">Product</p>
          <h1 className="mt-4 font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em] leading-[1.02]">
            One ledger. Every tool. Every renewal.
          </h1>
          <p className="mt-6 text-[17px] text-bone/80 max-w-[520px]">
            Built for finance and IT teams that need the whole software register in one place — not scattered across expense reports, Slack pings, and SSO screenshots.
          </p>
          <div className="mt-8"><CTA to="/contact">Start Free</CTA></div>
        </div>
        <div className="justify-self-end w-full max-w-[560px]">
          <Dashboard />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-b border-ash">
      <div className="mx-auto max-w-[1240px] px-6 py-24">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px] tracking-[-0.015em]">
          Three steps. No implementation team required.
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => {
            const isOpen = open === i;
            return (
              <button
                key={s.n}
                onClick={() => setOpen(isOpen ? null : i)}
                className="text-left p-6 border rounded-[4px] transition-all"
                style={{
                  background: "var(--slate-panel)",
                  borderColor: isOpen ? "var(--copper-ledger)" : "var(--ash)",
                }}
                aria-expanded={isOpen}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono text-copper">{s.n}</span>
                  <span className="text-stone text-[18px]">{isOpen ? "−" : "+"}</span>
                </div>
                <div className="mt-4 font-display text-bone text-[22px]">{s.title}</div>
                <p className="mt-2 text-[14px] text-stone">{s.short}</p>
                {isOpen && (
                  <div className="mt-5 pt-5 border-t border-ash fade-in-soft">
                    <p className="text-[14px] text-bone/85 leading-[1.65]">{s.detail}</p>
                    {s.security && (
                      <p className="mt-4 text-[13px] text-stone">
                        Read-only permissions.{" "}
                        <Link to="/security" className="text-copper hover:text-soft-copper">
                          See exactly what we can and can't do →
                        </Link>
                      </p>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const [i, setI] = useState(0);
  const c = CAPS[i];
  return (
    <section className="border-b border-ash" style={{ background: "var(--slate-panel)" }}>
      <div className="mx-auto max-w-[1240px] px-6 py-24">
        <p className="eyebrow">Capabilities</p>
        <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px]">
          What each feature actually reads, and does.
        </h2>

        <div className="mt-12 grid lg:grid-cols-[280px_1fr_minmax(0,540px)] gap-8 items-start">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {CAPS.map((cap, idx) => (
              <button
                key={cap.name}
                onClick={() => setI(idx)}
                className="text-left px-4 py-3 rounded-[3px] transition-colors border-l-2 flex-shrink-0"
                style={{
                  borderColor: i === idx ? "var(--copper-ledger)" : "transparent",
                  background: i === idx ? "#101012" : "transparent",
                  color: i === idx ? "var(--bone)" : "var(--stone)",
                }}
              >
                <div className="text-[12px] font-mono">{String(idx + 1).padStart(2, "0")}</div>
                <div className="text-[15px] mt-0.5">{cap.name}</div>
              </button>
            ))}
          </div>

          <div className="border border-ash rounded-[4px] p-6" style={{ background: "#101012" }}>
            <h3 className="font-display text-bone text-[24px]">{c.name}</h3>
            <div className="mt-6 space-y-5">
              <Row label="Reads" value={c.reads} />
              <Row label="Triggers a flag when" value={c.triggers} />
              <Row label="What you do next" value={c.action} />
            </div>
          </div>

          <div>
            <Dashboard highlight={c.key as never} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow">{label}</div>
      <div className="mt-1 text-[15px] text-bone/85 leading-[1.6]">{value}</div>
    </div>
  );
}

const ROLES = {
  Finance: {
    bullets: [
      "One source of truth for the CFO dashboard.",
      "Renewal forecasting integrated into your close cadence.",
      "Vendor consolidation savings, quantified per quarter.",
      "Audit-ready trail of every subscription decision.",
    ],
    quote: {
      text: "The point isn't another dashboard — it's ending the surprise-invoice cycle at close.",
      name: "Licentra · Finance workflow",
    },
  },
  IT: {
    bullets: [
      "Shadow IT surfaced before it hits an audit.",
      "Seat cleanup from a single dashboard, not spreadsheets.",
      "SSO-aware — knows which apps are corporate-managed.",
      "Ticket drafts for cancellations, ready to send.",
    ],
    quote: {
      text: "Quarterly access reviews should take an afternoon, not a week — that's the bar we design to.",
      name: "Licentra · IT workflow",
    },
  },
  Founders: {
    bullets: [
      "Runway conversations backed by real spend, not estimates.",
      "Duplicate-tool cleanup on day one, no consultant.",
      "One dashboard for every board meeting.",
      "Zero-admin setup — connect and go.",
    ],
    quote: {
      text: "Every duplicate tool you cancel is runway you didn't have yesterday.",
      name: "Licentra · Founder workflow",
    },
  },
} as const;

function ByRole() {
  const [tab, setTab] = useState<keyof typeof ROLES>("Finance");
  const r = ROLES[tab];
  return (
    <section className="border-b border-ash">
      <div className="mx-auto max-w-[1100px] px-6 py-24">
        <p className="eyebrow">By role</p>
        <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px]">
          Different jobs, same ledger.
        </h2>
        <div className="mt-8 flex gap-1 border-b border-ash" role="tablist">
          {(Object.keys(ROLES) as (keyof typeof ROLES)[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className="px-5 py-3 text-[14px] relative"
              style={{ color: tab === k ? "var(--bone)" : "var(--stone)" }}
            >
              {k}
              {tab === k && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-copper" />}
            </button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-[1fr_360px] gap-12">
          <ul className="space-y-4">
            {r.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[16px] text-bone/85">
                <span className="mt-3 w-4 h-px bg-copper flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <blockquote className="border-l-2 border-copper pl-5">
            <p className="font-serif italic text-[22px] text-bone leading-[1.35]">"{r.quote.text}"</p>
            <footer className="mt-4 text-[13px] font-mono text-stone">{r.quote.name}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section>
      <div className="mx-auto max-w-[900px] px-6 py-28 text-center">
        <h2 className="font-display text-bone text-[36px] md:text-[48px] tracking-[-0.02em]">
          See it against your own stack.
        </h2>
        <div className="mt-4 mx-auto w-[140px]"><LedgerLine /></div>
        <div className="mt-10"><CTA to="/contact">Start Free</CTA></div>
      </div>
    </section>
  );
}
