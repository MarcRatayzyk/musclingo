import type { ReactNode } from "react";
import { View } from "react-native";
import { RewardsHud } from "./RewardsHud";

/** Barre haute ressources — même hauteur partout (home, boutique, mini-jeux). */
export function RewardsTopBar({ trailing }: { trailing?: ReactNode }) {
  return (
    <View
      style={{
        width: "100%",
        minHeight: 44,
        paddingTop: 8,
        paddingBottom: 10,
        justifyContent: "center",
      }}
    >
      <RewardsHud size="md" fullWidth trailing={trailing} />
    </View>
  );
}
