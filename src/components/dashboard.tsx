import { useState } from "react";
import { LedgerLine } from "./ledger";

const TOOLS = [
  { name: "Figma", cost: 540, lastUsed: "2h ago", status: "healthy" },
  { name: "Sketch", cost: 360, lastUsed: "41d ago", status: "duplicate" },
  { name: "Framer", cost: 300, lastUsed: "6d ago", status: "duplicate" },
  { name: "Notion", cost: 480, lastUsed: "1h ago", status: "healthy" },
  { name: "Linear", cost: 420, lastUsed: "12m ago", status: "healthy" },
  { name: "Airtable", cost: 260, lastUsed: "37d ago", status: "underused" },
  { name: "Zoom", cost: 190, lastUsed: "1h ago", status: "healthy" },
];

const NAV = ["Overview", "Tools", "Renewals", "Reports", "Settings"];

const RENEWALS = [
  { name: "Datadog", due: "in 4d", amount: 2400, near: true },
  { name: "Segment", due: "in 12d", amount: 1800, near: false },
  { name: "Notion", due: "in 21d", amount: 480, near: false },
  { name: "AWS", due: "in 28d", amount: 6100, near: false },
];

type Props = {
  /** Which feature region to visually highlight with a subtle copper border. */
  highlight?: "spend" | "table" | "redundancy" | "renewals" | "usage" | null;
  className?: string;
};

export function Dashboard({ highlight = null, className = "" }: Props) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-[6px] overflow-hidden border border-ash shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_30px_60px_-30px_rgba(0,0,0,0.9),0_10px_30px_-10px_rgba(0,0,0,0.6)] ${className}`}
      style={{ background: "var(--slate-panel)" }}
      role="img"
      aria-label="Licentra Ledger dashboard preview"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-ash">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-ash" />
            <span className="w-2.5 h-2.5 rounded-full bg-ash" />
            <span className="w-2.5 h-2.5 rounded-full bg-ash" />
          </div>
          <span className="text-[12px] text-stone font-mono">acme-co / ledger</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 h-7 px-2.5 border border-ash rounded-[3px] min-w-[180px]">
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><circle cx="4" cy="4" r="3" stroke="var(--stone)" fill="none" /><path d="M6.5 6.5L9 9" stroke="var(--stone)" /></svg>
            <span className="text-[11px] text-stone">Search tools, invoices…</span>
            <kbd className="ml-auto text-[10px] font-mono text-stone px-1 border border-ash rounded-[2px]">⌘K</kbd>
          </div>
          <span className="text-[11px] font-mono text-copper">3 renewals this week</span>
        </div>
      </div>

      <div className="grid grid-cols-[160px_1fr]">
        {/* Left rail */}
        <aside className="border-r border-ash py-4">
          {NAV.map((item, i) => {
            const active = i === 0;
            return (
              <div
                key={item}
                className="relative pl-4 pr-3 py-2 text-[13px]"
                style={{ color: active ? "var(--bone)" : "var(--stone)" }}
              >
                {active && <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-copper" />}
                {item}
              </div>
            );
          })}
        </aside>

        {/* Main */}
        <div className="p-5 space-y-5">
          {/* This Month */}
          <section
            className="p-5 rounded-[4px] border transition-colors"
            style={{
              borderColor: highlight === "spend" ? "var(--copper-ledger)" : "var(--ash)",
              background: "#101012",
            }}
          >
            <div className="eyebrow">This month</div>
            <div className="mt-2 flex items-baseline gap-3">
              <div className="text-[38px] font-mono text-bone tracking-tight leading-none">$47,320</div>
            </div>
            <div className="mt-2"><LedgerLine width="120px" /></div>
            <div className="mt-3 text-[13px] font-mono" style={{ color: "var(--clay)" }}>
              +$1,240 vs last month
            </div>
          </section>

          {/* Redundancy */}
          <section
            className="p-4 rounded-[4px] border transition-colors"
            style={{
              borderColor: highlight === "redundancy" ? "var(--copper-ledger)" : "var(--ash)",
              background: "#101012",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="eyebrow">Duplicate tools</div>
                <div className="mt-1 text-[14px] text-bone">
                  3 design tools — potential savings <span className="font-mono text-copper">$1,200/mo</span>
                  {hovered && (
                    <span className="ml-2 text-[12px] font-mono text-stone fade-in-soft">
                      · Sketch + Framer overlap with Figma
                    </span>
                  )}
                </div>
              </div>
              <a href="#" className="text-[12px] text-copper hover:text-soft-copper">Review →</a>
            </div>
          </section>

          {/* Tools table */}
          <section
            className="rounded-[4px] border overflow-hidden transition-colors"
            style={{
              borderColor: highlight === "table" || highlight === "usage" ? "var(--copper-ledger)" : "var(--ash)",
            }}
          >
            <div className="px-4 py-2.5 border-b border-ash flex items-center justify-between" style={{ background: "#101012" }}>
              <span className="eyebrow">Tools</span>
              <span className="text-[11px] font-mono text-stone">{TOOLS.length} of 132</span>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-stone eyebrow" style={{ background: "#101012" }}>
                  <th className="font-normal px-4 py-2">Tool</th>
                  <th className="font-normal px-4 py-2">Cost / mo</th>
                  <th className="font-normal px-4 py-2">Last used</th>
                  <th className="font-normal px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((t, i) => (
                  <tr key={t.name} className={i % 2 ? "" : ""} style={{ background: i % 2 ? "#131315" : "transparent" }}>
                    <td className="px-4 py-2.5 text-bone">{t.name}</td>
                    <td className="px-4 py-2.5 font-mono text-bone">${t.cost}</td>
                    <td className="px-4 py-2.5 font-mono text-stone">{t.lastUsed}</td>
                    <td className="px-4 py-2.5">
                      <StatusPill status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Renewals timeline */}
          <section
            className="p-4 rounded-[4px] border transition-colors"
            style={{
              borderColor: highlight === "renewals" ? "var(--copper-ledger)" : "var(--ash)",
              background: "#101012",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">Upcoming renewals</span>
              <span className="text-[11px] font-mono text-stone">next 30d</span>
            </div>
            <div className="mt-4 relative">
              <div className="h-px w-full bg-ash" />
              <div className="mt-3 grid grid-cols-4 gap-2">
                {RENEWALS.map((r) => (
                  <div key={r.name} className="flex flex-col gap-0.5">
                    <span
                      className="w-2 h-2 rounded-full -mt-5"
                      style={{ background: r.near ? "var(--clay)" : "var(--stone)" }}
                    />
                    <span className="text-[12px] text-bone">{r.name}</span>
                    <span className="text-[11px] font-mono text-stone">${r.amount.toLocaleString()} · {r.due}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    healthy: { label: "In use", color: "var(--moss)" },
    duplicate: { label: "Duplicate", color: "var(--clay)" },
    underused: { label: "Underused", color: "var(--stone)" },
  };
  const s = map[status] ?? map.healthy;
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono" style={{ color: s.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}
