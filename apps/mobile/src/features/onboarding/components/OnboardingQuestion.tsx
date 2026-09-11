import { Text, View } from "react-native";
import { onboardingType, space } from "../theme";

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

/** Titre d’étape sans eyebrow ALL-CAPS générique. */
export function OnboardingQuestion({ title, subtitle, children }: Props) {
  return (
    <View style={{ marginBottom: space.xl }}>
      <Text style={onboardingType.hero}>{title}</Text>
      {subtitle ? (
        <Text style={{ ...onboardingType.bodyMuted, marginTop: space.sm }}>
          {subtitle}
        </Text>
      ) : null}
      {children}
    </View>
  );
}
