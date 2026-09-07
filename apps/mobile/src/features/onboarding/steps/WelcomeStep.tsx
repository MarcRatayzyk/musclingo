import { Image, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MASCOT_IMAGES } from "@/features/mascot/assets";
import { MascotSpeechBubble } from "@/features/mascot";

type Props = {
  onContinue: () => void;
};

const GORILLA_SIZE = 168;

export function WelcomeStep({ onContinue }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 4,
          alignItems: "flex-start",
        }}
      >
        <Animated.View entering={FadeInDown.duration(280)} style={{ width: "100%" }}>
          <MascotSpeechBubble
            pose="present"
            showAvatar={false}
            showName={false}
            tail="bottom"
            tailTipX={GORILLA_SIZE / 2}
            accentColor="#7CFFB2"
            compact={false}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 26,
                lineHeight: 34,
                fontWeight: "700",
              }}
            >
              Bienvenue !
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 19,
                lineHeight: 28,
                marginTop: 10,
              }}
            >
              Je suis Gorille. Ensemble, on découvre l’anatomie, la nutrition et
              l’entraînement.
            </Text>
          </MascotSpeechBubble>
        </Animated.View>

        <View style={{ marginTop: 4 }}>
          <Image
            source={MASCOT_IMAGES.present}
            accessibilityLabel="Gorille"
            resizeMode="contain"
            style={{ width: GORILLA_SIZE, height: GORILLA_SIZE }}
          />
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Commencer"
        onPress={onContinue}
        style={({ pressed }) => ({
          backgroundColor: "#7CFFB2",
          borderRadius: 16,
          paddingVertical: 16,
          opacity: pressed ? 0.88 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "700",
            color: "#0B0D10",
          }}
        >
          Commencer
        </Text>
      </Pressable>
    </View>
  );
}
