import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CTA } from "@/components/cta";
import { LedgerLine } from "@/components/ledger";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Licentra AI" },
      { name: "description", content: "Simple pricing tied to what you save. Starter $49, Growth $199, Enterprise custom. Save 20% annually." },
      { property: "og:title", content: "Pricing — Licentra AI" },
      { property: "og:description", content: "Priced against what Licentra identifies. Starter, Growth, Enterprise." },
    ],
  }),
  component: Pricing,
});

const TIERS = [
  {
    name: "Starter",
    priceMonthly: 49,
    desc: "For teams up to 25 people.",
    cta: "Start Free" as const,
    features: [
      "Track unlimited tools — sized for teams monitoring 25–60",
      "Auto-Discovery from email + one accounting integration",
      "Weekly renewal digest",
      "Email support, 1 business day",
    ],
  },
  {
    name: "Growth",
    priceMonthly: 199,
    desc: "For 25–250 people.",
    cta: "Start Free" as const,
    note: "Recommended for growing teams",
    features: [
      "Track unlimited tools — sized for teams monitoring 80–150",
      "All integrations (Ramp, Brex, Mercury, Okta, Google Workspace)",
      "Redundancy Radar + Usage Health Score",
      "Real-time renewal alerts, 45/15/5 day",
      "Slack + email alerts",
      "Shared support channel",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For 250+ with procurement workflows.",
    cta: "Talk to Sales" as const,
    features: [
      "SSO/SAML, SCIM provisioning",
      "Procurement workflow (multi-step approval)",
      "Dedicated CSM + quarterly business review",
      "Custom data residency (US, EU)",
      "Audit log export + custom retention",
    ],
  },
];

const COMPARE = [
  ["Tools tracked", "Unlimited", "Unlimited", "Unlimited"],
  ["Auto-Discovery", "Email + 1 acct.", "All integrations", "All integrations + custom"],
  ["Redundancy Radar", "—", "✓", "✓"],
  ["Usage Health Score", "—", "✓", "✓"],
  ["Spend Forecasting", "Quarterly", "Rolling 12-mo.", "Rolling 12-mo. + custom"],
  ["Renewal alerts", "Weekly digest", "45 / 15 / 5 day", "45 / 15 / 5 day + procurement"],
  ["SSO / SAML", "—", "—", "✓"],
  ["Dedicated CSM", "—", "—", "✓"],
];

const FAQS = [
  {
    q: "Do you prorate mid-cycle?",
    a: "Yes. Plan changes prorate to the day, credited or charged on your next invoice.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Monthly plans cancel at the end of the current cycle with one click. Annual plans cancel at renewal.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You can export the full ledger as CSV or JSON any time. We retain your data for 30 days after cancellation, then purge it.",
  },
  {
    q: "Do you offer a nonprofit or startup discount?",
    a: "Yes — 40% off Growth for pre-seed and seed-stage YC/TechStars companies, and 25% off for registered nonprofits.",
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <>
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-10 text-center">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-4 font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em]">
            Priced against what you'll save.
          </h1>
          <p className="mt-5 text-[17px] text-stone max-w-[560px] mx-auto">
            Every plan pays for itself in month one for the average customer.
          </p>

          <div className="mt-10 inline-flex p-1 rounded-full border border-ash text-[13px]" role="tablist">
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-1.5 rounded-full transition-colors"
              style={{ background: !annual ? "var(--ash)" : "transparent", color: !annual ? "var(--bone)" : "var(--stone)" }}
              role="tab"
              aria-selected={!annual}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-4 py-1.5 rounded-full transition-colors inline-flex items-center gap-2"
              style={{ background: annual ? "var(--ash)" : "transparent", color: annual ? "var(--bone)" : "var(--stone)" }}
              role="tab"
              aria-selected={annual}
            >
              Annual <span className="text-copper font-mono text-[11px]">save 20%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="grid md:grid-cols-3 gap-4">
            {TIERS.map((t) => {
              const priceNum = "priceMonthly" in t && t.priceMonthly
                ? annual
                  ? Math.round(t.priceMonthly * 0.8)
                  : t.priceMonthly
                : null;
              return (
                <div
                  key={t.name}
                  className="p-7 rounded-[4px] border flex flex-col"
                  style={{
                    background: t.highlight ? "#18181a" : "var(--slate-panel)",
                    borderColor: t.highlight ? "var(--copper-ledger)" : "var(--ash)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[15px] text-bone">{t.name}</div>
                    {t.note && <span className="text-[11px] font-mono text-copper">{t.note}</span>}
                  </div>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-[44px] font-mono text-bone leading-none">
                      {priceNum !== null ? `$${priceNum}` : "Custom"}
                    </span>
                    {priceNum !== null && <span className="text-[13px] font-mono text-stone ml-1">/ mo</span>}
                  </div>
                  {priceNum !== null && annual && (
                    <div className="mt-2 text-[12px] font-mono text-stone">billed annually</div>
                  )}
                  <p className="mt-4 text-[14px] text-stone">{t.desc}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14px] text-bone/85">
                        <span className="mt-[9px] w-3 h-px bg-copper flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <CTA to="/contact" className="w-full">{t.cta}</CTA>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-[13px] text-stone">
            <Link to="/security" className="text-copper hover:text-soft-copper">How we handle your data →</Link>
          </p>
        </div>
      </section>

      {/* Compare to doing nothing */}
      <section className="border-b border-ash" style={{ background: "var(--slate-panel)" }}>
        <div className="mx-auto max-w-[1000px] px-6 py-20">
          <p className="eyebrow">Compare to the cost of doing nothing</p>
          <h2 className="mt-3 font-display text-bone text-[28px] md:text-[36px]">The math is uncomfortable.</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            <div className="p-6 border border-ash rounded-[4px]">
              <div className="eyebrow">Licentra Growth</div>
              <div className="mt-3 text-[44px] font-mono text-bone">$2,388<span className="text-[15px] text-stone">/yr</span></div>
              <div className="mt-2 w-24"><LedgerLine /></div>
              <p className="mt-3 text-[13px] text-stone">annual, all-in</p>
            </div>
            <div className="p-6 border border-ash rounded-[4px]" style={{ background: "#101012" }}>
              <div className="eyebrow">Typical avoidable spend</div>
              <div className="mt-3 text-[44px] font-mono text-copper">$74,000<span className="text-[15px] text-stone">/yr</span></div>
              <div className="mt-2 w-24"><LedgerLine /></div>
              <p className="mt-3 text-[13px] text-stone">illustrative model · 100-person team, industry benchmarks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <p className="eyebrow">Compare plans</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="text-left border-b border-ash">
                  <th className="py-3 font-normal text-stone w-1/3"></th>
                  <th className="py-3 font-normal text-bone">Starter</th>
                  <th className="py-3 font-normal text-bone">Growth</th>
                  <th className="py-3 font-normal text-bone">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row[0]} className="border-b border-ash">
                    <td className="py-3.5 text-stone">{row[0]}</td>
                    {row.slice(1).map((v, i) => (
                      <td key={i} className="py-3.5 text-bone font-mono text-[13px]">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section>
      <div className="mx-auto max-w-[820px] px-6 py-24">
        <p className="eyebrow">Billing questions</p>
        <h2 className="mt-3 font-display text-bone text-[32px] md:text-[40px]">Frequently asked.</h2>
        <div className="mt-10 border-t border-ash">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-ash">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-[16px] text-bone">{f.q}</span>
                  <span className="text-copper text-[20px]">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-[15px] text-bone/80 max-w-[640px] fade-in-soft">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
