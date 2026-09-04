import { Modal, Pressable, Text, View } from "react-native";
import type { PathLessonNode } from "./api";
import { NeuroliftAmount } from "@/shared/ui/Neurolift";

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
}: {
  label: string;
  color: string;
  lip: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: lip,
        paddingBottom: 5,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          alignItems: "center",
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
  if (!lesson) return null;

  const completed = lesson.state === "completed";
  const quizPending =
    lesson.readingCompleted && lesson.hasQuiz && !lesson.passed;
  const lip = darkenHex(color, 0.45);
  const primaryLabel = quizPending
    ? "Faire le quiz"
    : completed
      ? "Revoir"
      : "C'est parti !";

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
            shadowColor: color,
            shadowOpacity: 0.4,
            shadowRadius: 28,
            shadowOffset: { width: 0, height: 12 },
            elevation: 20,
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
            {completed && lesson.bestStars != null ? (
              <View style={{ flexDirection: "row", gap: 4, marginTop: 10 }}>
                {[1, 2, 3].map((n) => (
                  <Text
                    key={n}
                    style={{
                      color,
                      fontSize: 16,
                      opacity: n <= (lesson.bestStars ?? 0) ? 1 : 0.25,
                    }}
                  >
                    ★
                  </Text>
                ))}
              </View>
            ) : null}
            {quizPending ? (
              <Text
                style={{
                  marginTop: 10,
                  color: color,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Leçon lue — quiz à faire
              </Text>
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
                    onPress={() => onStart(lesson)}
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
                <SolidButton
                  label={primaryLabel}
                  color={color}
                  lip={lip}
                  onPress={() => onStart(lesson)}
                />
              )}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
