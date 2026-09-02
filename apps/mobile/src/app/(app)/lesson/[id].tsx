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
  GorillaAvatar,
  nextMascotPose,
  type MascotLine,
  type MascotPose,
} from "@/features/mascot";
import { ApiError, resolveMediaUrl } from "@/shared/api/client";
import { PrimaryButton, Screen, XpBar } from "@/shared/ui/primitives";
const BG = "#0B0D10";
const FOCUSED = "rgba(255,255,255,0.92)";
const MUTED = "rgba(255,255,255,0.38)";
const TYPE_MS = 22;
const FADE_H = 170;

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
function chunkShowsIllustration(text: string): boolean {
  return /illustration/i.test(text);
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
}: {
  isTyping: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  useEffect(() => {
    if (isTyping) {
      scale.value = withTiming(1, { duration: 200 });
      return;
    }
    scale.value = withRepeat(
      withSequence(
        withTiming(1.07, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, [isTyping, scale]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={animatedStyle} className="mb-2 self-center">
      <Pressable
        onPress={onPress}
        className="items-center justify-center rounded-full bg-accent px-8 py-4"
        accessibilityRole="button"
        accessibilityLabel={isTyping ? "Passer" : "Continuer"}
      >
        <Text className="text-2xl font-semibold text-background">→</Text>
      </Pressable>
    </Animated.View>
  );
}
function IllustrationLegendChips({
  legend,
  compact = false,
}: {
  legend: IllustrationLegendItem[];
  compact?: boolean;
}) {
  if (!legend.length) return null;
  return (
    <View className={`flex-row flex-wrap ${compact ? "gap-2" : "gap-2.5"}`}>
      {legend.map((item) => (
        <View
          key={`${item.color ?? "deep"}-${item.label}`}
          className="flex-row items-center gap-1.5 rounded-full bg-white/5 px-2 py-1"
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
  const imgW = screenW - 48;
  const maxImgH = legend.length > 0 ? screenH * 0.55 : screenH * 0.75;
  const imgH = Math.min(imgW / aspectRatio, maxImgH);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/90 px-6"
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full">
          <Image
            source={{ uri }}
            accessibilityLabel={`Illustration : ${title}`}
            style={{ width: imgW, height: imgH, alignSelf: "center" }}
            resizeMode="contain"
          />
          {legend.length > 0 ? (
            <View className="mt-4 gap-2.5 self-center" style={{ width: imgW }}>
              <Text className="mb-1 text-xs uppercase tracking-widest text-white/50">
                Légende
              </Text>
              <IllustrationLegendChips legend={legend} />
            </View>
          ) : null}
        </Pressable>
        <Pressable
          onPress={onClose}
          className="mt-5 rounded-full bg-white/10 px-5 py-2"
        >
          <Text className="text-sm text-white">Fermer</Text>
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
  const [open, setOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1.6);
  const { width: screenW } = useWindowDimensions();
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
  const imgW = screenW - 40;
  const imgH = Math.min(imgW / aspectRatio, 180);
  return (
    <>
      <Animated.View entering={FadeIn.duration(500)} className="mb-4">
        <Pressable
          onPress={() => setOpen(true)}
          className="overflow-hidden rounded-2xl border border-border bg-surface/60"
          accessibilityRole="button"
          accessibilityLabel={`Agrandir l'illustration ${title}`}
        >
          <Image
            source={{ uri }}
            accessibilityLabel={`Illustration : ${title}`}
            style={{ width: "100%", height: imgH }}
            resizeMode="contain"
          />
          <View className="border-t border-border/60 px-3 py-2.5">
            <IllustrationLegendChips legend={legend} compact />
          </View>
        </Pressable>
        <Text className="mt-1.5 text-center text-xs text-white/30">
          Toucher pour agrandir
        </Text>
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
function LessonIllustrationButton({
  uri,
  title,
  legend,
  buttonLabel = "Illustration",
}: {
  uri: string;
  title: string;
  legend: IllustrationLegendItem[];
  buttonLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className="rounded-full border border-border bg-surface/90 px-3 py-1.5"
        accessibilityRole="button"
        accessibilityLabel={`Voir l'illustration ${title}`}
      >
        <Text className="text-xs font-medium text-accent">{buttonLabel}</Text>
      </Pressable>
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
function MascotLineText({
  line,
  color,
}: {
  line: MascotLine;
  color: string;
}) {
  return (
    <Text className="text-base leading-7" style={{ color }}>
      {line.text}
    </Text>
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
            <Stop offset="0.4" stopColor={BG} stopOpacity="0.95" />
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
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: lesson, isLoading, isError, error } = useLesson(id);
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
  const [viewportH, setViewportH] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [mascotPose, setMascotPose] = useState<MascotPose>("present");
  const chunks = useMemo(
    () => (lesson ? parseLessonChunks(lesson.markdown) : []),
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
          legend: getIllustrationLegend(item.url),
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
  const primaryIllustration = illustrations[0] ?? null;
  const mascotEnabled = lesson?.category.slug === "anatomie";
  const mascotHooks = useMemo(
    () => getLessonHooks(lesson?.order ?? 0),
    [lesson?.order],
  );
  chunkIndexRef.current = chunkIndex;
  const currentChunk = chunks[chunkIndex] ?? "";
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
    setFocusedIndex(0);
    setMascotPose("present");
    chunkLayouts.current = {};
    scrollYRef.current = 0;
    didInitialCenterRef.current = false;
    requestCenterOn(0);
  }, [id]);
  useEffect(() => {
    setTypedLen(0);
  }, [chunkIndex]);
  useEffect(() => {
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
  }, [chunkIndex]);
  useEffect(() => {
    if (typedLen >= currentChunk.length) return;
    const timer = setTimeout(() => {
      setTypedLen((n) => Math.min(n + 1, currentChunk.length));
    }, TYPE_MS);
    return () => clearTimeout(timer);
  }, [typedLen, currentChunk]);
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
        <Text className="text-muted">Chargement de la leçon…</Text>
      </Screen>
    );
  }
  const totalChunks = Math.max(chunks.length, 1);
  const safeIndex = Math.min(chunkIndex, totalChunks - 1);
  const isTyping = typedLen < currentChunk.length;
  const isLastChunk = safeIndex >= totalChunks - 1;
  const canFinish = isLastChunk && !isTyping;
  const progress = isTyping
    ? (safeIndex + typedLen / Math.max(currentChunk.length, 1)) / totalChunks
    : (safeIndex + 1) / totalChunks;
  const topSpacer = Math.max(viewportH * 0.38, 72);
  const bottomSpacer = Math.max(viewportH * 0.45, 96);
  const readingDone = lesson.progress?.status === "COMPLETED";
  const showQuizCta = canFinish && readingDone && !!lesson.quizId;

  function renderChunkContent(
    chunk: string,
    text: string,
    index: number,
    isCurrent: boolean,
  ) {
    const focused = focusedIndex === index;
    const color = focused ? FOCUSED : MUTED;
    const showIllustration =
      primaryIllustration && chunkShowsIllustration(chunk);
    return (
      <>
        {showIllustration ? (
          <LessonInlineIllustration
            uri={primaryIllustration.uri}
            title={primaryIllustration.title}
            legend={primaryIllustration.legend}
          />
        ) : null}
        <Text className="text-base leading-7">
          <MarkdownSpans
            text={text}
            color={color}
            legendColors={legendColorMap.size > 0 ? legendColorMap : undefined}
            dimmed={!focused}
          />
          {isCurrent && isTyping ? <BlinkingCursor /> : null}
        </Text>
      </>
    );
  }

  function onContinue() {
    if (mascotEnabled) {
      setMascotPose((pose) => nextMascotPose(pose));
    }
    if (isTyping) {
      setTypedLen(currentChunk.length);
      return;
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
        requestCenterOn(0);
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
    <Screen>
      <View className="mb-3">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-xs text-muted">
            {safeIndex + 1} / {totalChunks}
          </Text>
          <Text className="text-xs text-accent">
            +{lesson.xpReward} neurolift
          </Text>
        </View>
        <XpBar progress={progress} color={lesson.category.color} />
        <Text
          className="mt-3 text-xs uppercase tracking-widest"
          style={{ color: lesson.category.color }}
        >
          {lesson.category.name}
        </Text>
        <Text className="mt-1 text-2xl font-semibold text-white">
          {lesson.title}
        </Text>
        {illustrations.length > 0 ? (
          <View className="mt-2 flex-row flex-wrap justify-end gap-2">
            {illustrations.map((item) => (
              <LessonIllustrationButton
                key={item.uri}
                uri={item.uri}
                title={item.title}
                legend={item.legend}
                buttonLabel={
                  illustrations.length > 1 ? item.title : "Illustration"
                }
              />
            ))}
          </View>
        ) : null}
      </View>
      <View className="mb-4 flex-1 overflow-hidden" onLayout={onViewportLayout}>
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
            {mascotEnabled && mascotHooks.intro ? (
              <View className="mb-6">
                <MascotLineText line={mascotHooks.intro} color={FOCUSED} />
              </View>
            ) : null}
            {chunks.slice(0, chunkIndex).map((chunk, i) => (
              <Fragment key={`chunk-${i}`}>
                <ChunkBlock
                  index={i}
                  chunkIndex={chunkIndex}
                  onLayout={(y, h) => onChunkLayout(i, y, h)}
                >
                  {renderChunkContent(chunk, chunk, i, false)}
                </ChunkBlock>
                {mascotEnabled
                  ? (() => {
                      const aside = getInterjectionAfterChunk(mascotHooks, i);
                      return aside ? (
                        <View className="mb-5">
                          <MascotLineText line={aside} color={MUTED} />
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
                currentChunk,
                currentDisplayed,
                chunkIndex,
                true,
              )}
            </ChunkBlock>
            {canFinish && mascotEnabled && mascotHooks.outro ? (
              <Animated.View entering={FadeIn.duration(400)} className="mb-4">
                <MascotLineText line={mascotHooks.outro} color={FOCUSED} />
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
                  <Text key={s} className="mb-1 text-xs leading-5 text-muted">
                    • {s}
                  </Text>
                ))}
              </Animated.View>
            )}
            <View style={{ height: bottomSpacer }} />
          </View>
        </ScrollView>
        <TopFade width={viewportW} />
      </View>
      <View className="shrink-0">
        {mascotEnabled ? (
          <View className="mb-1" pointerEvents="none">
            <GorillaAvatar pose={mascotPose} size="lg" />
          </View>
        ) : null}
        {!canFinish ? (
          <ContinueButton isTyping={isTyping} onPress={onContinue} />
        ) : showQuizCta ? (
          <View className="mb-2">
            <PrimaryButton
              label="Continuer vers le quiz"
              onPress={() => goToQuiz(lesson.id)}
            />
          </View>
        ) : (
          <View className="mb-2 gap-2">
            {finishError ? (
              <Text className="text-center text-sm text-red-400">{finishError}</Text>
            ) : null}
            <PrimaryButton
              label={complete.isPending ? "…" : "J'ai compris"}
              disabled={complete.isPending}
              onPress={finishLesson}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}
