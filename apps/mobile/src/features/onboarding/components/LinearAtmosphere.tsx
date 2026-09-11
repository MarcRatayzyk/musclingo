import { StyleSheet, View } from "react-native";
import { onboardingColors } from "../theme";

/**
 * Atmosphère fixe : lueur basse « salle » + voile haut.
 * Pas de dégradé décoratif multi-couches / glow SaaS.
 */
export function LinearAtmosphere() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View
        style={{
          position: "absolute",
          left: -40,
          right: -40,
          top: -80,
          height: 220,
          backgroundColor: onboardingColors.pulse,
          opacity: 0.045,
          borderBottomLeftRadius: 200,
          borderBottomRightRadius: 200,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: -20,
          right: -20,
          bottom: -60,
          height: 180,
          backgroundColor: onboardingColors.copper,
          opacity: 0.035,
          borderTopLeftRadius: 160,
          borderTopRightRadius: 160,
        }}
      />
    </View>
  );
}
