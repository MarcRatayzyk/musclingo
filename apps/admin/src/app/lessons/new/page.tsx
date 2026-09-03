import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { MarkdownPreview } from "@/components/markdown-preview";
import { api, apiUpload, mediaUrl } from "@/lib/api";

type Category = { id: string; name: string };

type LessonFormState = {
  categoryId: string;
  title: string;
  subtitle: string;
  markdown: string;
  durationSec: number;
  xpReward: number;
  status: string;
  order: number;
  difficulty: string;
  checkpointKey: string;
  checkpointTitle: string;
  checkpointOrder: number;
  tags: string;
  sources: string;
  illustrationUrl: string;
};

const LESSON_JSON_EXAMPLE = `{
  "markdown": "# Les muscles de l'avant-bras\\n\\nL'avant-bras contient des muscles qui permettent les mouvements du poignet et des doigts.\\n\\n## Les fléchisseurs\\n\\nIls se situent principalement sur la face antérieure de l'avant-bras.\\n\\n- Fléchisseur radial du carpe\\n- Fléchisseur ulnaire du carpe\\n- Long palmaire\\n\\n---\\n\\n## Les extenseurs\\n\\nIls se trouvent principalement sur la face postérieure.\\n\\n> À retenir : les fléchisseurs ferment le poignet et les extenseurs l'ouvrent."
}`;

function parseLessonMarkdownJson(raw: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("JSON invalide — vérifie les virgules et les guillemets.");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Attendu : un objet JSON décrivant une leçon.");
  }

  const markdown = (parsed as Record<string, unknown>).markdown;
  if (typeof markdown !== "string" || !markdown.trim()) {
    throw new Error('Le champ "markdown" est obligatoire.');
  }

  return markdown;
}

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

export function LessonForm({
  form,
  setForm,
  categories,
  error,
  onSubmit,
  submitLabel,
}: {
  form: LessonFormState;
  setForm: Dispatch<SetStateAction<LessonFormState>>;
  categories: Category[];
  error: string | null;
  onSubmit: (e: FormEvent) => void;
  submitLabel: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [jsonImportOpen, setJsonImportOpen] = useState(false);
  const [jsonImportText, setJsonImportText] = useState(LESSON_JSON_EXAMPLE);
  const [jsonImportError, setJsonImportError] = useState<string | null>(null);
  const [jsonImportOk, setJsonImportOk] = useState(false);
  const preview = mediaUrl(form.illustrationUrl);

  function importLessonFromJson() {
    setJsonImportError(null);
    setJsonImportOk(false);
    try {
      setForm({ ...form, markdown: parseLessonMarkdownJson(jsonImportText) });
      setJsonImportOk(true);
    } catch (err) {
      setJsonImportError(
        err instanceof Error ? err.message : "Import JSON impossible",
      );
    }
  }

  async function onImageSelected(file: File | undefined) {
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const res = await apiUpload<{ url: string }>("/admin/uploads", file);
      setForm({ ...form, illustrationUrl: res.url });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload impossible");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface/60 p-5">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 text-left"
          onClick={() => setJsonImportOpen((open) => !open)}
        >
          <div>
            <p className="font-medium text-accent">
              Import JSON du texte de la leçon
            </p>
            <p className="mt-1 text-sm text-muted">
              Colle le contenu Markdown sans modifier les autres champs.
            </p>
          </div>
          <span className="shrink-0 text-sm text-muted">
            {jsonImportOpen ? "Masquer" : "Afficher"}
          </span>
        </button>

        {jsonImportOpen && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-muted">
              Format attendu :
              <code className="ml-1 text-white/80">
                {`{ "markdown": "# Titre\\n\\nContenu..." }`}
              </code>
            </p>
            <textarea
              rows={20}
              className="field font-mono text-sm"
              value={jsonImportText}
              onChange={(e) => {
                setJsonImportText(e.target.value);
                setJsonImportError(null);
                setJsonImportOk(false);
              }}
              spellCheck={false}
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-xl border border-border px-4 py-2 text-sm"
                onClick={() => {
                  setJsonImportText(LESSON_JSON_EXAMPLE);
                  setJsonImportError(null);
                  setJsonImportOk(false);
                }}
              >
                Charger l&apos;exemple
              </button>
              <button
                type="button"
                className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background"
                onClick={importLessonFromJson}
              >
                Importer le texte
              </button>
            </div>
            {jsonImportError && (
              <p className="text-sm text-red-400">{jsonImportError}</p>
            )}
            {jsonImportOk && (
              <p className="text-sm text-accent">
                Le texte Markdown a été importé. Vérifie-le puis enregistre.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Titre">
          <input
            required
            className="field"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <Field label="Catégorie">
          <select
            className="field"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Sous-titre">
        <input
          className="field"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />
      </Field>
      <Field label="Illustration (entre le titre et le paragraphe)">
        <div className="space-y-3">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="block w-full text-sm text-muted file:mr-4 file:rounded-xl file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-background"
            disabled={uploading}
            onChange={(e) => onImageSelected(e.target.files?.[0])}
          />
          {uploading && <p className="text-sm text-muted">Upload en cours…</p>}
          {uploadError && <p className="text-sm text-red-400">{uploadError}</p>}
          {preview ? (
            <div className="space-y-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Illustration de la leçon"
                className="max-h-56 w-full rounded-2xl border border-border object-cover"
              />
              <button
                type="button"
                className="text-sm text-red-400 hover:underline"
                onClick={() => setForm({ ...form, illustrationUrl: "" })}
              >
                Retirer l&apos;image
              </button>
            </div>
          ) : (
            <p className="text-sm text-muted">
              Aucune image — elle s&apos;affichera sous le titre de la leçon.
            </p>
          )}
        </div>
      </Field>
      <Field label="Markdown">
        <textarea
          required
          rows={12}
          className="field font-mono text-sm"
          value={form.markdown}
          onChange={(e) => setForm({ ...form, markdown: e.target.value })}
        />
      </Field>
      <div className="rounded-2xl border border-border bg-elevated/50 p-4">
        <p className="mb-2 text-sm text-muted">
          Prévisualisation (comme dans l&apos;app — séparateurs ---)
        </p>
        <MarkdownPreview markdown={form.markdown} />
      </div>
      <p className="rounded-xl border border-border bg-elevated/40 px-4 py-3 text-sm text-muted">
        Le déblocage suit l&apos;ordre dans la catégorie ; quiz ≥ 70 % requis
        pour débloquer la leçon suivante. Les checkpoints regroupent les
        leçons sur le chemin.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Field label="Ordre (chemin)">
          <input
            type="number"
            min={0}
            className="field"
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Difficulté">
          <select
            className="field"
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
          >
            <option value="BEGINNER">Bases</option>
            <option value="INTERMEDIATE">Intermédiaire</option>
            <option value="ADVANCED">Avancé</option>
          </select>
        </Field>
        <Field label="Durée (s)">
          <input
            type="number"
            className="field"
            value={form.durationSec}
            onChange={(e) =>
              setForm({ ...form, durationSec: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Neurolift">
          <input
            type="number"
            className="field"
            value={form.xpReward}
            onChange={(e) =>
              setForm({ ...form, xpReward: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Statut">
          <select
            className="field"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="DRAFT">Brouillon</option>
            <option value="PUBLISHED">Publié</option>
          </select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Checkpoint (clé)">
          <input
            required
            className="field"
            value={form.checkpointKey}
            onChange={(e) =>
              setForm({ ...form, checkpointKey: e.target.value })
            }
            placeholder="muscles-haut"
          />
        </Field>
        <Field label="Checkpoint (titre)">
          <input
            required
            className="field"
            value={form.checkpointTitle}
            onChange={(e) =>
              setForm({ ...form, checkpointTitle: e.target.value })
            }
            placeholder="Muscles du haut du corps"
          />
        </Field>
        <Field label="Ordre checkpoint">
          <input
            type="number"
            min={0}
            className="field"
            value={form.checkpointOrder}
            onChange={(e) =>
              setForm({ ...form, checkpointOrder: Number(e.target.value) })
            }
          />
        </Field>
      </div>
      <Field label="Tags (virgules)">
        <input
          className="field"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
      </Field>
      <Field label="Sources (une par ligne)">
        <textarea
          rows={3}
          className="field"
          value={form.sources}
          onChange={(e) => setForm({ ...form, sources: e.target.value })}
        />
      </Field>
      {error && <p className="text-red-400">{error}</p>}
      <button
        type="submit"
        className="rounded-xl bg-accent px-5 py-3 font-semibold text-background"
      >
        {submitLabel}
      </button>
      <style jsx global>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #2a3344;
          background: #1c2230;
          padding: 0.75rem 1rem;
          outline: none;
        }
        .field:focus {
          box-shadow: 0 0 0 2px #7cffb2;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-muted">{label}</span>
      {children}
    </label>
  );
}
