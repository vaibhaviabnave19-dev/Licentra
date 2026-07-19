import { createFileRoute, Link } from "@tanstack/react-router";
import { CTA } from "@/components/cta";
import { LedgerLine } from "@/components/ledger";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Licentra AI" },
      { name: "description", content: "Why we built Licentra: a system of record for software spend, not another dashboard." },
      { property: "og:title", content: "About — Licentra AI" },
      { property: "og:description", content: "The story behind Licentra AI." },
    ],
  }),
  component: About,
});

const TEAM = [
  { name: "Vaibhavi Abnave", title: "Founder, Licentra", init: "VA" },
];

function About() {
  return (
    <>
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[900px] px-6 pt-24 pb-20">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em] leading-[1.05]">
            The command center for SaaS licenses, subscriptions & spend.
          </h1>
          <div className="mt-14 space-y-8 text-[17px] text-bone/85 leading-[1.7]">
            <p>
              Most companies can't answer a simple question: what software are we actually paying
              for this month? The receipts live in one system, the seats live in another, and the
              renewal calendar lives in someone's head.
            </p>
            <blockquote className="border-l-2 border-copper pl-6 font-serif italic text-[26px] md:text-[30px] text-bone leading-[1.3]">
              "The invoice shouldn't be the first time finance hears about a tool."
            </blockquote>
            <p>
              Licentra is being built as one trustworthy ledger — rebuilt automatically from the
              receipts and login events already flowing through the business. Read-only by default,
              opinionated about what matters, quiet the rest of the time.
            </p>
            <p>
              We're an early-stage team working closely with a small group of design partners. If
              that sounds like your finance or ops team, we'd love to talk.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ash">
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <p className="eyebrow">Founder</p>
          <h2 className="mt-3 font-display text-bone text-[32px]">Who's building it.</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((p) => (
              <div key={p.name}>
                <div className="aspect-square rounded-[4px] border border-ash flex items-center justify-center text-[26px] font-mono text-stone" style={{ background: "var(--slate-panel)" }}>
                  {p.init}
                </div>
                <div className="mt-3 text-[14px] text-bone">{p.name}</div>
                <div className="text-[12px] text-stone">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center">
          <h2 className="font-display text-bone text-[32px] md:text-[40px]">Want to help build it?</h2>
          <div className="mt-4 mx-auto w-[120px]"><LedgerLine /></div>
          <div className="mt-8 flex justify-center gap-4">
            <CTA to="/careers">See open roles</CTA>
            <Link to="/security" className="inline-flex items-center h-11 px-6 border border-ash rounded-[3px] text-bone hover:border-copper text-[15px]">
              Read our security posture
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
