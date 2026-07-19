import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTA } from "@/components/cta";
import { LedgerLine } from "@/components/ledger";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Licentra AI" },
      { name: "description", content: "How finance and ops teams use Licentra to find avoidable spend, cancel duplicate tools, and forecast renewals." },
      { property: "og:title", content: "Customers — Licentra AI" },
      { property: "og:description", content: "Case studies and testimonials from finance and IT teams using Licentra." },
    ],
  }),
  component: Customers,
});

const INDUSTRIES = ["All", "Fintech", "SaaS", "Marketplace", "Healthcare", "Media"];

const CASES = [
  {
    company: "Series B SaaS · Design partner",
    industry: "SaaS",
    quote: "The first tool where the finance lead opens it before standup, not after the invoice lands.",
    stat: "6",
    statLabel: "duplicate tools flagged in week one",
  },
  {
    company: "Fintech pilot · Design partner",
    industry: "Fintech",
    quote: "Closed the quarter without a surprise vendor invoice — the renewal calendar earned its keep immediately.",
    stat: "0",
    statLabel: "surprise renewals in Q1",
  },
  {
    company: "Vertical SaaS · Pilot",
    industry: "SaaS",
    quote: "Cleanup on day one paid for the pilot. The forecast is what we kept it for.",
    stat: "Wk 1",
    statLabel: "first cancellations",
  },
  {
    company: "Marketplace · Pilot",
    industry: "Marketplace",
    quote: "Quarterly access review dropped from a week of spreadsheets to a single afternoon.",
    stat: "1 day",
    statLabel: "access review",
  },
  {
    company: "Healthcare ops · Pilot",
    industry: "Healthcare",
    quote: "The renewal calendar alone changed how our leadership team plans the quarter.",
    stat: "45d",
    statLabel: "renewal lead time",
  },
  {
    company: "Media & content · Pilot",
    industry: "Media",
    quote: "We finally have a shared answer to 'what does marketing actually pay for?'",
    stat: "1",
    statLabel: "shared source of truth",
  },
];

const TESTIMONIALS = [
  { name: "Finance lead", title: "Design partner · Series B SaaS", quote: "It's the first finance tool the team asked to keep after the trial." },
  { name: "Controller", title: "Design partner · Fintech pilot", quote: "The audit trail is what sold the security review — nothing else in the stack has one this clean." },
  { name: "IT lead", title: "Design partner · Series B SaaS", quote: "Zero-drama seat cleanup — engineering barely noticed." },
  { name: "Founder", title: "Design partner · Vertical SaaS", quote: "An afternoon of cleanup meaningfully changed our runway conversation." },
];

function Customers() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? CASES : CASES.filter((c) => c.industry === filter);
  return (
    <>
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1100px] px-6 pt-20 pb-14">
          <p className="eyebrow">Customers</p>
          <h1 className="mt-4 font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em] max-w-[820px]">
            Finance teams that stopped reconciling receipts after the fact.
          </h1>

          <div className="mt-10 flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => (
              <button
                key={i}
                onClick={() => setFilter(i)}
                className="px-3 h-8 text-[13px] rounded-[3px] border transition-colors"
                style={{
                  borderColor: filter === i ? "var(--copper-ledger)" : "var(--ash)",
                  color: filter === i ? "var(--copper-ledger)" : "var(--stone)",
                  background: filter === i ? "#18181a" : "transparent",
                }}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <article
                key={c.company}
                className="group p-6 rounded-[4px] border border-ash transition-all hover:-translate-y-0.5 hover:border-copper hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]"
                style={{ background: "var(--slate-panel)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-bone text-[18px]">{c.company}</div>
                  <span className="text-[11px] font-mono text-stone">{c.industry}</span>
                </div>
                <blockquote className="mt-6 font-serif italic text-[19px] text-bone leading-[1.35]">
                  "{c.quote}"
                </blockquote>
                <div className="mt-8">
                  <div className="text-[26px] font-mono text-copper">{c.stat}</div>
                  <div className="mt-1 w-8"><LedgerLine /></div>
                  <div className="mt-2 text-[12px] text-stone eyebrow">{c.statLabel}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full case template */}
      <section className="border-b border-ash" style={{ background: "var(--slate-panel)" }}>
        <div className="mx-auto max-w-[1100px] px-6 py-24 grid lg:grid-cols-[1fr_1fr] gap-16">
          <div>
            <p className="eyebrow">Featured walkthrough · Design partner pilot</p>
            <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px]">
              What the first month with a design partner typically looks like.
            </h2>
            <div className="mt-8 space-y-6 text-[15px] text-bone/85 leading-[1.7]">
              <div>
                <p className="eyebrow">Challenge</p>
                <p className="mt-2">Multiple expense platforms. Fragmented SSO. No shared answer to what the company paid for month to month. Renewals surfacing only when the invoice landed.</p>
              </div>
              <div>
                <p className="eyebrow">Approach</p>
                <p className="mt-2">Connect finance and identity on a Tuesday afternoon — read-only. Licentra rebuilds the software register from source data overnight. Finance and IT review the flags together the next morning.</p>
              </div>
              <div>
                <p className="eyebrow">Result</p>
                <p className="mt-2">Duplicate tools flagged in the first week. Renewal calendar aligned to the close cadence. The ledger becomes a standing agenda item, not a fire drill.</p>
              </div>
            </div>
          </div>
          <div className="lg:pl-8 lg:border-l border-ash">
            <blockquote className="font-serif italic text-[28px] text-bone leading-[1.3]">
              "We stopped talking about SaaS spend as a problem and started using it as a lever."
            </blockquote>
            <div className="mt-5 text-[13px] font-mono text-stone">Finance lead · Design partner</div>

            <div className="mt-14 grid grid-cols-3 gap-6">
              <Metric v="1 day" l="Setup" />
              <Metric v="Read-only" l="Access" />
              <Metric v="Week 1" l="First flags" />
            </div>
            <p className="mt-6 text-[11px] font-mono text-stone">Illustrative — from our design-partner pilots.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <p className="eyebrow">In their words</p>
          <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px]">What operators say.</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 border border-ash rounded-[4px]" style={{ background: "var(--slate-panel)" }}>
                <blockquote className="font-serif italic text-[22px] text-bone leading-[1.35]">"{t.quote}"</blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-ash flex items-center justify-center text-[12px] font-mono text-bone">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-[14px] text-bone">{t.name}</div>
                    <div className="text-[12px] text-stone">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[900px] px-6 py-28 text-center">
          <h2 className="font-display text-bone text-[36px] md:text-[48px] tracking-[-0.02em]">Your ledger, next.</h2>
          <div className="mt-4 mx-auto w-[140px]"><LedgerLine /></div>
          <div className="mt-10"><CTA to="/contact">Start Free</CTA></div>
        </div>
      </section>
    </>
  );
}

function Metric({ v, l }: { v: string; l: string }) {
  return (
    <div>
      <div className="text-[24px] font-mono text-bone">{v}</div>
      <div className="mt-1 w-8"><LedgerLine /></div>
      <div className="mt-2 text-[12px] text-stone eyebrow">{l}</div>
    </div>
  );
}
