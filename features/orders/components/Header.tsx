"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto max-w-6xl px-4 sm:px-6 mt-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </header>
  );
}