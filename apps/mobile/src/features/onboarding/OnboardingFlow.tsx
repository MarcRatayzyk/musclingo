import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { useMe, useUpdatePreferredCategory } from "@/features/auth/api";
import { useCategories } from "@/features/home/api";
import { markAnatomyOnboardingSeen } from "@/features/mascot";
import { useCategoryPath } from "@/features/path/api";
import { OnboardingContainer } from "./components/OnboardingContainer";
import { recommendPath } from "./recommend";
import { useOnboardingStore } from "./store";
import { GoalStep } from "./steps/GoalStep";
import { MotivationStep } from "./steps/MotivationStep";
import { PersonalizationStep } from "./steps/PersonalizationStep";
import { PriorityStep } from "./steps/PriorityStep";
import { WelcomeStep } from "./steps/WelcomeStep";
import { ONBOARDING_STEPS, type PathSlug } from "./types";

export function OnboardingFlow() {
  const { data: me, isLoading: meLoading } = useMe();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const updatePreferred = useUpdatePreferredCategory();

  const stepIndex = useOnboardingStore((s) => s.stepIndex);
  const answers = useOnboardingStore((s) => s.answers);
  const goNext = useOnboardingStore((s) => s.goNext);
  const goBack = useOnboardingStore((s) => s.goBack);
  const toggleMotivation = useOnboardingStore((s) => s.toggleMotivation);
  const setPreferredPath = useOnboardingStore((s) => s.setPreferredPath);
  const setStreakGoalDays = useOnboardingStore((s) => s.setStreakGoalDays);
  const applyRecommendation = useOnboardingStore((s) => s.applyRecommendation);
  const persist = useOnboardingStore((s) => s.persist);
  const complete = useOnboardingStore((s) => s.complete);
  const setStepIndex = useOnboardingStore((s) => s.setStepIndex);

  const stepId = ONBOARDING_STEPS[stepIndex] ?? "welcome";
  const recommended = useMemo(() => recommendPath(answers), [answers]);
  const selectedPath = (answers.preferredPath ?? recommended) as PathSlug;

  const categoryMeta = useMemo(
    () => categories?.find((c) => c.slug === selectedPath) ?? null,
    [categories, selectedPath],
  );
  const categoryId = categoryMeta?.id ?? null;

  const shouldLoadPath = stepId === "personalization" && !!categoryId;
  const {
    data: path,
    isLoading: pathLoading,
    isError: pathError,
  } = useCategoryPath(shouldLoadPath ? categoryId! : "");

  const firstLesson = useMemo(() => {
    if (!path) return null;
    const lessons = path.units.flatMap((u) => u.lessons);
    return (
      lessons.find((l) => l.state === "available") ??
      lessons.find((l) => l.state === "completed") ??
      lessons[0] ??
      null
    );
  }, [path]);

  const pathChapters = useMemo(() => {
    if (!path?.units.length) return undefined;
    return path.units.slice(0, 5).map((unit, index) => ({
      id: unit.checkpointKey,
      title: unit.label,
      unlocked: index < 2,
    }));
  }, [path]);

  const [finishing, setFinishing] = useState(false);
  const [finishError, setFinishError] = useState<string | null>(null);
  const [onboardingFinalized, setOnboardingFinalized] = useState(false);
  const finalizedRef = useRef(false);

  useEffect(() => {
    // Force clamp (évite un ancien index “firstLesson” en mémoire HMR).
    if (stepIndex > ONBOARDING_STEPS.length - 1) {
      setStepIndex(ONBOARDING_STEPS.length - 1);
    }
  }, [stepIndex, setStepIndex]);

  useEffect(() => {
    if (stepId !== "priority") return;
    applyRecommendation();
  }, [stepId, applyRecommendation]);

  // Déjà onboardé (hors écran final) → accueil classique.
  if (
    !meLoading &&
    me?.preferredCategory &&
    !finishing &&
    stepId !== "personalization"
  ) {
    return <Redirect href="/(app)/home" />;
  }

  if (meLoading || categoriesLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#7CFFB2" />
        <Text className="mt-3 text-sm text-muted">Préparation…</Text>
      </View>
    );
  }

  function advance() {
    persist();
    goNext();
  }

  /** Finalise l’onboarding (préférences + catégorie) sans quitter l’écran. */
  function finalizeOnboarding() {
    if (finalizedRef.current) return;
    if (!categoryId) return;
    finalizedRef.current = true;
    complete();
    if (selectedPath === "anatomie") {
      markAnatomyOnboardingSeen();
    }
    updatePreferred.mutate(categoryId, {
      onSuccess: () => {
        setOnboardingFinalized(true);
      },
      onError: () => {
        finalizedRef.current = false;
        setFinishError("Impossible d’enregistrer ton parcours.");
      },
    });
  }

  function goToLesson() {
    if (!firstLesson) {
      setFinishError("Aucune leçon disponible pour ce parcours.");
      return;
    }
    setFinishing(true);
    const navigate = () => {
      router.replace(`/(app)/lesson/${firstLesson.id}`);
    };
    if (onboardingFinalized || me?.preferredCategory) {
      navigate();
      return;
    }
    if (!categoryId) {
      setFinishError("Parcours introuvable.");
      setFinishing(false);
      return;
    }
    complete();
    if (selectedPath === "anatomie") markAnatomyOnboardingSeen();
    updatePreferred.mutate(categoryId, {
      onSuccess: navigate,
      onError: (err) => {
        setFinishing(false);
        setFinishError(
          err instanceof Error
            ? err.message
            : "Impossible d’enregistrer ton parcours.",
        );
      },
    });
  }

  function goToHome() {
    setFinishing(true);
    const navigate = () => router.replace("/(app)/home");
    if (onboardingFinalized || me?.preferredCategory) {
      navigate();
      return;
    }
    if (!categoryId) {
      navigate();
      return;
    }
    complete();
    if (selectedPath === "anatomie") markAnatomyOnboardingSeen();
    updatePreferred.mutate(categoryId, {
      onSuccess: navigate,
      onError: () => navigate(),
    });
  }

  const showProgress = stepId !== "welcome";

  return (
    <OnboardingContainer
      stepIndex={stepIndex}
      totalSteps={ONBOARDING_STEPS.length}
      onBack={
        stepIndex > 0 && !finishing && stepId !== "personalization"
          ? goBack
          : undefined
      }
      showProgress={showProgress}
    >
      {stepId === "welcome" ? (
        <WelcomeStep onContinue={advance} />
      ) : null}

      {stepId === "motivation" ? (
        <MotivationStep
          selected={answers.motivations}
          onToggle={toggleMotivation}
          onContinue={advance}
        />
      ) : null}

      {stepId === "priority" ? (
        <PriorityStep
          selected={answers.preferredPath}
          recommended={recommended}
          onSelect={setPreferredPath}
          onContinue={advance}
        />
      ) : null}

      {stepId === "goal" ? (
        <GoalStep
          selected={answers.streakGoalDays}
          onSelect={setStreakGoalDays}
          onContinue={advance}
        />
      ) : null}

      {stepId === "personalization" ? (
        <PersonalizationStep
          path={selectedPath}
          chaptersFromApi={pathChapters}
          lessonTitle={
            firstLesson?.title ??
            (pathLoading
              ? "Chargement de ta leçon…"
              : "Comment fonctionne un muscle ?")
          }
          durationSec={firstLesson?.durationSec ?? 180}
          xpReward={firstLesson?.xpReward ?? 20}
          accentColor={categoryMeta?.color ?? path?.color}
          loading={pathLoading || finishing || updatePreferred.isPending}
          error={
            finishError ??
            (pathError ? "Impossible de charger ta première leçon." : null)
          }
          onReady={finalizeOnboarding}
          onStartLesson={goToLesson}
          onGoHome={goToHome}
        />
      ) : null}
    </OnboardingContainer>
  );
}
