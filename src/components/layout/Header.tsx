"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Aussie Tax Back home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600 text-sm font-bold text-white">
            ATB
          </span>
          <span className="text-base font-semibold text-slate-950">
            Aussie Tax Back
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-600 sm:flex">
          <Link href="/working-holiday-tax/" className="hover:text-emerald-700">
            Working holiday
          </Link>
          <Link href="/what-can-i-claim-on-tax-australia/" className="hover:text-emerald-700">
            Claims
          </Link>
          <Link href="/tax-return-checklist/" className="hover:text-emerald-700">
            Checklist
          </Link>
          <Link href="/about/" className="hover:text-emerald-700">
            About
          </Link>
          <Link href="/contact/" className="hover:text-emerald-700">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
