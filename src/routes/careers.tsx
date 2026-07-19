import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Licentra AI" },
      { name: "description", content: "Join Licentra. We're hiring across engineering, design, and go-to-market." },
      { property: "og:title", content: "Careers — Licentra AI" },
      { property: "og:description", content: "Open roles at Licentra AI." },
    ],
  }),
  component: Careers,
});

const VALUES = [
  { t: "Ship clarity, not clutter", d: "Every feature earns its keep or comes out." },
  { t: "Numbers, then adjectives", d: "We persuade with the data. Rhetoric is a garnish." },
  { t: "Read-only by default", d: "The safest system is one that can't do the wrong thing." },
  { t: "Boring finance, exciting engineering", d: "Ledgers are old. Ours are built on modern rails." },
];

const ROLES = [
  { title: "Founding Engineer", team: "Engineering", location: "Remote" },
  { title: "Founding Designer", team: "Design", location: "Remote" },
  { title: "Founding GTM", team: "Go-to-market", location: "Remote" },
];

function Careers() {
  return (
    <>
      <section className="border-b border-ash">
        <div className="mx-auto max-w-[900px] px-6 pt-24 pb-16">
          <p className="eyebrow">Careers</p>
          <h1 className="mt-4 font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em] leading-[1.02]">
            Build the ledger with us.
          </h1>
          <p className="mt-6 text-[17px] text-bone/80 max-w-[560px]">
            Small team. Early product. Working closely with a handful of design partners to build the command center for SaaS licenses, subscriptions, and spend.
          </p>
        </div>
      </section>

      <section className="border-b border-ash" style={{ background: "var(--slate-panel)" }}>
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <p className="eyebrow">How we work</p>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {VALUES.map((v) => (
              <div key={v.t} className="p-6 border border-ash rounded-[4px]" style={{ background: "#101012" }}>
                <div className="font-display text-bone text-[20px]">{v.t}</div>
                <p className="mt-2 text-[14px] text-stone">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1000px] px-6 py-20">
          <p className="eyebrow">Open roles</p>
          <h2 className="mt-3 font-display text-bone text-[32px]">We're hiring.</h2>
          <div className="mt-10 border-t border-ash">
            {ROLES.map((r) => (
              <a
                key={r.title}
                href="#"
                className="flex items-center justify-between py-5 border-b border-ash group"
              >
                <div>
                  <div className="text-[17px] text-bone group-hover:text-copper transition-colors">{r.title}</div>
                  <div className="mt-1 text-[13px] font-mono text-stone">{r.team} · {r.location}</div>
                </div>
                <span className="text-copper text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">Apply →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
