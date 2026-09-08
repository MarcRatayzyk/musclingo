import { Image, Pressable, View } from "react-native";

const ICON_TRUE = require("../../../../assets/icon-true.png");
const ICON_FALSE = require("../../../../assets/icon-false.png");

type Choice = {
  id: string;
  label: string;
};

type Props = {
  choices: Choice[];
  lockedChoiceId: string | null;
  wrongChoiceId: string | null;
  disabled?: boolean;
  onSelect: (id: string) => void;
};

function isTrueLabel(label: string) {
  const n = label.trim().toLowerCase();
  return n === "vrai" || n === "true";
}

function isFalseLabel(label: string) {
  const n = label.trim().toLowerCase();
  return n === "faux" || n === "false";
}

export function TrueFalseQuestion({
  choices,
  lockedChoiceId,
  wrongChoiceId,
  disabled,
  onSelect,
}: Props) {
  const trueChoice = choices.find((c) => isTrueLabel(c.label));
  const falseChoice = choices.find((c) => isFalseLabel(c.label));

  if (!trueChoice || !falseChoice) {
    return null;
  }

  return (
    <View className="mt-8 flex-row gap-4">
      <TfBox
        variant="true"
        choiceId={trueChoice.id}
        lockedChoiceId={lockedChoiceId}
        wrongChoiceId={wrongChoiceId}
        disabled={disabled}
        onSelect={onSelect}
      />
      <TfBox
        variant="false"
        choiceId={falseChoice.id}
        lockedChoiceId={lockedChoiceId}
        wrongChoiceId={wrongChoiceId}
        disabled={disabled}
        onSelect={onSelect}
      />
    </View>
  );
}

function TfBox({
  variant,
  choiceId,
  lockedChoiceId,
  wrongChoiceId,
  disabled,
  onSelect,
}: {
  variant: "true" | "false";
  choiceId: string;
  lockedChoiceId: string | null;
  wrongChoiceId: string | null;
  disabled?: boolean;
  onSelect: (id: string) => void;
}) {
  const isWrong = wrongChoiceId === choiceId;
  const isLocked = lockedChoiceId === choiceId;
  const isTrue = variant === "true";

  const baseBorder = isTrue ? "border-emerald-500" : "border-red-500";
  const baseBg = isTrue ? "bg-emerald-500/15" : "bg-red-500/15";
  const activeBg = isTrue ? "bg-emerald-500/35" : "bg-red-500/35";
  const wrongStyle = "border-red-400 bg-red-500/25 opacity-80";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isTrue ? "Vrai" : "Faux"}
      disabled={disabled}
      onPress={() => onSelect(choiceId)}
      className={`flex-1 items-center justify-center rounded-3xl border-2 py-8 ${
        isWrong
          ? wrongStyle
          : isLocked
            ? `${baseBorder} ${activeBg}`
            : `${baseBorder} ${baseBg}`
      } ${disabled && !isLocked && !isWrong ? "opacity-50" : ""}`}
    >
      <Image
        source={isTrue ? ICON_TRUE : ICON_FALSE}
        style={{
          width: 56,
          height: 56,
          tintColor: isTrue ? "#34D399" : "#F87171",
        }}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />
    </Pressable>
  );
}
