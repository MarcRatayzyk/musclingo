import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { WATER_BOTTLE_QUIZ_RETRY_COST } from "@muscle-mind/types";
import type { PathLessonNode } from "./api";
import { useMe } from "@/features/auth/api";
import { useStartLesson } from "@/features/home/api";
import {
  localizeLessonSubtitle,
  localizeLessonTitle,
} from "@/i18n/contentL10n";
import { OutOfBottlesModal } from "@/features/shop/OutOfBottlesModal";
import { ApiError } from "@/shared/api/client";
import { NeuroliftAmount } from "@/shared/ui/Neurolift";
import { StarRow } from "@/shared/ui/Star";
import {
  WATER_BOTTLE_COST,
  WaterBottleIcon,
} from "@/shared/ui/WaterBottle";

function darkenHex(hex: string, amount = 0.4): string {
  const raw = hex.replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) return "#0A3A6E";
  const r = Math.max(0, Math.round(((n >> 16) & 255) * (1 - amount)));
  const g = Math.max(0, Math.round(((n >> 8) & 255) * (1 - amount)));
  const b = Math.max(0, Math.round((n & 255) * (1 - amount)));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function isOutOfBottlesError(status: number, message: string): boolean {
  if (status !== 403) return false;
  const lower = message.toLowerCase();
  return (
    lower.includes("bouteille") ||
    lower.includes("bottle") ||
    lower.includes("water")
  );
}

function parseRemainingBottles(message: string): number | null {
  const match = message.match(/(\d+)\s*(?:restantes?|remaining|left)/i);
  if (!match) return null;
  const n = Number.parseInt(match[1]!, 10);
  return Number.isFinite(n) ? n : null;
}

function SolidButton({
  label,
  color,
  lip,
  onPress,
  disabled,
  trailing,
}: {
  label: string;
  color: string;
  lip: string;
  onPress: () => void;
  disabled?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: lip,
        paddingBottom: 5,
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 10,
          borderRadius: 16,
          paddingVertical: 14,
          backgroundColor: color,
        }}
      >
        <Text
          style={{
            color: "#0B0F14",
            fontSize: 16,
            fontWeight: "800",
            letterSpacing: 0.6,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>
        {trailing}
      </Pressable>
    </View>
  );
}

export function LessonPreviewSheet({
  visible,
  lesson,
  color,
  onClose,
  onStart,
  onStartQuiz,
}: {
  visible: boolean;
  lesson: PathLessonNode | null;
  color: string;
  onClose: () => void;
  onStart: (lesson: PathLessonNode) => void;
  onStartQuiz?: (lesson: PathLessonNode) => void;
}) {
  const { t, i18n } = useTranslation("home");
  const startLesson = useStartLesson();
  const { data: me } = useMe();
  const [startError, setStartError] = useState<string | null>(null);
  const [bottlesModal, setBottlesModal] = useState<{
    remaining: number;
  } | null>(null);

  useEffect(() => {
    if (!visible) {
      setStartError(null);
      setBottlesModal(null);
    }
  }, [visible]);

  if (!lesson) return null;

  const completed = lesson.state === "completed";
  const quizPending =
    lesson.readingCompleted && lesson.hasQuiz && !lesson.passed;
  const firstRead = !lesson.readingCompleted;
  const lip = darkenHex(color, 0.45);
  const primaryLabel = quizPending
    ? t("doQuiz")
    : completed
      ? t("review")
      : t("letsGo");
  const bottleCost = me?.waterBottleCost ?? WATER_BOTTLE_COST;
  // Recompute when language changes (i18n.language in deps via render).
  const displayTitle = localizeLessonTitle(lesson.title);
  const displaySubtitle = localizeLessonSubtitle(lesson.subtitle);
  void i18n.language;

  async function handleStartLesson() {
    if (!lesson) return;
    setStartError(null);

    if (!firstRead) {
      onStart(lesson);
      return;
    }

    try {
      await startLesson.mutateAsync(lesson.id);
      onStart(lesson);
    } catch (err) {
      const status =
        err instanceof ApiError
          ? err.status
          : typeof err === "object" &&
              err &&
              "status" in err &&
              typeof (err as { status: unknown }).status === "number"
            ? (err as { status: number }).status
            : 0;
      const message =
        err instanceof Error ? err.message : t("startFailed");

      if (isOutOfBottlesError(status, message)) {
        const parsed = parseRemainingBottles(message);
        setBottlesModal({
          remaining: parsed ?? me?.waterBottles ?? Math.max(0, bottleCost - 1),
        });
        return;
      }

      setStartError(message);
    }
  }

  function goToShop() {
    setBottlesModal(null);
    onClose();
    router.push("/(app)/shop");
  }

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.82)",
            paddingHorizontal: 24,
          }}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 320,
              overflow: "hidden",
              borderRadius: 24,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "#121820",
            }}
          >
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: 20,
                paddingTop: 22,
                paddingBottom: 18,
                backgroundColor: "#1A2332",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255,255,255,0.06)",
              }}
            >
              <Text
                style={{
                  color,
                  fontSize: 11,
                  fontWeight: "800",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {t("reward")}
              </Text>
              <View style={{ marginTop: 10 }}>
                <NeuroliftAmount
                  amount={lesson.xpReward}
                  size="xl"
                  signed
                  color={color}
                />
              </View>
              {lesson.bestStars != null && lesson.bestStars > 0 ? (
                <View style={{ marginTop: 12 }}>
                  <StarRow stars={lesson.bestStars} size={26} />
                </View>
              ) : null}
            </View>

            <View
              style={{
                paddingHorizontal: 22,
                paddingTop: 20,
                paddingBottom: 22,
                backgroundColor: "#121820",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontWeight: "700",
                  textAlign: "center",
                  lineHeight: 26,
                }}
              >
                {displayTitle}
              </Text>
              {displaySubtitle ? (
                <Text
                  style={{
                    color: "#8B95A8",
                    fontSize: 15,
                    textAlign: "center",
                    lineHeight: 22,
                    marginTop: 8,
                  }}
                >
                  {displaySubtitle}
                </Text>
              ) : null}

              {startError ? (
                <Text
                  style={{
                    marginTop: 14,
                    color: "#F87171",
                    fontSize: 13,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {startError}
                </Text>
              ) : null}

              <View style={{ marginTop: 22, gap: 10 }}>
                {quizPending && onStartQuiz ? (
                  <>
                    <SolidButton
                      label={t("doQuiz")}
                      color={color}
                      lip={lip}
                      onPress={() => onStartQuiz(lesson)}
                    />
                    <Pressable
                      onPress={() => void handleStartLesson()}
                      style={{
                        alignItems: "center",
                        borderRadius: 16,
                        paddingVertical: 12,
                        borderWidth: 1.5,
                        borderColor: "rgba(255,255,255,0.18)",
                        backgroundColor: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 14,
                          fontWeight: "700",
                          letterSpacing: 0.4,
                          textTransform: "uppercase",
                        }}
                      >
                        {t("reviewLesson")}
                      </Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <SolidButton
                      label={startLesson.isPending ? "…" : primaryLabel}
                      color={color}
                      lip={lip}
                      disabled={startLesson.isPending}
                      onPress={() => void handleStartLesson()}
                      trailing={
                        firstRead ? (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            <Text
                              style={{
                                color: "#0B0F14",
                                fontSize: 14,
                                fontWeight: "800",
                              }}
                            >
                              −{bottleCost}
                            </Text>
                            <WaterBottleIcon size={18} />
                          </View>
                        ) : undefined
                      }
                    />
                    {completed && lesson.hasQuiz && onStartQuiz ? (
                      <Pressable
                        onPress={() => onStartQuiz(lesson)}
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: 8,
                          borderRadius: 16,
                          paddingVertical: 12,
                          borderWidth: 1.5,
                          borderColor: "rgba(255,255,255,0.18)",
                          backgroundColor: "rgba(255,255,255,0.04)",
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontSize: 14,
                            fontWeight: "700",
                            letterSpacing: 0.4,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("retryQuiz")}
                        </Text>
                        <Text
                          style={{
                            color: "#8B95A8",
                            fontSize: 13,
                            fontWeight: "700",
                          }}
                        >
                          −{WATER_BOTTLE_QUIZ_RETRY_COST}
                        </Text>
                        <WaterBottleIcon size={16} />
                      </Pressable>
                    ) : null}
                  </>
                )}
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <OutOfBottlesModal
        visible={bottlesModal != null}
        cost={bottleCost}
        remaining={bottlesModal?.remaining ?? 0}
        onClose={() => setBottlesModal(null)}
        onGoShop={goToShop}
      />
    </>
  );
}
