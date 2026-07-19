import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CTA } from "./cta";

const NAV = [
  { to: "/product", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/customers", label: "Customers" },
  { to: "/resources", label: "Resources" },
];

const COMPANY = [
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/security", label: "Security & Trust" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-[height,background-color,border-color] duration-200"
      style={{
        background: "var(--slate-panel)",
        borderBottom: `1px solid ${scrolled ? "var(--ash)" : "transparent"}`,
        height: scrolled ? 56 : 68,
      }}
    >
      <div className="mx-auto max-w-[1240px] h-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Licentra AI home">
          <LogoMark />
          <span className="font-display text-[17px] tracking-tight text-bone">Licentra<span className="text-copper">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} label={n.label} active={pathname.startsWith(n.to)} />
          ))}
          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              className="px-3 py-2 text-[14px] text-stone hover:text-bone transition-colors"
              aria-haspopup="menu"
              aria-expanded={companyOpen}
              onClick={() => setCompanyOpen((v) => !v)}
            >
              Company
            </button>
            {companyOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full pt-2 w-56"
              >
                <div className="bg-slate-panel border border-ash rounded-[4px] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
                  {COMPANY.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      role="menuitem"
                      className="block px-4 py-3 text-[14px] text-bone hover:bg-ash hover:text-copper transition-colors"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact" className="text-[14px] text-stone hover:text-bone transition-colors">
            Log in
          </Link>
          <CTA to="/contact" className="h-9 px-4 text-[14px]">Start Free</CTA>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-bone"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.25" />
              </>
            ) : (
              <>
                <path d="M3 6h14M3 14h14" stroke="currentColor" strokeWidth="1.25" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-0 top-0 z-40"
          style={{ background: "var(--graphite-black)" }}
        >
          <div className="pt-20 px-6 pb-10 h-full overflow-y-auto flex flex-col">
            <nav className="flex flex-col divide-y divide-ash">
              {[...NAV, ...COMPANY].map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="py-5 text-[22px] font-display text-bone hover:text-copper"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-3">
              <CTA to="/contact">Start Free</CTA>
              <Link to="/contact" className="text-center text-[14px] text-stone py-2">Log in</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-[14px] transition-colors"
      style={{ color: active ? "var(--bone)" : "var(--stone)" }}
    >
      {label}
    </Link>
  );
}

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" stroke="var(--copper-ledger)" />
      <path d="M5 14l4-4 3 3 5-6" stroke="var(--copper-ledger)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="7" r="1.25" fill="var(--copper-ledger)" />
    </svg>
  );
}
