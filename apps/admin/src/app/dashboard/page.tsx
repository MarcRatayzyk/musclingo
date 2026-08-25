"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { api } from "@/lib/api";

type Stats = {
  users: number;
  lessons: number;
  published: number;
  completions: number;
  quizResults: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<Stats>("/admin/stats")
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <AdminShell title="Dashboard">
      {error && <p className="text-red-400">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Utilisateurs", stats?.users],
          ["Leçons", stats?.lessons],
          ["Publiées", stats?.published],
          ["Complétions", stats?.completions],
          ["Quiz soumis", stats?.quizResults],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            className="rounded-2xl border border-border bg-surface/70 p-5"
          >
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">
              {value ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
