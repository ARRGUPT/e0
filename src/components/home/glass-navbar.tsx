"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { E0Logo } from "@/components/brand/e0-logo";
import { ModeToggle } from "../ui/mode-toggle";

export function GlassNavbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="pointer-events-auto flex h-12 w-full max-w-3xl items-center justify-between rounded-full border border-border/50 bg-background/70 px-4 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-background/50">
        <Link href="/dashboard" className="flex items-center">
          <E0Logo className="gap-2" />
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
