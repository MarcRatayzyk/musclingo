import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { WATER_BOTTLE_QUIZ_RETRY_COST } from "@muscle-mind/types";
import type { PathLessonNode } from "./api";
import { useStartLesson } from "@/features/home/api";
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
  const startLesson = useStartLesson();
  const [startError, setStartError] = useState<string | null>(null);

  if (!lesson) return null;

  const completed = lesson.state === "completed";
  const quizPending =
    lesson.readingCompleted && lesson.hasQuiz && !lesson.passed;
  const firstRead = !lesson.readingCompleted;
  const lip = darkenHex(color, 0.45);
  const primaryLabel = quizPending
    ? "Faire le quiz"
    : completed
      ? "Revoir"
      : "C'est parti !";

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
        err instanceof Error ? err.message : "Impossible de démarrer";
      setStartError(
        status === 403
          ? message ||
              `Plus assez de bouteilles (${WATER_BOTTLE_COST} nécessaires)`
          : message,
      );
    }
  }

  return (
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
              Récompense
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
              {lesson.title}
            </Text>
            {lesson.subtitle ? (
              <Text
                style={{
                  color: "#8B95A8",
                  fontSize: 15,
                  textAlign: "center",
                  lineHeight: 22,
                  marginTop: 8,
                }}
              >
                {lesson.subtitle}
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
                    label="Faire le quiz"
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
                      Revoir la leçon
                    </Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <SolidButton
                    label={
                      startLesson.isPending ? "…" : primaryLabel
                    }
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
                            −{WATER_BOTTLE_COST}
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
                        Refaire le quiz
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
  );
}
