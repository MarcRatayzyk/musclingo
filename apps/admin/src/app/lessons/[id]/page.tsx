"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { api } from "@/lib/api";
import { LessonForm } from "../new/page";

type Category = { id: string; name: string };

type AnswerDraft = {
  label: string;
  isCorrect: boolean;
  order?: number;
  matchKey?: string;
};

type QuestionTypeDraft =
  | "SINGLE"
  | "TRUE_FALSE"
  | "MULTI"
  | "ORDER"
  | "MATCH"
  | "TEXT"
  | "HOTSPOT";

type QuestionDraft = {
  type: QuestionTypeDraft;
  prompt: string;
  explanation: string;
  answers: AnswerDraft[];
};

type LessonDetail = {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string | null;
  markdown: string;
  durationSec: number;
  xpReward: number;
  status: string;
  order: number;
  difficulty: string;
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
  tags: string[];
  sources: string[];
  illustrationUrl: string | null;
  quiz: {
    id: string;
    xpReward: number;
    perfectBonusXp: number;
    questions: Array<{
      type: string;
      prompt: string;
      explanation: string;
      order: number;
      answers: Array<{
        label: string;
        isCorrect: boolean;
        order: number;
      }>;
    }>;
  } | null;
};

function emptySingle(): QuestionDraft {
  return {
    type: "SINGLE",
    prompt: "",
    explanation: "",
    answers: [
      { label: "", isCorrect: true },
      { label: "", isCorrect: false },
      { label: "", isCorrect: false },
      { label: "", isCorrect: false },
    ],
  };
}

function emptyTrueFalse(): QuestionDraft {
  return {
    type: "TRUE_FALSE",
    prompt: "",
    explanation: "",
    answers: [
      { label: "Vrai", isCorrect: true },
      { label: "Faux", isCorrect: false },
    ],
  };
}

function toDraft(q: {
  type: string;
  prompt: string;
  explanation: string;
  answers: Array<{
    label: string;
    isCorrect: boolean;
    order: number;
    matchKey?: string | null;
  }>;
}): QuestionDraft {
  if (q.type === "TRUE_FALSE") {
    const isTrue = q.answers.some((a) => a.label === "Vrai" && a.isCorrect);
    return {
      type: "TRUE_FALSE",
      prompt: q.prompt,
      explanation: q.explanation,
      answers: [
        { label: "Vrai", isCorrect: isTrue },
        { label: "Faux", isCorrect: !isTrue },
      ],
    };
  }

  const answers = [...q.answers]
    .sort((a, b) => a.order - b.order)
    .map((a) => ({
      label: a.label,
      isCorrect: a.isCorrect,
      order: a.order,
      matchKey: a.matchKey ?? undefined,
    }));

  if (q.type === "MULTI" || q.type === "ORDER" || q.type === "MATCH") {
    return {
      type: q.type,
      prompt: q.prompt,
      explanation: q.explanation,
      answers,
    };
  }

  if (q.type === "TEXT" || q.type === "HOTSPOT") {
    return {
      type: q.type,
      prompt: q.prompt,
      explanation: q.explanation,
      answers: answers.length ? answers : [{ label: "", isCorrect: true }],
    };
  }

  while (answers.length < 2) {
    answers.push({ label: "", isCorrect: false });
  }
  if (!answers.some((a) => a.isCorrect) && answers[0]) {
    answers[0].isCorrect = true;
  }

  return {
    type: "SINGLE",
    prompt: q.prompt,
    explanation: q.explanation,
    answers,
  };
}

export default function EditLessonPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [tab, setTab] = useState<"lesson" | "quiz">("lesson");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [quizSaved, setQuizSaved] = useState(false);
  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    subtitle: "",
    markdown: "",
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
  const [quizXp, setQuizXp] = useState(40);
  const [perfectBonus, setPerfectBonus] = useState(20);
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    emptySingle(),
    emptyTrueFalse(),
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api<Category[]>("/admin/categories"),
      api<LessonDetail>(`/admin/lessons/${id}`),
    ])
      .then(([cats, lesson]) => {
        setCategories(cats);
        setForm({
          categoryId: lesson.categoryId,
          title: lesson.title,
          subtitle: lesson.subtitle ?? "",
          markdown: lesson.markdown,
          durationSec: lesson.durationSec,
          xpReward: lesson.xpReward,
          status: lesson.status,
          order: lesson.order,
          difficulty: lesson.difficulty,
          checkpointKey: lesson.checkpointKey,
          checkpointTitle: lesson.checkpointTitle,
          checkpointOrder: lesson.checkpointOrder,
          tags: lesson.tags.join(", "),
          sources: lesson.sources.join("\n"),
          illustrationUrl: lesson.illustrationUrl ?? "",
        });
        if (lesson.quiz) {
          setQuizXp(lesson.quiz.xpReward);
          setPerfectBonus(lesson.quiz.perfectBonusXp);
          const drafts = [...lesson.quiz.questions]
            .sort((a, b) => a.order - b.order)
            .map(toDraft);
          setQuestions(drafts.length ? drafts : [emptySingle()]);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api(`/admin/lessons/${id}`, {
        method: "PATCH",
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  function updateQuestion(index: number, next: QuestionDraft) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? next : q)));
  }

  function setQuestionType(index: number, type: QuestionTypeDraft) {
    const current = questions[index];
    if (!current || current.type === type) return;
    if (type === "TRUE_FALSE") {
      updateQuestion(index, {
        ...emptyTrueFalse(),
        prompt: current.prompt,
        explanation: current.explanation,
      });
      return;
    }
    if (type === "MULTI") {
      updateQuestion(index, {
        type: "MULTI",
        prompt: current.prompt,
        explanation: current.explanation,
        answers: [
          { label: "", isCorrect: true },
          { label: "", isCorrect: true },
          { label: "", isCorrect: false },
        ],
      });
      return;
    }
    if (type === "ORDER") {
      updateQuestion(index, {
        type: "ORDER",
        prompt: current.prompt,
        explanation: current.explanation,
        answers: [
          { label: "Étape 1", isCorrect: false, order: 0 },
          { label: "Étape 2", isCorrect: false, order: 1 },
          { label: "Étape 3", isCorrect: false, order: 2 },
        ],
      });
      return;
    }
    if (type === "MATCH") {
      updateQuestion(index, {
        type: "MATCH",
        prompt: current.prompt,
        explanation: current.explanation,
        answers: [
          { label: "Terme A", isCorrect: false, matchKey: "pair-0" },
          { label: "Définition A", isCorrect: false, matchKey: "pair-0" },
          { label: "Terme B", isCorrect: false, matchKey: "pair-1" },
          { label: "Définition B", isCorrect: false, matchKey: "pair-1" },
        ],
      });
      return;
    }
    updateQuestion(index, {
      ...emptySingle(),
      prompt: current.prompt,
      explanation: current.explanation,
      type,
    });
  }

  async function saveQuiz(e: FormEvent) {
    e.preventDefault();
    setQuizError(null);
    setQuizSaved(false);
    try {
      await api("/admin/quizzes", {
        method: "POST",
        body: JSON.stringify({
          lessonId: id,
          xpReward: quizXp,
          perfectBonusXp: perfectBonus,
          questions: questions.map((q, order) => ({
            type: q.type,
            prompt: q.prompt,
            explanation: q.explanation,
            order,
            answers: q.answers.map((a, i) => ({
              label: a.label,
              isCorrect: a.isCorrect,
              order: a.order ?? i,
              matchKey: a.matchKey ?? null,
            })),
          })),
        }),
      });
      setQuizSaved(true);
    } catch (err) {
      setQuizError(err instanceof Error ? err.message : "Erreur quiz");
    }
  }

  async function onDelete() {
    if (!confirm("Supprimer cette leçon ?")) return;
    await api(`/admin/lessons/${id}`, { method: "DELETE" });
    router.push("/lessons");
  }

  if (loading) {
    return (
      <AdminShell title="Éditer la leçon">
        <p className="text-muted">Chargement…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Éditer la leçon">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("lesson")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            tab === "lesson"
              ? "bg-accent text-background"
              : "border border-border text-muted hover:text-white"
          }`}
        >
          Leçon
        </button>
        <button
          type="button"
          onClick={() => setTab("quiz")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            tab === "quiz"
              ? "bg-accent text-background"
              : "border border-border text-muted hover:text-white"
          }`}
        >
          Quiz ({questions.length})
        </button>
      </div>

      {tab === "lesson" ? (
        <>
          <LessonForm
            form={form}
            setForm={setForm}
            categories={categories}
            error={error}
            onSubmit={onSubmit}
            submitLabel="Enregistrer"
          />
          <button
            type="button"
            onClick={onDelete}
            className="mt-10 text-sm text-red-400 hover:underline"
          >
            Supprimer la leçon
          </button>
        </>
      ) : (
        <form onSubmit={saveQuiz} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm text-muted">Neurolift quiz</span>
              <input
                type="number"
                className="w-full rounded-xl border border-border bg-elevated px-4 py-3"
                value={quizXp}
                onChange={(e) => setQuizXp(Number(e.target.value))}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-muted">Bonus parfait</span>
              <input
                type="number"
                className="w-full rounded-xl border border-border bg-elevated px-4 py-3"
                value={perfectBonus}
                onChange={(e) => setPerfectBonus(Number(e.target.value))}
              />
            </label>
          </div>

          {questions.map((q, qi) => (
            <div
              key={qi}
              className="space-y-3 rounded-2xl border border-border bg-surface/60 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-medium text-accent">
                  Question {qi + 1}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className="rounded-xl border border-border bg-elevated px-3 py-2 text-sm"
                    value={q.type}
                    onChange={(e) =>
                      setQuestionType(
                        qi,
                        e.target.value as QuestionTypeDraft,
                      )
                    }
                  >
                    <option value="SINGLE">QCM</option>
                    <option value="TRUE_FALSE">Vrai / Faux</option>
                    <option value="MULTI">Multi-sélection</option>
                    <option value="ORDER">Ordre</option>
                    <option value="MATCH">Association</option>
                    <option value="TEXT">Texte libre</option>
                    <option value="HOTSPOT">Hotspot</option>
                  </select>
                  <button
                    type="button"
                    className="text-sm text-red-400 hover:underline disabled:opacity-40"
                    disabled={questions.length <= 1}
                    onClick={() =>
                      setQuestions((prev) => prev.filter((_, i) => i !== qi))
                    }
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <input
                className="w-full rounded-xl border border-border bg-elevated px-4 py-3"
                placeholder="Question"
                value={q.prompt}
                onChange={(e) =>
                  updateQuestion(qi, { ...q, prompt: e.target.value })
                }
                required
              />
              <textarea
                className="w-full rounded-xl border border-border bg-elevated px-4 py-3"
                placeholder="Explication"
                value={q.explanation}
                onChange={(e) =>
                  updateQuestion(qi, { ...q, explanation: e.target.value })
                }
                required
              />

              {q.type === "TRUE_FALSE" ? (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={q.answers[0]?.isCorrect ?? false}
                    onChange={(e) =>
                      updateQuestion(qi, {
                        ...q,
                        answers: [
                          { label: "Vrai", isCorrect: e.target.checked },
                          { label: "Faux", isCorrect: !e.target.checked },
                        ],
                      })
                    }
                  />
                  La bonne réponse est « Vrai »
                </label>
              ) : q.type === "MULTI" ? (
                <div className="space-y-2">
                  {q.answers.map((a, ai) => (
                    <div key={ai} className="flex items-center gap-2">
                      <input
                        className="flex-1 rounded-xl border border-border bg-elevated px-4 py-2"
                        value={a.label}
                        onChange={(e) => {
                          const next = [...q.answers];
                          next[ai] = { ...a, label: e.target.value };
                          updateQuestion(qi, { ...q, answers: next });
                        }}
                      />
                      <label className="flex shrink-0 items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={a.isCorrect}
                          onChange={(e) => {
                            const next = [...q.answers];
                            next[ai] = { ...a, isCorrect: e.target.checked };
                            updateQuestion(qi, { ...q, answers: next });
                          }}
                        />
                        Correct
                      </label>
                    </div>
                  ))}
                </div>
              ) : q.type === "ORDER" ? (
                <div className="space-y-2">
                  {q.answers.map((a, ai) => (
                    <div key={ai} className="flex items-center gap-2">
                      <span className="w-8 text-sm text-muted">#{ai + 1}</span>
                      <input
                        className="flex-1 rounded-xl border border-border bg-elevated px-4 py-2"
                        value={a.label}
                        onChange={(e) => {
                          const next = [...q.answers];
                          next[ai] = {
                            ...a,
                            label: e.target.value,
                            order: ai,
                          };
                          updateQuestion(qi, { ...q, answers: next });
                        }}
                      />
                    </div>
                  ))}
                  <p className="text-xs text-muted">
                    L&apos;ordre affiché ici est l&apos;ordre correct.
                  </p>
                </div>
              ) : q.type === "MATCH" ? (
                <div className="space-y-2">
                  {q.answers.map((a, ai) => (
                    <div key={ai} className="flex items-center gap-2">
                      <input
                        className="flex-1 rounded-xl border border-border bg-elevated px-4 py-2"
                        value={a.label}
                        onChange={(e) => {
                          const next = [...q.answers];
                          next[ai] = { ...a, label: e.target.value };
                          updateQuestion(qi, { ...q, answers: next });
                        }}
                      />
                      <input
                        className="w-24 rounded-xl border border-border bg-elevated px-2 py-2 text-sm"
                        value={a.matchKey ?? ""}
                        placeholder="pair-0"
                        onChange={(e) => {
                          const next = [...q.answers];
                          next[ai] = { ...a, matchKey: e.target.value };
                          updateQuestion(qi, { ...q, answers: next });
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {q.answers.map((a, ai) => (
                    <div key={ai} className="flex gap-2">
                      <input
                        className="flex-1 rounded-xl border border-border bg-elevated px-4 py-2"
                        value={a.label}
                        onChange={(e) => {
                          const answers = q.answers.map((ans, j) =>
                            j === ai ? { ...ans, label: e.target.value } : ans,
                          );
                          updateQuestion(qi, { ...q, answers });
                        }}
                        required
                      />
                      <label className="flex items-center gap-2 text-sm text-muted">
                        <input
                          type="radio"
                          name={`correct-${qi}`}
                          checked={a.isCorrect}
                          onChange={() =>
                            updateQuestion(qi, {
                              ...q,
                              answers: q.answers.map((ans, j) => ({
                                ...ans,
                                isCorrect: j === ai,
                              })),
                            })
                          }
                        />
                        Correcte
                      </label>
                      <button
                        type="button"
                        className="text-sm text-muted hover:text-red-400 disabled:opacity-40"
                        disabled={q.answers.length <= 2}
                        onClick={() => {
                          const answers = q.answers.filter((_, j) => j !== ai);
                          if (!answers.some((ans) => ans.isCorrect) && answers[0]) {
                            answers[0] = { ...answers[0], isCorrect: true };
                          }
                          updateQuestion(qi, { ...q, answers });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-sm text-accent hover:underline"
                    onClick={() =>
                      updateQuestion(qi, {
                        ...q,
                        answers: [
                          ...q.answers,
                          { label: "", isCorrect: false },
                        ],
                      })
                    }
                  >
                    + Réponse
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-xl border border-border px-4 py-2 text-sm"
              onClick={() => setQuestions((prev) => [...prev, emptySingle()])}
            >
              + QCM
            </button>
            <button
              type="button"
              className="rounded-xl border border-border px-4 py-2 text-sm"
              onClick={() =>
                setQuestions((prev) => [...prev, emptyTrueFalse()])
              }
            >
              + Vrai / Faux
            </button>
          </div>

          {quizError && <p className="text-red-400">{quizError}</p>}
          {quizSaved && (
            <p className="text-accent">Quiz enregistré.</p>
          )}
          <button
            type="submit"
            className="rounded-xl bg-accent px-5 py-3 font-semibold text-background"
          >
            Enregistrer le quiz
          </button>
        </form>
      )}
    </AdminShell>
  );
}
