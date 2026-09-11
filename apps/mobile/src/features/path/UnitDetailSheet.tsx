import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { localizeCategoryName } from "@/i18n/categoryNames";
import {
  localizeCheckpointTitle,
  localizeLessonTitle,
} from "@/i18n/contentL10n";
import type { CategoryPath, PathGateNode, PathLessonNode } from "./api";

const LOCK_CLOSED = require("../../../assets/lock-closed.png");
const LOCK_OPEN = require("../../../assets/lock-open.png");

export function UnitDetailSheet({
  visible,
  path,
  unitKey,
  onClose,
  onPressLesson,
  onPressGate,
}: {
  visible: boolean;
  path: CategoryPath;
  unitKey: string | null;
  onClose: () => void;
  onPressLesson: (lesson: PathLessonNode) => void;
  onPressGate: (gate: PathGateNode) => void;
}) {
  const { t } = useTranslation("home");
  const unit = path.units.find((u) => u.checkpointKey === unitKey);
  const completed = unit
    ? unit.lessons.filter((l) => l.state === "completed").length
    : 0;
  const total = unit?.lessons.length ?? 0;

  function lessonStateLabel(state: PathLessonNode["state"]) {
    if (state === "available") return t("available");
    if (state === "completed") return t("completed");
    return t("locked");
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-end bg-black/70"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="max-h-[82%] rounded-t-[28px] border-t border-border bg-surface px-5 pb-8 pt-4"
        >
          <View className="mb-4 items-center">
            <View className="h-1 w-12 rounded-full bg-border" />
          </View>

          {unit ? (
            <>
              <Text className="text-[11px] font-semibold uppercase tracking-[2px] text-muted">
                {t("section", { index: unit.checkpointOrder + 1 })}
              </Text>
              <Text className="mt-1 text-2xl font-semibold text-white">
                {localizeCheckpointTitle(unit.label)}
              </Text>
              <Text className="mt-1 text-sm text-muted">
                {completed}/{total} · {localizeCategoryName(path.name, path.slug)}
              </Text>

              <ScrollView
                className="mt-5"
                showsVerticalScrollIndicator={false}
              >
                {unit.lessons.map((lesson) => (
                  <Pressable
                    key={lesson.id}
                    disabled={lesson.state === "locked"}
                    onPress={() => onPressLesson(lesson)}
                    className="mb-2 flex-row items-center justify-between rounded-2xl border border-border bg-elevated px-4 py-3"
                    style={{
                      opacity: lesson.state === "locked" ? 0.55 : 1,
                    }}
                  >
                    <View className="min-w-0 flex-1 pr-3">
                      <Text className="text-base font-semibold text-white">
                        {localizeLessonTitle(lesson.title)}
                      </Text>
                      <Text className="mt-1 text-xs text-muted">
                        {lessonStateLabel(lesson.state)}
                      </Text>
                    </View>
                    <Text className="text-xs font-semibold text-accent">
                      +{lesson.xpReward}
                    </Text>
                  </Pressable>
                ))}

                {unit.gate ? (
                  <Pressable
                    disabled={unit.gate.state === "locked"}
                    onPress={() => onPressGate(unit.gate!)}
                    className="mb-2 mt-2 flex-row items-center gap-3 rounded-2xl border px-4 py-3"
                    style={{
                      opacity: unit.gate.state === "locked" ? 0.55 : 1,
                      backgroundColor: path.color + "18",
                      borderColor: path.color + "66",
                    }}
                  >
                    <Image
                      source={
                        unit.gate.state === "locked" ? LOCK_CLOSED : LOCK_OPEN
                      }
                      accessibilityLabel={
                        unit.gate.state === "locked"
                          ? t("checkpointLocked")
                          : unit.gate.state === "completed"
                            ? t("checkpointPassed")
                            : t("checkpointAvailable")
                      }
                      resizeMode="contain"
                      style={{
                        width: 22,
                        height: 22,
                        tintColor:
                          unit.gate.state === "available"
                            ? path.color
                            : unit.gate.state === "completed"
                              ? path.color
                              : "#8B95A8",
                      }}
                    />
                    <View className="min-w-0 flex-1">
                      <Text className="text-base font-semibold text-white">
                        {localizeCheckpointTitle(unit.gate.title)}
                      </Text>
                      <Text
                        className="mt-1 text-xs font-medium"
                        style={{
                          color:
                            unit.gate.state === "available"
                              ? path.color
                              : "#8B95A8",
                        }}
                      >
                        {unit.gate.state === "locked"
                          ? t("starsToUnlock", {
                              current: unit.gate.themeStars ?? 0,
                              required: unit.gate.themeStarsRequired ?? 0,
                            })
                          : unit.gate.state === "available"
                            ? `${unit.gate.questionCount} Q · ${unit.gate.timeLimitSec}s`
                            : t("validated")}
                      </Text>
                    </View>
                  </Pressable>
                ) : null}
              </ScrollView>
            </>
          ) : null}

          <Pressable onPress={onClose} className="mt-3 py-2">
            <Text className="text-center text-sm text-muted">{t("close")}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
