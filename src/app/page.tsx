import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  Boxes,
  Eye,
  FolderGit2,
  Gauge,
  MessageSquare,
  MousePointerClick,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { E0Logo, E0Mark } from "@/components/brand/e0-logo";
import { HomeBackground } from "@/components/home/home-background";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const metadata: Metadata = {
  title: "e0 — describe an app, watch it get built",
  description:
    "Type what you want. e0 plans it, writes the code, runs it in a live sandbox, and hands you a URL you can open — no setup, no local install.",
};

const STEPS = [
  {
    icon: MessageSquare,
    title: "Describe it",
    body: "One sentence is enough. “A kanban board with drag and drop.” No specs, no wireframes, no config files.",
  },
  {
    icon: Wand2,
    title: "The agent builds",
    body: "A coding agent plans the work, writes real files, installs packages, and fixes its own errors as it goes.",
  },
  {
    icon: Server,
    title: "It runs live",
    body: "Every build boots in an isolated cloud sandbox. Working software, not a code dump you still have to run.",
  },
  {
    icon: Eye,
    title: "Open and iterate",
    body: "Preview the running app, read every file it wrote, then just reply in chat to change anything.",
  },
];

const PILLARS = [
  {
    icon: Terminal,
    title: "Real code, not a mockup",
    body: "Next.js, TypeScript and Tailwind files you can read, keep, and take with you. Every file the agent touched is browsable in the explorer.",
  },
  {
    icon: Gauge,
    title: "Runs in the background",
    body: "Builds execute as durable background jobs. Close the tab, come back later — the work carries on and nothing is lost mid-step.",
  },
  {
    icon: MousePointerClick,
    title: "Nothing to install",
    body: "No node_modules, no ports, no Docker. The sandbox has already installed and started it by the time you get the link.",
  },
];

const BUILDS = [
  {
    icon: Rocket,
    label: "Landing pages",
    body: "SaaS launches, waitlists, portfolios.",
  },
  {
    icon: Boxes,
    label: "Business tools",
    body: "Invoice generators, CRMs, booking calendars.",
  },
  {
    icon: FolderGit2,
    label: "Productivity apps",
    body: "Todo lists, kanban boards, habit trackers.",
  },
  {
    icon: Sparkles,
    label: "Anything else",
    body: "Games, image editors, dashboards, quizzes.",
  },
];

export default async function LandingPage() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  // Signed-in visitors skip the sign-in wall and go straight to the app.
  const ctaHref = isSignedIn ? "/dashboard" : "/sign-in";
  const ctaLabel = isSignedIn ? "Open e0" : "Start building free";

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden">
      <HomeBackground />

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="pointer-events-auto flex h-12 w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-border/50 bg-background/70 px-4 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-background/50">
          <Link href="/" className="flex items-center">
            <E0Logo />
          </Link>

          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <a href="#why" className="transition-colors hover:text-foreground">
              Why e0
            </a>
            <a
              href="#build"
              className="transition-colors hover:text-foreground"
            >
              What you can build
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button asChild size="sm" className="rounded-full">
              <Link href={ctaHref}>{isSignedIn ? "Open e0" : "Sign in"}</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pb-12 pt-32 text-center sm:pt-40">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            From one sentence to a running app
          </span>

          <h1 className="mt-8 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Describe the app.
            <br className="hidden sm:block" /> Get the running app.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-8 text-muted-foreground">
            e0 turns a plain-English prompt into real Next.js code, boots it in
            a live cloud sandbox, and hands you a URL you can open — in about
            the time it takes to make coffee.
          </p>

          {/* Fake prompt bar: shows the product's one input without shipping it here. */}
          <Link
            href={ctaHref}
            className="group mx-auto mt-10 block w-full max-w-2xl rounded-2xl border border-border/60 bg-card/60 p-4 text-left shadow-sm backdrop-blur-sm transition-colors hover:border-border hover:bg-card/80"
          >
            <span className="block text-muted-foreground">
              Ask e0 to build...
            </span>
            <span className="mt-8 flex items-center justify-between">
              <span className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
                e0 Max
              </span>
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-4" />
              </span>
            </span>
          </Link>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-6 text-base"
            >
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              No install
              <span className="text-border">|</span>
              No credit card
              <span className="text-border">|</span>
              Sign in with Google or GitHub
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border/60 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight">
              Four steps. None of them are setup.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              No repo to clone, no dependencies to install, no dev server to
              start. Type a sentence and watch files appear.
            </p>

            <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(({ icon: Icon, title, body }, index) => (
                <li key={title}>
                  <div className="flex size-10 items-center justify-center rounded-xl border border-primary/40 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-5 text-xs font-medium text-muted-foreground">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pillars */}
        <section id="why" className="border-t border-border/60 py-24">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm"
              >
                <Icon className="size-6 text-primary" />
                <h3 className="mt-6 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What you can build */}
        <section id="build" className="border-t border-border/60 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight">
              What people build with e0.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Anything a small Next.js app can be. Start from a template on the
              home screen or write your own prompt.
            </p>

            <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {BUILDS.map(({ icon: Icon, label, body }) => (
                <div key={label} className="flex gap-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-medium">{label}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-border/60 py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <E0Mark className="mx-auto h-10 w-auto text-primary" />
            <h2 className="mt-8 text-balance text-4xl font-semibold tracking-tight">
              What do you want to create?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              One prompt, one link, one working app. Free to find out.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-10 h-12 rounded-full px-6 text-base"
            >
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <E0Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Describe an app in plain English. Get real code running in a live
              sandbox.
            </p>
          </div>

          <div className="text-sm">
            <p className="font-medium">Product</p>
            <ul className="mt-4 flex flex-col gap-3 text-muted-foreground">
              <li>
                <a href="#how-it-works" className="hover:text-foreground">
                  How it works
                </a>
              </li>
              <li>
                <a href="#why" className="hover:text-foreground">
                  Why e0
                </a>
              </li>
              <li>
                <a href="#build" className="hover:text-foreground">
                  What you can build
                </a>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-medium">Account</p>
            <ul className="mt-4 flex flex-col gap-3 text-muted-foreground">
              <li>
                <Link href={ctaHref} className="hover:text-foreground">
                  {isSignedIn ? "Open e0" : "Sign in"}
                </Link>
              </li>
              <li>
                <Link href={ctaHref} className="hover:text-foreground">
                  {isSignedIn ? "Your projects" : "Start building free"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-medium">Legal</p>
            <ul className="mt-4 flex flex-col gap-3 text-muted-foreground">
              <li>
                <span>Terms of Service</span>
              </li>
              <li>
                <span>Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-6 text-sm text-muted-foreground">
          e0 © {new Date().getFullYear()}
        </div>

        {/* Oversized outlined wordmark */}
        <div className="px-6 pb-8">
          <svg
            aria-hidden
            viewBox="0 0 1200 160"
            className="w-full select-none text-primary"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 30%, transparent 95%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 30%, transparent 95%)",
            }}
          >
            <text
              x="0"
              y="140"
              textLength="1200"
              lengthAdjust="spacingAndGlyphs"
              fontSize="170"
              fontWeight="700"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              opacity="0.85"
            >
              E0 BUILD
            </text>
          </svg>
        </div>
      </footer>
    </div>
  );
}
