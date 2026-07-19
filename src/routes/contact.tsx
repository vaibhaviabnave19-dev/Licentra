import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTA } from "@/components/cta";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Licentra AI" },
      { name: "description", content: "Talk to sales or start free. Response within 1 business day." },
      { property: "og:title", content: "Contact — Licentra AI" },
      { property: "og:description", content: "Talk to sales or start free." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [selfSent, setSelfSent] = useState(false);
  return (
    <section>
      <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-24 grid lg:grid-cols-[1fr_460px] gap-16">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 font-display text-bone text-[40px] md:text-[56px] tracking-[-0.02em]">
            Talk to us.
          </h1>
          <p className="mt-5 text-[17px] text-bone/80 max-w-[520px]">
            For evaluations, procurement, or a walkthrough with our team.
          </p>
          <p className="mt-3 text-[13px] font-mono text-stone">
            Response within 1 business day.
          </p>

          <form
            className="mt-10 space-y-5 max-w-[520px]"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <Field id="name" label="Name" />
            <Field id="email" label="Work Email" type="email" />
            <Field id="company" label="Company" />
            <div>
              <label htmlFor="size" className="eyebrow block mb-2">Company size</label>
              <select
                id="size"
                className="w-full h-11 px-3 border border-ash rounded-[3px] bg-transparent text-bone text-[15px] focus:border-copper outline-none"
              >
                <option>1–25</option>
                <option>25–100</option>
                <option>100–500</option>
                <option>500+</option>
              </select>
            </div>
            <div>
              <label htmlFor="msg" className="eyebrow block mb-2">Message</label>
              <textarea
                id="msg"
                rows={4}
                className="w-full px-3 py-2.5 border border-ash rounded-[3px] bg-transparent text-bone text-[15px] focus:border-copper outline-none resize-none"
              />
            </div>
            <div className="pt-2">
              <CTA type="submit">{sent ? "Thanks — we'll be in touch" : "Talk to Sales"}</CTA>
            </div>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="p-6 border border-ash rounded-[4px]" style={{ background: "var(--slate-panel)" }}>
            <div className="eyebrow">Book directly</div>
            <div className="mt-4 border border-ash rounded-[3px] p-4" style={{ background: "#101012" }}>
              <CalendarPreview />
            </div>
            <p className="mt-4 text-[13px] text-stone">
              30-minute walkthrough with a solutions engineer. No slides.
            </p>
          </div>

          <div className="p-6 border border-ash rounded-[4px]" style={{ background: "var(--slate-panel)" }}>
            <div className="eyebrow">Just want to try it?</div>
            <p className="mt-3 text-[14px] text-bone/80">Skip the call. Start with two fields.</p>
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSelfSent(true);
              }}
            >
              <input
                type="email"
                placeholder="you@company.com"
                required
                className="w-full h-10 px-3 bg-transparent border border-ash rounded-[3px] text-bone text-[14px] focus:border-copper outline-none"
              />
              <input
                type="text"
                placeholder="Company name"
                required
                className="w-full h-10 px-3 bg-transparent border border-ash rounded-[3px] text-bone text-[14px] focus:border-copper outline-none"
              />
              <CTA type="submit" className="w-full">
                {selfSent ? "Check your inbox" : "Start Free"}
              </CTA>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block mb-2">{label}</label>
      <input
        id={id}
        type={type}
        required
        className="w-full h-11 px-3 border border-ash rounded-[3px] bg-transparent text-bone text-[15px] focus:border-copper outline-none"
      />
    </div>
  );
}

function CalendarPreview() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <div>
      <div className="flex items-center justify-between text-[12px] font-mono text-stone">
        <span>July 2026</span>
        <span>10:30 AM PT</span>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {days.map((d, i) => (
          <button
            key={d}
            className="p-2 rounded-[3px] border text-center transition-colors"
            style={{
              borderColor: i === 2 ? "var(--copper-ledger)" : "var(--ash)",
              background: i === 2 ? "#18181a" : "transparent",
            }}
          >
            <div className="text-[11px] font-mono text-stone">{d}</div>
            <div className="mt-1 text-[15px] text-bone">{20 + i}</div>
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        {["9:00", "10:30", "13:00", "15:30"].map((t, i) => (
          <div
            key={t}
            className="flex items-center justify-between px-3 py-2 border rounded-[3px] text-[13px] font-mono"
            style={{
              borderColor: i === 1 ? "var(--copper-ledger)" : "var(--ash)",
              color: i === 1 ? "var(--copper-ledger)" : "var(--bone)",
            }}
          >
            <span>{t}</span>
            <span className="text-stone">30m</span>
          </div>
        ))}
      </div>
    </div>
  );
}
