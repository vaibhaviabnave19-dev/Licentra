import { createFileRoute, Link } from "@tanstack/react-router";
import { CTA } from "@/components/cta";
import { Dashboard } from "@/components/dashboard";
import { CountUp, LedgerLine } from "@/components/ledger";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Licentra | SaaS License & Subscription Management" },
      {
        name: "description",
        content:
          "Licentra centralizes SaaS licenses, subscriptions, renewals, and spend in one platform. Discover apps, reduce waste, and optimize software costs.",
      },
    ],
  }),
  component: Home,
});

const LOGOS = ["Ramp", "Brex", "Mercury", "Okta", "Google Workspace", "Slack", "Notion"];

const FEATURES = [
  {
    key: "spend",
    eyebrow: "01 · Auto-Discovery",
    title: "Every subscription, on the ledger.",
    body: "Connect your finance and email systems once. Licentra reads receipts, invoices, and SSO logs to build the full picture — no admin surveys, no spreadsheets.",
    stat: "132 tools found across 4 departments",
  },
  {
    key: "redundancy",
    eyebrow: "02 · Redundancy Radar",
    title: "Duplicate tools, found automatically.",
    body: "Three design tools when you only needed one. Licentra names the overlap and quantifies the monthly saving — before you renew the wrong one.",
    stat: "$14,400 / yr saved on a single flag",
  },
  {
    key: "usage",
    eyebrow: "03 · Usage Health Score",
    title: "See what nobody logs into.",
    body: "Per-seat activity from every connected tool, scored against your license count. Cancel the empty seats before they auto-renew.",
    stat: "31% of seats unused, on average",
  },
  {
    key: "spend",
    eyebrow: "04 · Spend Forecasting",
    title: "Know next quarter's number.",
    body: "A rolling 12-month forecast built from renewal cadence and seat trajectory. Finance stops guessing.",
    stat: "±3% forecast accuracy at 90d",
  },
  {
    key: "renewals",
    eyebrow: "05 · Smart Renewal Alerts",
    title: "No more surprise invoices.",
    body: "Alerts land 45 days before a renewal, with the negotiation context — cost trajectory, usage, and alternatives.",
    stat: "Zero surprise renewals since Jan",
  },
] as const;

function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Problem />
      <Walkthrough />
      <CaseStudy />
      <PricingPreview />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-ash">
      <div className="mx-auto max-w-[1240px] px-6 pt-20 pb-16 md:pt-28 md:pb-24 grid lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)] gap-16 items-center">
        <div>
          <p className="eyebrow">The command center for SaaS</p>
          <h1 className="mt-5 font-display text-bone text-[40px] md:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.02em]">
            You're paying for tools <span className="text-stone">you forgot you had.</span>
          </h1>
          <p className="mt-6 text-[17px] text-bone/80 max-w-[520px] leading-[1.65]">
            Licentra is the command center for SaaS licenses, subscriptions, and spend — one
            ledger that discovers every tool, flags what's duplicated, and forecasts renewals
            before they hit your budget.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <CTA to="/contact">Start Free</CTA>
            <Link to="/product" className="text-[14px] text-stone hover:text-bone">
              See how it works →
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-4 text-[12px] font-mono text-stone">
            <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-moss" /> Read-only permissions</span>
            <span>·</span>
            <span>SOC 2 in progress</span>
            <span>·</span>
            <span>Live in an afternoon</span>
          </div>
        </div>
        <div className="relative">
          <Dashboard />
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="border-b border-ash" style={{ background: "var(--slate-panel)" }}>
      <div className="mx-auto max-w-[1240px] px-6 py-10 grid md:grid-cols-[1fr_auto] items-center gap-10">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {LOGOS.map((l) => (
            <span
              key={l}
              className="font-display text-[18px] text-stone hover:text-bone transition-colors tracking-tight"
            >
              {l}
            </span>
          ))}
        </div>
        <div className="md:text-right">
          <div className="eyebrow">Integrations</div>
          <div className="mt-2 text-[13px] font-mono text-stone">Finance · Identity · HRIS</div>
          <div className="mt-2 md:ml-auto md:w-[220px]"><LedgerLine /></div>
          <p className="mt-2 text-[13px] text-stone">Read-only, added continuously</p>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="border-b border-ash">
      <div className="mx-auto max-w-[900px] px-6 py-28 text-center">
        <p className="eyebrow">The problem</p>
        <blockquote className="mt-6 font-serif italic text-[28px] md:text-[36px] text-bone leading-[1.25]">
          "The average company now runs 130+ SaaS tools. Finance can usually name 40 of them."
        </blockquote>
        <div className="mt-10 inline-flex flex-col items-center">
          <div className="text-[28px] font-mono text-bone">
            <CountUp to={38} suffix="%" />
          </div>
          <div className="mt-2 w-[120px]"><LedgerLine /></div>
          <p className="mt-2 text-[13px] text-stone">of SaaS spend is unmonitored by finance</p>
        </div>
      </div>
    </section>
  );
}

function Walkthrough() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const feature = FEATURES[active];

  return (
    <section className="border-b border-ash">
      <div className="mx-auto max-w-[1240px] px-6 py-24">
        <div className="max-w-[720px]">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px] tracking-[-0.015em]">
            Five things it does, quietly, in the background.
          </h2>
        </div>

        <div className="mt-14 hidden lg:grid grid-cols-[minmax(0,1fr)_minmax(0,560px)] gap-16">
          <div>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                data-i={i}
                className="min-h-[70vh] flex items-center"
              >
                <div className="max-w-[440px]">
                  <p className="eyebrow" style={{ color: active === i ? "var(--copper-ledger)" : undefined }}>
                    {f.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-bone text-[28px] leading-[1.15] tracking-[-0.01em]">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-[16px] text-bone/75 leading-[1.65]">{f.body}</p>
                  <p className="mt-5 text-[13px] font-mono text-copper">{f.stat}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="sticky top-24">
              <Dashboard highlight={feature.key as never} />
            </div>
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="mt-12 lg:hidden space-y-14">
          {FEATURES.map((f, i) => (
            <div key={i}>
              <Dashboard highlight={f.key as never} />
              <p className="eyebrow mt-6">{f.eyebrow}</p>
              <h3 className="mt-2 font-display text-bone text-[24px]">{f.title}</h3>
              <p className="mt-3 text-[15px] text-bone/75">{f.body}</p>
              <p className="mt-3 text-[13px] font-mono text-copper">{f.stat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section className="border-b border-ash" style={{ background: "var(--slate-panel)" }}>
      <div className="mx-auto max-w-[1100px] px-6 py-24 grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
        <div>
          <p className="eyebrow">Illustrative walkthrough · Design partner pilot</p>
          <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px] tracking-[-0.015em]">
            What a first month with Licentra typically looks like.
          </h2>
          <div className="mt-8 space-y-6 text-[15px] text-bone/80 leading-[1.7]">
            <div>
              <p className="eyebrow">Starting point</p>
              <p className="mt-2">Finance reconciles receipts across multiple corporate cards and expense tools. Renewals surface only when the invoice lands.</p>
            </div>
            <div>
              <p className="eyebrow">First week</p>
              <p className="mt-2">Connect finance and identity systems in an afternoon. Licentra rebuilds the software register from source data and surfaces duplicates for review.</p>
            </div>
            <div>
              <p className="eyebrow">By month one</p>
              <p className="mt-2">A shared renewal calendar. Duplicate tools flagged with per-seat activity. A quarterly forecast finance can actually defend.</p>
            </div>
          </div>
          <Link to="/customers" className="inline-block mt-8 text-[14px] text-copper hover:text-soft-copper">
            See the full walkthrough →
          </Link>
        </div>
        <div className="lg:pl-8 lg:border-l border-ash">
          <blockquote className="font-serif italic text-[26px] text-bone leading-[1.35]">
            "The goal is simple: the CFO opens Licentra before the standup, not after the invoice."
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ash flex items-center justify-center text-[14px] font-mono text-bone">L</div>
            <div>
              <div className="text-[14px] text-bone">Vaibhavi Abnave</div>
              <div className="text-[13px] text-stone">Founder, Licentra</div>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6">
            <Metric label="Setup" value="1 afternoon" />
            <Metric label="Access" value="Read-only" />
            <Metric label="First flags" value="Week 1" />
          </dl>
          <p className="mt-6 text-[11px] font-mono text-stone">Illustrative — from our design-partner pilots.</p>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[24px] font-mono text-bone">{value}</div>
      <div className="mt-1 w-8"><LedgerLine /></div>
      <div className="mt-2 text-[12px] text-stone eyebrow">{label}</div>
    </div>
  );
}

const TIERS = [
  { name: "Starter", price: "$49", desc: "For teams up to 25 people.", cta: "Start Free" as const },
  { name: "Growth", price: "$199", desc: "For 25–250 people. Recommended for growing teams.", cta: "Start Free" as const, highlight: true },
  { name: "Enterprise", price: "Custom", desc: "For 250+ with procurement workflows.", cta: "Talk to Sales" as const },
];

function PricingPreview() {
  return (
    <section className="border-b border-ash">
      <div className="mx-auto max-w-[1100px] px-6 py-24">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px]">Priced against what you'll save.</h2>
          </div>
          <Link to="/pricing" className="text-[14px] text-copper hover:text-soft-copper">See full pricing →</Link>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-[4px] border transition-all"
              style={{
                background: t.highlight ? "#18181a" : "var(--slate-panel)",
                borderColor: t.highlight ? "var(--copper-ledger)" : "var(--ash)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-[14px] text-bone">{t.name}</div>
                {t.highlight && <span className="text-[11px] font-mono text-copper">Recommended</span>}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-[36px] font-mono text-bone">{t.price}</span>
                {t.price.startsWith("$") && <span className="text-[13px] text-stone font-mono">/ mo</span>}
              </div>
              <p className="mt-3 text-[14px] text-stone">{t.desc}</p>
              <div className="mt-6">
                <CTA to={t.cta === "Talk to Sales" ? "/contact" : "/contact"} className="w-full">
                  {t.cta}
                </CTA>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ background: "var(--graphite-black)" }}>
      <div className="mx-auto max-w-[900px] px-6 py-32 text-center">
        <h2 className="font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em] leading-[1.05]">
          Know what you're actually paying for.
        </h2>
        <div className="mt-4 mx-auto w-[140px]"><LedgerLine /></div>
        <div className="mt-10">
          <CTA to="/contact">Start Free</CTA>
        </div>
        <p className="mt-6 text-[13px] text-stone">
          Read-only access · No credit card · Live in ~7 minutes
        </p>
      </div>
    </section>
  );
}
