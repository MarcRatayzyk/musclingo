import { router, useLocalSearchParams } from "expo-router";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  LayoutChangeEvent,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { getAppLocale } from "@/i18n";
import {
  localizeLessonMarkdown,
  localizeLessonTitle,
} from "@/i18n/contentL10n";
import {
  getIllustrationLegend,
  getLessonIllustrations,
  normalizeTextAnswer,
  type IllustrationLegendItem,
} from "@muscle-mind/types";
import { useCompleteLesson, useLesson } from "@/features/home/api";
import {
  getInterjectionAfterChunk,
  getLessonHooks,
  getLessonLayoutMetrics,
  GorillaAvatar,
  MascotAside,
  nextMascotPose,
  type MascotPose,
} from "@/features/mascot";
import { ApiError, resolveMediaUrl } from "@/shared/api/client";
import { PrimaryButton, Screen, XpBar } from "@/shared/ui/primitives";
import { LessonSkeleton } from "@/shared/ui/Skeleton";
const BG = "#0B0D10";
const FOCUSED = "#FFFFFF";
const MUTED = "rgba(255,255,255,0.55)";
const TYPE_MS = 10;
const FADE_H = 36;

function parseLessonChunks(markdown: string): string[] {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];
  const byRule = normalized
    .split(/\n---\n/)
    .map((s) =>
      s
        .replace(/^#+\s*/gm, "")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
  if (byRule.length > 1) return byRule;
  const one = normalized
    .replace(/^#+\s*/gm, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return one ? [one] : [];
}
function sanitizePartialMarkdown(text: string): string {
  const markers = text.match(/\*\*/g)?.length ?? 0;
  if (markers % 2 === 0) return text;
  const idx = text.lastIndexOf("**");
  if (idx < 0) return text;
  return text.slice(0, idx) + text.slice(idx + 2);
}
function buildLegendColorMap(
  legend: IllustrationLegendItem[],
): Map<string, string> {
  const map = new Map<string, string>();
  for (const item of legend) {
    if (!item.color) continue;
    map.set(normalizeTextAnswer(item.label), item.color);
    for (const alias of item.aliases ?? []) {
      map.set(normalizeTextAnswer(alias), item.color);
    }
  }
  return map;
}
function MarkdownSpans({
  text,
  color,
  legendColors,
  dimmed = false,
}: {
  text: string;
  color: string;
  legendColors?: Map<string, string>;
  dimmed?: boolean;
}) {
  const cleaned = sanitizePartialMarkdown(text).replace(/[`_]/g, "");
  const parts = cleaned.split(/(\*\*[^*]+\*\*)/g).filter((p) => p.length > 0);
  return (
    <>
      {parts.map((part, i) => {
        const bold = /^\*\*[^*]+\*\*$/.test(part);
        const content = bold ? part.slice(2, -2) : part;
        const termColor =
          bold && legendColors
            ? legendColors.get(normalizeTextAnswer(content))
            : undefined;
        const textColor = termColor ?? color;
        return (
          <Text
            key={`${i}-${content.slice(0, 16)}-${content.length}`}
            className={bold ? "font-semibold" : undefined}
            style={{
              color: textColor,
              opacity: dimmed && termColor ? 0.55 : 1,
            }}
          >
            {content}
          </Text>
        );
      })}
    </>
  );
}
function BlinkingCursor() {
  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.15, { duration: 420, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 420, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, [opacity]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return (
    <Animated.Text style={[{ color: FOCUSED, fontWeight: "600" }, style]}>
      |
    </Animated.Text>
  );
}
function ContinueButton({
  isTyping,
  onPress,
  minWidth = 56,
  height = 44,
  fontSize = 18,
}: {
  isTyping: boolean;
  onPress: () => void;
  minWidth?: number;
  height?: number;
  fontSize?: number;
}) {
  const scale = useSharedValue(1);
  useEffect(() => {
    if (isTyping) {
      scale.value = withTiming(1, { duration: 200 });
      return;
    }
    scale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, [isTyping, scale]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={isTyping ? "Passer" : "Continuer"}
        style={{
          alignItems: "center",
          justifyContent: "center",
          minWidth,
          height,
          paddingHorizontal: Math.round(minWidth * 0.32),
          borderRadius: Math.round(height / 2),
          backgroundColor: "rgba(124, 255, 178, 0.14)",
          borderWidth: 1.5,
          borderColor: "rgba(124, 255, 178, 0.55)",
        }}
      >
        <Text
          style={{
            fontSize,
            fontWeight: "700",
            color: "#7CFFB2",
          }}
        >
          →
        </Text>
      </Pressable>
    </Animated.View>
  );
}
function IllustrationLegendChips({
  legend,
  compact = false,
  vertical = false,
}: {
  legend: IllustrationLegendItem[];
  compact?: boolean;
  vertical?: boolean;
}) {
  if (!legend.length) return null;
  return (
    <View
      className={`${vertical ? "flex-col" : "flex-row flex-wrap"} ${compact ? "gap-1.5" : "gap-2.5"}`}
    >
      {legend.map((item) => (
        <View
          key={`${item.color ?? "deep"}-${item.label}`}
          className="flex-row items-center gap-1.5"
        >
          {item.color ? (
            <View
              style={{
                width: compact ? 10 : 12,
                height: compact ? 10 : 12,
                borderRadius: 999,
                backgroundColor: item.color,
                borderWidth: item.color.toLowerCase() === "#f5f5f5" ? 1 : 0,
                borderColor: "rgba(255,255,255,0.35)",
              }}
            />
          ) : (
            <View
              style={{
                width: compact ? 10 : 12,
                height: compact ? 10 : 12,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.35)",
                borderStyle: "dashed",
              }}
            />
          )}
          <Text
            className={`capitalize text-white/80 ${compact ? "text-xs" : "text-sm"}`}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
function IllustrationModal({
  visible,
  onClose,
  uri,
  title,
  legend,
}: {
  visible: boolean;
  onClose: () => void;
  uri: string;
  title: string;
  legend: IllustrationLegendItem[];
}) {
  const { t } = useTranslation("home");
  const [aspectRatio, setAspectRatio] = useState(1.6);
  const { width: screenW, height: screenH } = useWindowDimensions();
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    Image.getSize(
      uri,
      (width, height) => {
        if (!cancelled && width > 0 && height > 0) {
          setAspectRatio(width / height);
        }
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, [uri, visible]);
  const imgW = screenW - 32;
  const maxImgH = legend.length > 0 ? screenH * 0.68 : screenH * 0.78;
  const imgH = Math.min(imgW / aspectRatio, maxImgH);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/92 px-4"
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          <Image
            source={{ uri }}
            accessibilityLabel={t("illustrationA11y", { title })}
            style={{ width: imgW, height: imgH, alignSelf: "center" }}
            resizeMode="contain"
          />
          {legend.length > 0 ? (
            <View className="mt-3 gap-2 self-center" style={{ width: imgW }}>
              <Text className="mb-0.5 text-xs uppercase tracking-widest text-white/50">
                {t("legend")}
              </Text>
              <IllustrationLegendChips legend={legend} />
            </View>
          ) : null}
        </Pressable>
        <Pressable
          onPress={onClose}
          className="mt-4 rounded-full bg-white/10 px-5 py-2"
        >
          <Text className="text-sm text-white">{t("close")}</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
function LessonInlineIllustration({
  uri,
  title,
  legend,
}: {
  uri: string;
  title: string;
  legend: IllustrationLegendItem[];
}) {
  const { t } = useTranslation("home");
  const [open, setOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1.6);
  const { width: screenW, height: screenH } = useWindowDimensions();
  useEffect(() => {
    let cancelled = false;
    Image.getSize(
      uri,
      (width, height) => {
        if (!cancelled && width > 0 && height > 0) {
          setAspectRatio(width / height);
        }
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, [uri]);
  const layout = useMemo(
    () => getLessonLayoutMetrics(screenW, screenH),
    [screenW, screenH],
  );
  const hasLegend = legend.length > 0;
  const maxImgH = layout.illustrationMaxH(hasLegend);
  const maxImgW = layout.illustrationMaxW(hasLegend);
  let imgW = maxImgW;
  let imgH = imgW / aspectRatio;
  if (imgH > maxImgH) {
    imgH = maxImgH;
    imgW = imgH * aspectRatio;
  }
  const stackLegend = layout.narrow && hasLegend && imgW > screenW * 0.55;
  return (
    <>
      <Animated.View entering={FadeIn.duration(500)} className="mt-1.5">
        <View
          className={
            stackLegend
              ? "flex-col items-stretch gap-2"
              : "flex-row items-center gap-3"
          }
        >
          <Pressable
            onPress={() => setOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={t("enlargeA11y", { title })}
            className="overflow-hidden rounded-xl border border-border bg-surface/60 active:opacity-90"
            style={stackLegend ? { alignSelf: "center" } : undefined}
          >
            <Image
              source={{ uri }}
              accessibilityLabel={t("illustrationA11y", { title })}
              style={{ width: imgW, height: imgH }}
              resizeMode="contain"
            />
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                right: 6,
                bottom: 6,
                borderRadius: 999,
                backgroundColor: "rgba(0,0,0,0.55)",
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}
            >
              <Text style={{ color: "#E9E4DA", fontSize: 10, fontWeight: "600" }}>
                {t("enlarge")}
              </Text>
            </View>
          </Pressable>
          {hasLegend ? (
            <View
              className={
                stackLegend ? "w-full gap-1" : "min-w-0 flex-1 gap-1"
              }
            >
              <Text className="text-[10px] uppercase tracking-widest text-white/40">
                {t("legend")}
              </Text>
              <IllustrationLegendChips
                legend={legend}
                compact
                vertical={!stackLegend}
              />
            </View>
          ) : null}
        </View>
      </Animated.View>
      <IllustrationModal
        visible={open}
        onClose={() => setOpen(false)}
        uri={uri}
        title={title}
        legend={legend}
      />
    </>
  );
}
function ChunkBlock({
  index,
  chunkIndex,
  children,
  onLayout,
}: {
  index: number;
  chunkIndex: number;
  children: React.ReactNode;
  onLayout: (y: number, h: number) => void;
}) {
  const isActive = index === chunkIndex;
  const Wrapper = isActive ? Animated.View : View;
  const wrapperProps = isActive
    ? { entering: FadeInDown.duration(380).springify().damping(18) }
    : {};
  return (
    <Wrapper
      {...wrapperProps}
      className="mb-5"
      onLayout={(e: LayoutChangeEvent) => {
        const { y, height } = e.nativeEvent.layout;
        onLayout(y, height);
      }}
    >
      {children}
    </Wrapper>
  );
}
function TopFade({ width, height = FADE_H }: { width: number; height?: number }) {
  if (width <= 0) return null;
  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0, right: 0, height }}
    >
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="lessonTopFade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={BG} stopOpacity="1" />
            <Stop offset="0.55" stopColor={BG} stopOpacity="0.7" />
            <Stop offset="1" stopColor={BG} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#lessonTopFade)"
        />
      </Svg>
    </View>
  );
}
export default function LessonScreen() {
  const { i18n } = useTranslation("home");
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const layout = useMemo(
    () => getLessonLayoutMetrics(screenW, screenH),
    [screenW, screenH],
  );
  const bubbleLayoutProps = useMemo(
    () => ({
      showName: false as const,
      tailTipX: layout.bubbleTailTipX,
      fontSize: layout.bubbleFontSize,
      lineHeight: layout.bubbleLineHeight,
      paddingHorizontal: layout.bubblePadH,
      paddingVertical: layout.bubblePadV,
    }),
    [layout],
  );
  const { data: lesson, isLoading, isError, error } = useLesson(id);
  void i18n.language;
  const lessonTitle = lesson ? localizeLessonTitle(lesson.title) : "";
  const complete = useCompleteLesson();
  const startedAt = useRef(Date.now());
  const navigatingRef = useRef(false);
  const [finishError, setFinishError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const chunkLayouts = useRef<Record<number, { y: number; h: number }>>({});
  const scrollYRef = useRef(0);
  const viewportHRef = useRef(0);
  const pendingCenterRef = useRef(false);
  const centerTargetRef = useRef(0);
  const chunkIndexRef = useRef(0);
  const didInitialCenterRef = useRef(false);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [typedLen, setTypedLen] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [asidePending, setAsidePending] = useState(false);
  const [viewportH, setViewportH] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [mascotPose, setMascotPose] = useState<MascotPose>("present");
  const chunks = useMemo(
    () =>
      lesson
        ? parseLessonChunks(
            localizeLessonMarkdown(lesson.title, lesson.markdown),
          )
        : [],
    [lesson],
  );
  const illustrations = useMemo(() => {
    const items = getLessonIllustrations(lesson?.illustrationUrl);
    return items
      .map((item) => {
        const uri = resolveMediaUrl(item.url);
        if (!uri) return null;
        return {
          uri,
          title: item.title,
          legend: getIllustrationLegend(item.url, getAppLocale()),
        };
      })
      .filter(
        (
          item,
        ): item is {
          uri: string;
          title: string;
          legend: IllustrationLegendItem[];
        } => item != null,
      );
  }, [lesson?.illustrationUrl]);
  const legendColorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const ill of illustrations) {
      for (const [key, value] of buildLegendColorMap(ill.legend)) {
        map.set(key, value);
      }
    }
    return map;
  }, [illustrations]);
  const mascotEnabled = lesson?.category.slug === "anatomie";
  const mascotHooks = useMemo(
    () => getLessonHooks(lesson?.order ?? 0),
    [lesson?.order],
  );
  const hasIntro = mascotEnabled && !!mascotHooks.intro;
  const showingIntro = hasIntro && !introDone;
  chunkIndexRef.current = chunkIndex;
  const currentChunk = showingIntro ? "" : (chunks[chunkIndex] ?? "");
  const currentDisplayed = currentChunk.slice(0, typedLen);
  function updateFocusFromScroll() {
    const vh = viewportHRef.current;
    if (vh <= 0) return;
    const center = scrollYRef.current + vh / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i <= chunkIndexRef.current; i++) {
      const layout = chunkLayouts.current[i];
      if (!layout) continue;
      const mid = layout.y + layout.h / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    setFocusedIndex((prev) => (prev === best ? prev : best));
  }
  function centerChunk(index: number, animated = true) {
    const layout = chunkLayouts.current[index];
    const vh = viewportHRef.current;
    if (!layout || vh <= 0) return false;
    const target = Math.max(0, layout.y - vh / 2 + Math.min(layout.h, 72) / 2);
    scrollRef.current?.scrollTo({ y: target, animated });
    scrollYRef.current = target;
    setFocusedIndex(index);
    return true;
  }
  function flushCenterIfNeeded(index: number) {
    if (!pendingCenterRef.current) return;
    if (index !== centerTargetRef.current) return;
    if (!chunkLayouts.current[index]) return;
    pendingCenterRef.current = false;
    requestAnimationFrame(() => {
      centerChunk(index, true);
    });
  }
  function requestCenterOn(index: number) {
    centerTargetRef.current = index;
    pendingCenterRef.current = true;
  }
  useEffect(() => {
    startedAt.current = Date.now();
    setChunkIndex(0);
    setTypedLen(0);
    setIntroDone(false);
    setAsidePending(false);
    setFocusedIndex(0);
    setMascotPose("present");
    chunkLayouts.current = {};
    scrollYRef.current = 0;
    didInitialCenterRef.current = false;
    pendingCenterRef.current = false;
  }, [id]);
  useEffect(() => {
    setIntroDone(!hasIntro);
  }, [hasIntro, id]);
  useEffect(() => {
    setTypedLen(0);
    setAsidePending(false);
  }, [chunkIndex]);
  useEffect(() => {
    if (showingIntro) return;
    if (!pendingCenterRef.current) return;
    if (centerTargetRef.current !== chunkIndex) return;
    const tryCenter = () => {
      if (!pendingCenterRef.current) return true;
      if (centerTargetRef.current !== chunkIndex) return true;
      if (centerChunk(chunkIndex, true)) {
        pendingCenterRef.current = false;
        return true;
      }
      return false;
    };
    if (tryCenter()) return;
    const t1 = setTimeout(tryCenter, 32);
    const t2 = setTimeout(tryCenter, 120);
    const t3 = setTimeout(tryCenter, 280);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [chunkIndex, showingIntro]);
  useEffect(() => {
    if (showingIntro) return;
    if (typedLen >= currentChunk.length) return;
    const timer = setTimeout(() => {
      setTypedLen((n) => Math.min(n + 1, currentChunk.length));
    }, TYPE_MS);
    return () => clearTimeout(timer);
  }, [typedLen, currentChunk, showingIntro]);
  if (isError) {
    const locked = error instanceof ApiError && error.status === 403;
    return (
      <Screen>
        <Text className="text-lg text-white">
          {locked ? "Leçon verrouillée" : "Leçon indisponible"}
        </Text>
        <Text className="mt-2 text-muted">
          {error instanceof Error ? error.message : "Erreur"}
        </Text>
        <View className="mt-8">
          <PrimaryButton
            label="Retour à l'accueil"
            onPress={() => router.replace("/(app)/home")}
          />
        </View>
      </Screen>
    );
  }
  if (isLoading || !lesson) {
    return (
      <Screen>
        <LessonSkeleton />
      </Screen>
    );
  }
  const totalChunks = Math.max(chunks.length, 1);
  const safeIndex = Math.min(chunkIndex, totalChunks - 1);
  const isTyping = !showingIntro && typedLen < currentChunk.length;
  const isLastChunk = !showingIntro && safeIndex >= totalChunks - 1;
  const currentAside =
    mascotEnabled && !showingIntro && !isTyping
      ? getInterjectionAfterChunk(mascotHooks, chunkIndex)
      : null;
  const canFinish = isLastChunk && !isTyping && !(asidePending && currentAside);
  const progress = showingIntro
    ? 0
    : isTyping
      ? (safeIndex + typedLen / Math.max(currentChunk.length, 1)) / totalChunks
      : asidePending && currentAside
        ? (safeIndex + 0.85) / totalChunks
        : (safeIndex + 1) / totalChunks;
  const topSpacer = layout.topSpacer(viewportH || screenH * 0.55);
  const bottomSpacer = layout.bottomSpacer(viewportH || screenH * 0.55);
  const readingDone = lesson.progress?.status === "COMPLETED";
  const showQuizCta = canFinish && readingDone && !!lesson.quizId;

  function renderChunkContent(
    text: string,
    index: number,
    isCurrent: boolean,
  ) {
    // Le chunk en cours de lecture reste toujours clair, même si le
    // Pendant la bulle, le texte de leçon reste en second plan.
    const focused = asidePending
      ? false
      : isCurrent || focusedIndex === index;
    const color = focused ? FOCUSED : MUTED;
    return (
      <Text className="text-lg leading-8" style={{ fontSize: layout.chunkFontSize, lineHeight: layout.chunkLineHeight }}>
        <MarkdownSpans
          text={text}
          color={color}
          legendColors={legendColorMap.size > 0 ? legendColorMap : undefined}
          dimmed={!focused}
        />
        {isCurrent && isTyping ? <BlinkingCursor /> : null}
      </Text>
    );
  }

  function onContinue() {
    if (mascotEnabled) {
      setMascotPose((pose) => nextMascotPose(pose));
    }
    if (showingIntro) {
      setIntroDone(true);
      setFocusedIndex(0);
      requestCenterOn(0);
      return;
    }
    if (isTyping) {
      setTypedLen(currentChunk.length);
      return;
    }
    // Étape bulle : on s'arrête sur l'interjection avant le chunk suivant
    if (!asidePending && currentAside) {
      setAsidePending(true);
      return;
    }
    if (asidePending) {
      setAsidePending(false);
      if (isLastChunk) return;
    }
    if (!isLastChunk) {
      const next = chunkIndex + 1;
      requestCenterOn(next);
      setFocusedIndex(next);
      setChunkIndex(next);
    }
  }
  function goToQuiz(lessonId: string) {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    router.replace(`/(app)/quiz/${lessonId}`);
    // Si la navigation échoue (API / route), on débloque le CTA.
    setTimeout(() => {
      navigatingRef.current = false;
    }, 2000);
  }
  function finishLesson() {
    if (complete.isPending || navigatingRef.current) return;
    setFinishError(null);
    const readingTimeSec = Math.round((Date.now() - startedAt.current) / 1000);
    complete.mutate(
      { id: lesson!.id, readingTimeSec },
      {
        onSuccess: (data) => {
          if (data.quizId || lesson!.quizId) {
            goToQuiz(lesson!.id);
            return;
          }
          if (data.nextLessonId) {
            router.replace(`/(app)/lesson/${data.nextLessonId}`);
            return;
          }
          router.replace("/(app)/home");
        },
        onError: (err) => {
          if (lesson!.quizId) {
            goToQuiz(lesson!.id);
            return;
          }
          setFinishError(
            err instanceof Error ? err.message : "Impossible de valider la leçon",
          );
        },
      },
    );
  }
  function onViewportLayout(e: LayoutChangeEvent) {
    const { height, width } = e.nativeEvent.layout;
    if (height > 0 && height !== viewportH) {
      setViewportH(height);
      viewportHRef.current = height;
      if (!didInitialCenterRef.current) {
        didInitialCenterRef.current = true;
        if (!showingIntro) requestCenterOn(0);
      }
    }
    if (width > 0 && width !== viewportW) setViewportW(width);
  }
  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    scrollYRef.current = e.nativeEvent.contentOffset.y;
    updateFocusFromScroll();
  }
  function onChunkLayout(index: number, y: number, h: number) {
    chunkLayouts.current[index] = { y, h };
    flushCenterIfNeeded(index);
    updateFocusFromScroll();
  }
  return (
    <Screen className="pt-8">
      <View className="mb-1" style={{ gap: layout.headerGap }}>
        <XpBar progress={progress} color={lesson.category.color} />
        <Text
          className="mt-2 font-semibold text-white"
          style={{
            fontSize: layout.titleFontSize,
            lineHeight: layout.titleLineHeight,
          }}
        >
          {lessonTitle}
        </Text>
        {illustrations.length > 0 ? (
          <View className="gap-2">
            {illustrations.map((item) => (
              <LessonInlineIllustration
                key={item.uri}
                uri={item.uri}
                title={item.title}
                legend={item.legend}
              />
            ))}
          </View>
        ) : null}
      </View>
      <View className="mb-2 flex-1 overflow-hidden" onLayout={onViewportLayout}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          className="flex-1"
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <View>
            <View style={{ height: topSpacer }} />
            {hasIntro && mascotHooks.intro ? (
              <View className="mb-4" style={{ paddingTop: 4 }}>
                <MascotAside
                  line={mascotHooks.intro}
                  accentColor={lesson.category.color}
                  dimmed={!showingIntro}
                  compact={layout.short}
                  showAvatar={false}
                  {...bubbleLayoutProps}
                />
              </View>
            ) : null}
            {!showingIntro ? (
              <>
                {chunks.slice(0, chunkIndex).map((chunk, i) => (
                  <Fragment key={`chunk-${i}`}>
                    <ChunkBlock
                      index={i}
                      chunkIndex={chunkIndex}
                      onLayout={(y, h) => onChunkLayout(i, y, h)}
                    >
                      {renderChunkContent(chunk, i, false)}
                    </ChunkBlock>
                    {mascotEnabled
                      ? (() => {
                          const aside = getInterjectionAfterChunk(
                            mascotHooks,
                            i,
                          );
                          return aside ? (
                            <View className="mb-5">
                              <MascotAside
                                line={aside}
                                accentColor={lesson.category.color}
                                dimmed
                                showAvatar={false}
                                compact={layout.short}
                                {...bubbleLayoutProps}
                              />
                            </View>
                          ) : null;
                        })()
                      : null}
                  </Fragment>
                ))}
                <ChunkBlock
                  index={chunkIndex}
                  chunkIndex={chunkIndex}
                  onLayout={(y, h) => onChunkLayout(chunkIndex, y, h)}
                >
                  {renderChunkContent(
                    asidePending ? currentChunk : currentDisplayed,
                    chunkIndex,
                    !asidePending,
                  )}
                </ChunkBlock>
                {asidePending && currentAside ? (
                  <View className="mb-5">
                    <MascotAside
                      line={currentAside}
                      accentColor={lesson.category.color}
                      dimmed={false}
                      showAvatar={false}
                      compact={layout.short}
                      {...bubbleLayoutProps}
                    />
                  </View>
                ) : null}
                {canFinish && mascotEnabled && mascotHooks.outro ? (
                  <Animated.View
                    entering={FadeIn.duration(400)}
                    className="mb-4"
                  >
                    <MascotAside
                      line={mascotHooks.outro}
                      accentColor={lesson.category.color}
                      compact={layout.short}
                      showAvatar={false}
                      {...bubbleLayoutProps}
                    />
                  </Animated.View>
                ) : null}
                {canFinish && !!lesson.sources.length && (
                  <Animated.View
                    entering={FadeIn.duration(400)}
                    className="mt-4 rounded-2xl border border-border bg-surface p-4"
                  >
                    <Text className="mb-2 text-sm font-medium text-muted">
                      Sources
                    </Text>
                    {lesson.sources.map((s) => (
                      <Text
                        key={s}
                        className="mb-1 text-xs leading-5 text-muted"
                      >
                        • {s}
                      </Text>
                    ))}
                  </Animated.View>
                )}
              </>
            ) : null}
            <View style={{ height: bottomSpacer }} />
          </View>
        </ScrollView>
        <TopFade width={viewportW} />
      </View>
      <View className="shrink-0 pb-3">
        {!canFinish ? (
          <View className="flex-row items-end justify-between px-1 pb-1">
            {mascotEnabled ? (
              <View pointerEvents="none" style={{ marginLeft: -4 }}>
                <GorillaAvatar
                  pose={mascotPose}
                  size="lesson"
                  dimension={layout.mascotSize}
                />
              </View>
            ) : (
              <View />
            )}
            <View className="mb-1 mr-1">
              <ContinueButton
                isTyping={isTyping}
                onPress={onContinue}
                minWidth={layout.continueMinWidth}
                height={layout.continueHeight}
                fontSize={layout.continueFontSize}
              />
            </View>
          </View>
        ) : (
          <>
            {mascotEnabled ? (
              <View className="mb-2" pointerEvents="none">
                <GorillaAvatar
                  pose={mascotPose}
                  size="lesson"
                  dimension={layout.mascotSize}
                />
              </View>
            ) : null}
            {showQuizCta ? (
              <View className="mb-2">
                <PrimaryButton
                  label="Continuer vers le quiz"
                  onPress={() => goToQuiz(lesson.id)}
                />
              </View>
            ) : (
              <View className="mb-2 gap-2">
                {finishError ? (
                  <Text className="text-center text-sm text-red-400">
                    {finishError}
                  </Text>
                ) : null}
                <PrimaryButton
                  label={complete.isPending ? "…" : "J'ai compris"}
                  disabled={complete.isPending}
                  onPress={finishLesson}
                />
              </View>
            )}
          </>
        )}
      </View>
    </Screen>
  );
}
