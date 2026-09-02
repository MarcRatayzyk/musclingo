import { Image, Pressable, View, useWindowDimensions } from "react-native";
import { resolveMediaUrl } from "@/shared/api/client";
import type { QuizQuestion } from "../types";

type Props = {
  question: QuizQuestion;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function HotspotQuestion({ question, selectedId, onSelect }: Props) {
  const { width: screenW } = useWindowDimensions();
  const payload = question.payload;
  const imageUri = resolveMediaUrl(payload?.imageUrl ?? null);
  const imgW = screenW - 48;
  const imgH = Math.min(imgW * 1.1, 280);
  const regions = payload?.regions ?? [];

  if (!imageUri) {
    return null;
  }

  return (
    <View className="mt-4 self-center" style={{ width: imgW, height: imgH }}>
      <Image
        source={{ uri: imageUri }}
        accessibilityLabel="Illustration interactive"
        style={{ width: imgW, height: imgH }}
        resizeMode="contain"
      />
      {regions.map((region) => {
        const answer = question.answers[region.order];
        if (!answer) return null;
        const isSelected = selectedId === answer.id;
        return (
          <Pressable
            key={answer.id}
            onPress={() => onSelect(answer.id)}
            style={{
              position: "absolute",
              left: region.x * imgW,
              top: region.y * imgH,
              width: region.width * imgW,
              height: region.height * imgH,
              borderWidth: 2,
              borderColor: isSelected ? "#7CFFCB" : "rgba(124,255,203,0.45)",
              backgroundColor: isSelected
                ? "rgba(124,255,203,0.25)"
                : "rgba(124,255,203,0.08)",
              borderRadius: 6,
            }}
          />
        );
      })}
    </View>
  );
}
