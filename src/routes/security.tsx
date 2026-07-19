import { createFileRoute } from "@tanstack/react-router";
import { CTA } from "@/components/cta";
import { LedgerLine } from "@/components/ledger";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Trust — Licentra AI" },
      { name: "description", content: "How Licentra handles your data. Read-only permissions, plainly explained, plus SOC 2 and GDPR compliance." },
      { property: "og:title", content: "Security & Trust — Licentra AI" },
      { property: "og:description", content: "Read-only permissions, SOC 2, GDPR, and CCPA." },
    ],
  }),
  component: Security,
});

const READS = [
  { t: "Invoice metadata", d: "Vendor name, amount, and date from expense platform exports." },
  { t: "Receipt emails", d: "Only messages matching known billing patterns — filtered before storage." },
  { t: "SSO login events", d: "Which apps your team logs into, and when. Not what they do inside them." },
  { t: "HRIS seat count", d: "Headcount only — used to compute per-seat utilization." },
];

const CANTS = [
  "Move money, initiate charges, or modify billing settings",
  "Change SSO configuration, grant access, or provision users",
  "Read email contents outside our billing filter",
  "Access any customer application on your behalf",
];

function Security() {
  return (
    <>
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[900px] px-6 pt-24 pb-16">
          <p className="eyebrow">Security & Trust</p>
          <h1 className="mt-4 font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em]">
            The short version: we read, we never write.
          </h1>
          <p className="mt-6 text-[17px] text-bone/80 max-w-[620px]">
            Licentra connects to your finance and identity systems using read-only permissions. We can't move money, change access, or touch your workflow — by design.
          </p>
        </div>
      </section>

      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1100px] px-6 py-20 grid md:grid-cols-2 gap-6">
          <div className="p-8 border border-ash rounded-[4px]" style={{ background: "var(--slate-panel)" }}>
            <div className="eyebrow" style={{ color: "var(--moss)" }}>What we read</div>
            <ul className="mt-6 space-y-5">
              {READS.map((r) => (
                <li key={r.t}>
                  <div className="text-[15px] text-bone">{r.t}</div>
                  <div className="mt-1 text-[13px] text-stone leading-[1.6]">{r.d}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 border border-ash rounded-[4px]" style={{ background: "var(--slate-panel)" }}>
            <div className="eyebrow" style={{ color: "var(--clay)" }}>What we can't do</div>
            <ul className="mt-6 space-y-4">
              {CANTS.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] text-bone">
                  <span className="mt-3 w-3 h-px bg-clay flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-ash" style={{ background: "var(--slate-panel)" }}>
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <p className="eyebrow">Compliance</p>
          <h2 className="mt-3 font-display text-bone text-[28px] md:text-[36px]">Certified and audited.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              { l: "SOC 2 Type II", d: "Audited annually by an AICPA-accredited firm." },
              { l: "GDPR", d: "EU DPA available on request. EU data residency on Enterprise." },
              { l: "CCPA", d: "Full data export and deletion on demand within 30 days." },
            ].map((b) => (
              <div key={b.l} className="p-6 border border-ash rounded-[4px]" style={{ background: "#101012" }}>
                <div className="text-[18px] text-bone">{b.l}</div>
                <div className="mt-1 w-8"><LedgerLine /></div>
                <p className="mt-4 text-[13px] text-stone">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center">
          <h2 className="font-display text-bone text-[32px] md:text-[40px]">Still have questions?</h2>
          <p className="mt-4 text-[15px] text-stone">Talk to our security team directly.</p>
          <div className="mt-8"><CTA to="/contact">Talk to Sales</CTA></div>
        </div>
      </section>
    </>
  );
}
