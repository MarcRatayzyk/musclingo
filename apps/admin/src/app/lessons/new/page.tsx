"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import {
  Category,
  LessonForm,
  LessonFormState,
} from "@/components/lesson-form";
import { api } from "@/lib/api";

export default function NewLessonPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<LessonFormState>({
    categoryId: "",
    title: "",
    subtitle: "",
    markdown: "# Titre\n\nContenu…",
    durationSec: 90,
    xpReward: 25,
    status: "DRAFT",
    order: 0,
    difficulty: "BEGINNER",
    checkpointKey: "bases",
    checkpointTitle: "Bases",
    checkpointOrder: 0,
    tags: "",
    sources: "",
    illustrationUrl: "",
  });

  useEffect(() => {
    api<Category[]>("/admin/categories").then((cats) => {
      setCategories(cats);
      if (cats[0]) setForm((f) => ({ ...f, categoryId: cats[0]!.id }));
    });
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const lesson = await api<{ id: string }>("/admin/lessons", {
        method: "POST",
        body: JSON.stringify({
          categoryId: form.categoryId,
          title: form.title,
          subtitle: form.subtitle || undefined,
          markdown: form.markdown,
          durationSec: Number(form.durationSec),
          xpReward: Number(form.xpReward),
          status: form.status,
          order: Number(form.order),
          difficulty: form.difficulty,
          checkpointKey: form.checkpointKey,
          checkpointTitle: form.checkpointTitle,
          checkpointOrder: Number(form.checkpointOrder),
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          sources: form.sources
            .split("\n")
            .map((t) => t.trim())
            .filter(Boolean),
          illustrationUrl: form.illustrationUrl || null,
        }),
      });
      router.push(`/lessons/${lesson.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  return (
    <AdminShell title="Nouvelle leçon">
      <LessonForm
        form={form}
        setForm={setForm}
        categories={categories}
        error={error}
        onSubmit={onSubmit}
        submitLabel="Créer"
      />
    </AdminShell>
  );
}
