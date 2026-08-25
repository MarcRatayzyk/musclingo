"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { clearToken, getToken } from "@/lib/api";

export function AdminShell({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) router.replace("/login");
  }, [router]);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl gap-8 px-6 py-8">
      <aside className="w-56 shrink-0 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Muscle Mind
          </p>
          <h1 className="mt-1 text-xl font-semibold">Admin</h1>
        </div>
        <nav className="space-y-1 text-sm">
          <Link
            href="/dashboard"
            className="block rounded-xl px-3 py-2 text-muted hover:bg-elevated hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/lessons"
            className="block rounded-xl px-3 py-2 text-muted hover:bg-elevated hover:text-white"
          >
            Leçons
          </Link>
          <button
            type="button"
            onClick={() => {
              clearToken();
              router.push("/login");
            }}
            className="block w-full rounded-xl px-3 py-2 text-left text-muted hover:bg-elevated hover:text-white"
          >
            Déconnexion
          </button>
        </nav>
      </aside>
      <main className="flex-1">
        <h2 className="mb-6 text-3xl font-semibold tracking-tight">{title}</h2>
        {children}
      </main>
    </div>
  );
}
