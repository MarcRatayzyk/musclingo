import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import {
  Syne_700Bold,
  Syne_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/syne";

export function useOnboardingFonts() {
  const [loaded] = useFonts({
    Syne_700Bold,
    Syne_800ExtraBold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  return loaded;
}
