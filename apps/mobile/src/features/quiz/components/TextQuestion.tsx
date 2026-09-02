import { Image, Text, TextInput, View, useWindowDimensions } from "react-native";
import { resolveMediaUrl } from "@/shared/api/client";
import type { QuizQuestion } from "../types";

type Props = {
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
};

export function TextQuestion({ question, value, onChange }: Props) {
  const { width: screenW } = useWindowDimensions();
  const payload = question.payload;
  const imageUri = resolveMediaUrl(payload?.imageUrl ?? null);
  const colorSwatch = payload?.color;
  const imgW = screenW - 48;

  return (
    <View>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          accessibilityLabel="Illustration du quiz"
          style={{
            width: imgW,
            height: Math.min(imgW * 1.1, 280),
            marginTop: 16,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
      ) : null}

      {colorSwatch ? (
        <View className="mt-4 flex-row items-center gap-3">
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              backgroundColor: colorSwatch,
              borderWidth:
                colorSwatch.toLowerCase() === "#f5f5f5" ? 1 : 0,
              borderColor: "rgba(255,255,255,0.35)",
            }}
          />
          <Text className="text-sm text-muted">Cette couleur</Text>
        </View>
      ) : null}

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Écris le nom de la structure…"
        placeholderTextColor="rgba(255,255,255,0.35)"
        autoCapitalize="none"
        autoCorrect={false}
        className="mt-6 rounded-2xl border border-border bg-surface px-4 py-4 text-base text-white"
      />
    </View>
  );
}
