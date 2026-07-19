import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTA } from "@/components/cta";
import { LedgerLine } from "@/components/ledger";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Licentra AI" },
      { name: "description", content: "The State of SaaS Spend report, ROI calculator, product updates, and writing on SaaS management and finance ops." },
      { property: "og:title", content: "Resources — Licentra AI" },
      { property: "og:description", content: "The State of SaaS Spend report, ROI calculator, and blog." },
    ],
  }),
  component: Resources,
});

const CATS = ["All", "Product Updates", "SaaS Management", "Finance Ops"];

const POSTS = [
  { title: "How to run a 30-minute quarterly software audit", cat: "SaaS Management", read: 6, date: "Jul 2026" },
  { title: "The renewal calendar every CFO should build", cat: "Finance Ops", read: 8, date: "Jun 2026" },
  { title: "Introducing Spend Forecasting v2", cat: "Product Updates", read: 4, date: "Jun 2026" },
  { title: "Why per-seat pricing beats consumption for finance predictability", cat: "Finance Ops", read: 10, date: "May 2026" },
  { title: "Auto-Discovery now reads Brex + Mercury natively", cat: "Product Updates", read: 3, date: "May 2026" },
  { title: "The 40/60 rule: how much of your SaaS stack is truly used", cat: "SaaS Management", read: 7, date: "Apr 2026" },
];

function Resources() {
  const [cat, setCat] = useState("All");
  const posts = cat === "All" ? POSTS : POSTS.filter((p) => p.cat === cat);
  return (
    <>
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-10">
          <p className="eyebrow">Resources</p>
          <h1 className="mt-4 font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em]">
            Writing, data, and tools for finance ops.
          </h1>
        </div>
      </section>

      {/* State of SaaS Spend */}
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div
            className="p-8 md:p-12 rounded-[4px] border border-copper grid md:grid-cols-[1fr_320px] gap-10 items-center"
            style={{ background: "var(--slate-panel)" }}
          >
            <div>
              <p className="eyebrow" style={{ color: "var(--copper-ledger)" }}>Upcoming report</p>
              <h2 className="mt-3 font-display text-bone text-[28px] md:text-[36px] tracking-[-0.015em]">
                The State of SaaS Spend, 2026.
              </h2>
              <p className="mt-4 text-[15px] text-bone/80 max-w-[520px]">
                Our first benchmark on how mid-market finance teams discover, cancel, and forecast software spend. Drop your email to get it when it ships.
              </p>
              <form
                className="mt-6 flex flex-col sm:flex-row gap-2 max-w-[440px]"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="sr-only" htmlFor="report-email">Work email</label>
                <input
                  id="report-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 h-11 px-3 bg-transparent border border-ash rounded-[3px] text-bone text-[14px] outline-none focus:border-copper"
                />
                <CTA type="submit" className="whitespace-nowrap">Get the report</CTA>
              </form>
            </div>
            <ReportCover />
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Blog */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="eyebrow">Blog</p>
              <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px]">Latest writing.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="px-3 h-8 text-[13px] rounded-[3px] border transition-colors"
                  style={{
                    borderColor: cat === c ? "var(--copper-ledger)" : "var(--ash)",
                    color: cat === c ? "var(--copper-ledger)" : "var(--stone)",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((p) => (
              <a
                key={p.title}
                href="#"
                className="group p-6 border border-ash rounded-[4px] block transition-all hover:-translate-y-0.5 hover:border-copper hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"
                style={{ background: "var(--slate-panel)" }}
              >
                <div className="flex items-center justify-between text-[12px] font-mono text-stone">
                  <span>{p.cat}</span>
                  <span>{p.read} min read</span>
                </div>
                <h3 className="mt-5 font-serif text-[22px] text-bone leading-[1.25] group-hover:text-copper transition-colors">
                  {p.title}
                </h3>
                <div className="mt-6 text-[12px] font-mono text-stone">{p.date}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ReportCover() {
  return (
    <div className="relative aspect-[3/4] max-w-[280px] mx-auto rounded-[4px] overflow-hidden border border-ash shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
      style={{ background: "linear-gradient(180deg, #18181a 0%, #101012 100%)" }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="text-[11px] font-mono text-copper eyebrow">Licentra · 2026</div>
        <div className="mt-auto">
          <div className="font-display text-bone text-[26px] leading-[1.05]">The State of SaaS Spend</div>
          <div className="mt-3 h-px w-full bg-copper" />
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono text-stone">
            <div>Mid-market</div>
            <div>Benchmark study</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ROICalculator() {
  const [size, setSize] = useState(100);
  const [tools, setTools] = useState(80);
  // Rough model: avg $85/seat/mo overhead; 18% avoidable
  const avoidable = Math.round(size * tools * 8.5 * 0.18);
  return (
    <section className="border-b border-ash" style={{ background: "var(--slate-panel)" }}>
      <div className="mx-auto max-w-[1000px] px-6 py-20">
        <p className="eyebrow">ROI Calculator</p>
        <h2 className="mt-3 font-display text-bone text-[28px] md:text-[36px]">What's it worth to you?</h2>
        <div className="mt-10 grid md:grid-cols-[1fr_1fr] gap-10 items-center">
          <div className="space-y-6">
            <Field label="Team size" value={size} min={5} max={2000} step={5} onChange={setSize} suffix="people" />
            <Field label="Estimated tool count" value={tools} min={10} max={500} step={5} onChange={setTools} suffix="tools" />
          </div>
          <div className="p-6 border border-ash rounded-[4px]" style={{ background: "#101012" }}>
            <div className="eyebrow">Estimated avoidable spend</div>
            <div className="mt-4 text-[44px] md:text-[56px] font-mono text-copper leading-none">
              ${avoidable.toLocaleString()}
              <span className="text-[16px] text-stone ml-2">/ yr</span>
            </div>
            <div className="mt-3 w-32"><LedgerLine width="100%" /></div>
            <p className="mt-4 text-[13px] text-stone">Based on median cohort data from The State of SaaS Spend 2026.</p>
            <div className="mt-6">
              <CTA to="/contact">Start Free with this estimate</CTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, min, max, step, onChange, suffix,
}: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="eyebrow" htmlFor={label}>{label}</label>
        <span className="font-mono text-bone">{value} <span className="text-stone text-[13px]">{suffix}</span></span>
      </div>
      <input
        id={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[color:var(--copper-ledger)]"
      />
    </div>
  );
}
