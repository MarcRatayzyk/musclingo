import { useEffect, useMemo, useRef, useState } from "react";
import { Redirect, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useMe, useUpdateLocale, useUpdatePreferredCategory } from "@/features/auth/api";
import { useCategories } from "@/features/home/api";
import { useCategoryPath } from "@/features/path/api";
import { setAppLocale } from "@/i18n";
import type { AppLocale } from "@/i18n/localeStorage";
import { activateDemoSub } from "@/features/retention/storage";
import { OnboardingContainer } from "./components/OnboardingContainer";
import {
  OnboardingErrorState,
  OnboardingLoadingState,
} from "./components/OnboardingStates";
import { recommendPath } from "./recommend";
import { useOnboardingStore } from "./store";
import { AmplifyStep } from "./steps/AmplifyStep";
import { LanguageStep } from "./steps/LanguageStep";
import { PainStep } from "./steps/PainStep";
import { PaywallStep } from "./steps/PaywallStep";
import { PersonalizeStep } from "./steps/PersonalizeStep";
import { PositioningStep } from "./steps/PositioningStep";
import { PreviewStep } from "./steps/PreviewStep";
import { ValueStep } from "./steps/ValueStep";
import {
  trackOnboardingCompleted,
  trackOnboardingQuestionAnswered,
  trackPaywallCta,
  trackSubscriptionStarted,
  useOnboardingScreenTracking,
} from "./useOnboardingAnalytics";
import { useOnboardingFonts } from "./useOnboardingFonts";
import { ONBOARDING_STEPS, type MotivationId, type PathSlug } from "./types";

export function OnboardingFlow() {
  const { t } = useTranslation("onboarding");
  const fontsLoaded = useOnboardingFonts();
  const { data: me, isLoading: meLoading, refetch: refetchMe } = useMe();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useCategories();
  const updatePreferred = useUpdatePreferredCategory();
  const updateLocale = useUpdateLocale();

  const stepIndex = useOnboardingStore((s) => s.stepIndex);
  const answers = useOnboardingStore((s) => s.answers);
  const goNext = useOnboardingStore((s) => s.goNext);
  const goBack = useOnboardingStore((s) => s.goBack);
  const setLocale = useOnboardingStore((s) => s.setLocale);
  const setPrimaryBlocker = useOnboardingStore((s) => s.setPrimaryBlocker);
  const applyRecommendation = useOnboardingStore((s) => s.applyRecommendation);
  const persist = useOnboardingStore((s) => s.persist);
  const complete = useOnboardingStore((s) => s.complete);
  const setStepIndex = useOnboardingStore((s) => s.setStepIndex);

  const stepId = ONBOARDING_STEPS[stepIndex] ?? "language";
  useOnboardingScreenTracking(stepId);

  const primaryBlocker: MotivationId | undefined = answers.motivations[0];
  const recommended = useMemo(() => recommendPath(answers), [answers]);
  const selectedPath = (answers.preferredPath ?? recommended) as PathSlug;

  const categoryMeta = useMemo(
    () => categories?.find((c) => c.slug === selectedPath) ?? null,
    [categories, selectedPath],
  );
  const categoryId = categoryMeta?.id ?? null;

  const needsPath =
    (stepId === "preview" || stepId === "paywall" || stepId === "value") &&
    !!categoryId;
  const {
    data: path,
    isLoading: pathLoading,
    isError: pathError,
    refetch: refetchPath,
  } = useCategoryPath(needsPath ? categoryId! : "");

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
      unlocked: index === 0,
    }));
  }, [path]);

  const [finishing, setFinishing] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [finishError, setFinishError] = useState<string | null>(null);
  const [onboardingFinalized, setOnboardingFinalized] = useState(false);
  const finalizedRef = useRef(false);

  useEffect(() => {
    if (stepIndex > ONBOARDING_STEPS.length - 1) {
      setStepIndex(ONBOARDING_STEPS.length - 1);
    }
  }, [stepIndex, setStepIndex]);

  useEffect(() => {
    if (stepId !== "value" && stepId !== "preview") return;
    applyRecommendation();
  }, [stepId, applyRecommendation]);

  if (
    !meLoading &&
    me?.preferredCategory &&
    !finishing &&
    stepId !== "value" &&
    stepId !== "preview" &&
    stepId !== "paywall"
  ) {
    return <Redirect href="/(app)/home" />;
  }

  if (!fontsLoaded || meLoading || categoriesLoading) {
    return <OnboardingLoadingState message={t("briefing")} />;
  }

  if (categoriesError || !categories?.length) {
    return (
      <OnboardingContainer
        stepIndex={0}
        totalSteps={ONBOARDING_STEPS.length}
        showProgress={false}
      >
        <OnboardingErrorState
          message={t("pathsError")}
          actionLabel={t("common:retry")}
          onAction={() => {
            void refetchCategories();
            void refetchMe();
          }}
        />
      </OnboardingContainer>
    );
  }

  function advance() {
    persist();
    goNext();
  }

  async function onSelectLocale(locale: AppLocale) {
    setLocale(locale);
    await setAppLocale(locale);
    trackOnboardingQuestionAnswered("locale", locale);
    try {
      await updateLocale.mutateAsync(locale);
    } catch {
      // Guest / offline: locale stays local until auth sync.
    }
  }

  function finalizeOnboarding() {
    if (finalizedRef.current) return;
    if (!categoryId) return;
    finalizedRef.current = true;
    complete();
    trackOnboardingCompleted(selectedPath);
    if (answers.locale) {
      void setAppLocale(answers.locale);
    }
    updatePreferred.mutate(categoryId, {
      onSuccess: () => {
        setOnboardingFinalized(true);
      },
      onError: () => {
        finalizedRef.current = false;
        setFinishError(t("savePathError"));
      },
    });
  }

  function ensureFinalizedThen(navigate: () => void) {
    setFinishing(true);
    if (onboardingFinalized || me?.preferredCategory) {
      navigate();
      return;
    }
    if (!categoryId) {
      complete();
      trackOnboardingCompleted(selectedPath);
      navigate();
      return;
    }
    complete();
    trackOnboardingCompleted(selectedPath);
    updatePreferred.mutate(categoryId, {
      onSuccess: navigate,
      onError: () => navigate(),
    });
  }

  const canGoBack = stepIndex > 0 && !finishing;

  function goToLesson() {
    if (!firstLesson) {
      if (pathLoading) {
        setFinishError(t("preview.loadingLesson"));
        setFinishing(false);
        return;
      }
      ensureFinalizedThen(() => {
        router.replace("/(app)/home");
      });
      return;
    }
    ensureFinalizedThen(() => {
      router.replace(`/(app)/lesson/${firstLesson.id}`);
    });
  }

  function onSubscribe() {
    trackPaywallCta("subscribe");
    setSubscribing(true);
    activateDemoSub("sub-genius");
    trackSubscriptionStarted("sub-genius");
    setSubscribing(false);
    goToLesson();
  }

  function onContinueFree() {
    trackPaywallCta("continue_free");
    goToLesson();
  }

  const showProgress = stepId !== "language" && stepId !== "pain";

  return (
    <OnboardingContainer
      stepIndex={stepIndex}
      totalSteps={ONBOARDING_STEPS.length}
      onBack={canGoBack ? goBack : undefined}
      showProgress={showProgress}
    >
      {stepId === "language" ? (
        <LanguageStep
          selected={answers.locale}
          onSelect={(locale) => {
            void onSelectLocale(locale);
          }}
          onContinue={advance}
        />
      ) : null}

      {stepId === "pain" ? <PainStep onContinue={advance} /> : null}

      {stepId === "amplify" ? <AmplifyStep onContinue={advance} /> : null}

      {stepId === "positioning" ? (
        <PositioningStep onContinue={advance} />
      ) : null}

      {stepId === "personalize" ? (
        <PersonalizeStep
          selected={primaryBlocker ?? null}
          onSelect={(id) => {
            setPrimaryBlocker(id);
            trackOnboardingQuestionAnswered("primary_blocker", id);
          }}
          onContinue={() => {
            applyRecommendation();
            advance();
          }}
        />
      ) : null}

      {stepId === "value" ? (
        <ValueStep
          blocker={primaryBlocker}
          onContinue={() => {
            finalizeOnboarding();
            advance();
          }}
        />
      ) : null}

      {stepId === "preview" ? (
        <PreviewStep
          path={selectedPath}
          blocker={primaryBlocker}
          chaptersFromApi={pathChapters}
          lessonTitle={
            firstLesson?.title ??
            (pathLoading
              ? t("preview.loadingLesson")
              : t("preview.fallbackLesson"))
          }
          xpReward={firstLesson?.xpReward ?? 20}
          accentColor={categoryMeta?.color ?? path?.color}
          loading={pathLoading || finishing || updatePreferred.isPending}
          error={
            finishError ??
            (pathError ? t("preview.loadLessonError") : null)
          }
          onContinue={advance}
          onRetry={() => {
            setFinishError(null);
            void refetchPath();
          }}
        />
      ) : null}

      {stepId === "paywall" ? (
        <PaywallStep
          blocker={primaryBlocker}
          loading={subscribing || finishing || updatePreferred.isPending}
          onSubscribe={onSubscribe}
          onContinueFree={onContinueFree}
        />
      ) : null}
    </OnboardingContainer>
  );
}
