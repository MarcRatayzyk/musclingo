"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { api } from "@/lib/api";

type Category = { id: string; name: string; color: string };

type LessonItem = {
  id: string;
  title: string;
  status: string;
  order: number;
  difficulty: string;
  checkpointTitle: string;
  category: { name: string; color: string };
  quiz: { id: string } | null;
};

export default function LessonsPage() {
  const [items, setItems] = useState<LessonItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const limit = 100;

  useEffect(() => {
    api<Category[]>("/admin/categories")
      .then(setCategories)
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    const qs = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (status) qs.set("status", status);
    if (categoryId) qs.set("categoryId", categoryId);
    api<{ items: LessonItem[]; total: number; pages: number }>(
      `/admin/lessons?${qs}`,
    )
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
        setPages(Math.max(res.pages, 1));
      })
      .catch((e) => setError(e.message));
  }, [status, categoryId, page]);

  return (
    <AdminShell title="Leçons">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            className="rounded-xl border border-border bg-elevated px-3 py-2 text-sm"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border border-border bg-elevated px-3 py-2 text-sm"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Tous les statuts</option>
            <option value="PUBLISHED">Publié</option>
            <option value="DRAFT">Brouillon</option>
          </select>
          <p className="text-sm text-muted">
            {total} leçon{total > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/lessons/new"
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background"
        >
          Nouvelle leçon
        </Link>
      </div>
      {error && <p className="mb-4 text-red-400">{error}</p>}
      <div className="space-y-3">
        {items.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lessons/${lesson.id}`}
            className="flex items-center justify-between rounded-2xl border border-border bg-surface/70 px-5 py-4 transition hover:border-accent/40"
          >
            <div>
              <p className="font-medium">{lesson.title}</p>
              <p className="mt-1 text-sm text-muted">
                <span style={{ color: lesson.category.color }}>
                  {lesson.category.name}
                </span>
                {" · "}
                ordre {lesson.order}
                {" · "}
                {lesson.checkpointTitle}
                {" · "}
                {lesson.difficulty === "BEGINNER"
                  ? "Bases"
                  : lesson.difficulty === "INTERMEDIATE"
                    ? "Intermédiaire"
                    : "Avancé"}
                {" · "}
                {lesson.quiz ? "Quiz lié" : "Sans quiz"}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs ${
                lesson.status === "PUBLISHED"
                  ? "bg-accent/15 text-accent"
                  : "bg-white/5 text-muted"
              }`}
            >
              {lesson.status}
            </span>
          </Link>
        ))}
        {!error && items.length === 0 && (
          <p className="text-sm text-muted">Aucune leçon pour ces filtres.</p>
        )}
      </div>
      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border border-border px-4 py-2 text-sm disabled:opacity-40"
          >
            Précédent
          </button>
          <span className="text-sm text-muted">
            Page {page} / {pages}
          </span>
          <button
            type="button"
            disabled={page >= pages}
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            className="rounded-xl border border-border px-4 py-2 text-sm disabled:opacity-40"
          >
            Suivant
          </button>
        </div>
      )}
    </AdminShell>
  );
}
