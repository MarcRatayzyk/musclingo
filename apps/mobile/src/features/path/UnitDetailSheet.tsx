import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import type { CategoryPath, PathGateNode, PathLessonNode } from "./api";

function stateLabel(state: PathLessonNode["state"]) {
  if (state === "available") return "À toi de jouer";
  if (state === "completed") return "Apprise";
  return "Verrouillé";
}

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
  const unit = path.units.find((u) => u.checkpointKey === unitKey);
  const completed = unit
    ? unit.lessons.filter((l) => l.state === "completed").length
    : 0;
  const total = unit?.lessons.length ?? 0;

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
              <Text
                className="text-[11px] font-semibold uppercase tracking-[2px]"
                style={{ color: path.color }}
              >
                Section {unit.checkpointOrder + 1}
              </Text>
              <Text className="mt-1 text-2xl font-semibold text-white">
                {unit.label}
              </Text>
              <Text className="mt-2 text-sm text-muted">
                {completed}/{total} leçons
              </Text>

              <ScrollView
                className="mt-5"
                showsVerticalScrollIndicator={false}
              >
                {unit.lessons.map((lesson) => {
                  const locked = lesson.state === "locked";
                  return (
                    <Pressable
                      key={lesson.id}
                      disabled={locked}
                      onPress={() => {
                        onPressLesson(lesson);
                        onClose();
                      }}
                      className="mb-2 rounded-2xl border border-border bg-elevated px-4 py-3"
                      style={{ opacity: locked ? 0.55 : 1 }}
                    >
                      <Text
                        className={`text-base font-semibold ${
                          locked ? "text-muted" : "text-white"
                        }`}
                      >
                        {lesson.title}
                      </Text>
                      {lesson.subtitle ? (
                        <Text className="mt-0.5 text-sm text-muted" numberOfLines={1}>
                          {lesson.subtitle}
                        </Text>
                      ) : null}
                      <Text
                        className="mt-1 text-xs font-medium"
                        style={{
                          color:
                            lesson.state === "available" ? path.color : "#8B95A8",
                        }}
                      >
                        {stateLabel(lesson.state)}
                      </Text>
                    </Pressable>
                  );
                })}

                {unit.gate ? (
                  <Pressable
                    disabled={unit.gate.state === "locked"}
                    onPress={() => {
                      onPressGate(unit.gate!);
                      onClose();
                    }}
                    className="mb-2 rounded-2xl border border-border bg-elevated px-4 py-3"
                    style={{
                      opacity: unit.gate.state === "locked" ? 0.55 : 1,
                      borderColor: path.color + "66",
                    }}
                  >
                    <Text className="text-base font-semibold text-white">
                      ⚡ {unit.gate.title}
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
                        ? "Termine le thème"
                        : unit.gate.state === "available"
                          ? `${unit.gate.questionCount} Q · ${unit.gate.timeLimitSec}s`
                          : "Validé"}
                    </Text>
                  </Pressable>
                ) : null}
              </ScrollView>
            </>
          ) : null}

          <Pressable onPress={onClose} className="mt-3 py-2">
            <Text className="text-center text-sm text-muted">Fermer</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
