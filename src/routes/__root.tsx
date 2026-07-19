import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/site-nav";
import { SiteFooter } from "../components/site-footer";
import { CTA } from "../components/cta";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-[40px] font-display text-bone">Page not found</h1>
        <p className="mt-3 text-[15px] text-stone">
          This URL isn't on the ledger. Head back home.
        </p>
        <div className="mt-8">
          <CTA to="/">Back to home</CTA>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something broke</p>
        <h1 className="mt-3 text-[32px] font-display text-bone">This page didn't load</h1>
        <p className="mt-3 text-[15px] text-stone">
          Try again — if it keeps failing, head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center h-11 px-6 rounded-[3px] border border-ash text-bone hover:border-copper text-[15px]"
          >
            Try again
          </button>
          <CTA to="/">Go home</CTA>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0C0C0D" },
      { title: "Licentra | SaaS License & Subscription Management" },
      {
        name: "description",
        content:
          "Licentra centralizes SaaS licenses, subscriptions, renewals, and spend in one platform. Discover apps, reduce waste, and optimize software costs.",
      },
      { name: "author", content: "Licentra" },
      { property: "og:title", content: "Licentra | SaaS License & Subscription Management" },
      {
        property: "og:description",
        content:
          "Licentra centralizes SaaS licenses, subscriptions, renewals, and spend in one platform. Discover apps, reduce waste, and optimize software costs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@licentra" },
      { name: "twitter:title", content: "Licentra | SaaS License & Subscription Management" },
      { name: "twitter:description", content: "Licentra centralizes SaaS licenses, subscriptions, renewals, and spend in one platform. Discover apps, reduce waste, and optimize software costs." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/da861ade-12a3-40d8-8923-eee9a6d93880/id-preview-3df74bba--81413991-3486-44ab-b118-c8e6bf40d39a.lovable.app-1784451473418.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/da861ade-12a3-40d8-8923-eee9a6d93880/id-preview-3df74bba--81413991-3486-44ab-b118-c8e6bf40d39a.lovable.app-1784451473418.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://api.fontshare.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-copper focus:text-graphite focus:px-3 focus:py-2 focus:rounded-[3px]">
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="pt-[68px]">
        <Outlet />
      </main>
      <SiteFooter />
      <ChatBubble />
    </QueryClientProvider>
  );
}

function ChatBubble() {
  return (
    <Link
      to="/contact"
      aria-label="Chat with us"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 h-11 px-4 rounded-full border border-ash bg-slate-panel text-bone text-[13px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] hover:border-copper transition-colors"
    >
      <span className="w-2 h-2 rounded-full bg-moss" />
      Chat with us
    </Link>
  );
}
