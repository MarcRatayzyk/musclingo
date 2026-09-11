import { router } from "expo-router";
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useMe } from "@/features/auth/api";
import { useMiniGames, type MiniGameSummary } from "@/features/mini-games/api";
import { getPathIcon } from "@/features/path/icons";
import { localizeCategoryName } from "@/i18n/categoryNames";
import { Screen } from "@/shared/ui/primitives";
import { RewardsTopBar } from "@/shared/ui/RewardsTopBar";
import { MiniGamesSkeleton } from "@/shared/ui/Skeleton";

const C = {
  ink: "#0A0F14",
  rubber: "#121A22",
  plate: "#1A2430",
  seam: "#2A3848",
  chalk: "#E9E4DA",
  mist: "#8A96A6",
  pulse: "#7CFFB2",
  copper: "#D4894A",
} as const;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function usePressScale() {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return {
    style,
    onPressIn: () => {
      scale.value = withSpring(0.97, { damping: 18, stiffness: 320 });
    },
    onPressOut: () => {
      scale.value = withSpring(1, { damping: 14, stiffness: 260 });
    },
  };
}

function MemoryGlyph({ color }: { color: string }) {
  return (
    <View style={{ width: 24, height: 24, justifyContent: "center", gap: 3 }}>
      <View style={{ flexDirection: "row", gap: 3 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            backgroundColor: color,
            opacity: 0.95,
          }}
        />
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            borderWidth: 1.5,
            borderColor: color,
            opacity: 0.55,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 3 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            borderWidth: 1.5,
            borderColor: color,
            opacity: 0.55,
          }}
        />
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            backgroundColor: color,
            opacity: 0.7,
          }}
        />
      </View>
    </View>
  );
}

function RecordBlock({ score }: { score: number }) {
  const { t } = useTranslation("home");
  return (
    <View style={{ alignItems: "flex-end" }}>
      <Text className="text-[10px] font-semibold" style={{ color: C.copper }}>
        {t("record")}
      </Text>
      <Text
        className="text-xl font-semibold"
        style={{ color: score > 0 ? C.chalk : C.mist }}
      >
        {score}
      </Text>
    </View>
  );
}

function FeaturedMemoryStation({ bestScore }: { bestScore: number }) {
  const { t } = useTranslation("home");
  const press = usePressScale();
  const virgin = bestScore <= 0;

  return (
    <AnimatedPressable
      onPress={() => router.push("/(app)/mini-game/memory" as never)}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      style={[
        press.style,
        {
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: C.plate,
          borderWidth: 1,
          borderColor: C.seam,
        },
      ]}
    >
      <View style={{ height: 3, backgroundColor: C.pulse }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 14,
          paddingVertical: 12,
          gap: 12,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: "rgba(124,255,178,0.12)",
            borderWidth: 1,
            borderColor: "rgba(124,255,178,0.35)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MemoryGlyph color={C.pulse} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text className="text-base font-semibold" style={{ color: C.chalk }}>
            {t("memory")}
          </Text>
          <Text className="mt-0.5 text-xs" style={{ color: C.mist }} numberOfLines={1}>
            {virgin ? t("findPairs") : t("beatRecord")}
          </Text>
        </View>
        <RecordBlock score={bestScore} />
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: 999,
            backgroundColor: C.pulse,
          }}
        >
          <Text className="text-xs font-semibold" style={{ color: C.ink }}>
            {virgin ? t("play") : t("replay")}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

function StationLane({
  game,
  icon,
}: {
  game: MiniGameSummary;
  icon: ImageSourcePropType;
}) {
  const { t } = useTranslation("home");
  const press = usePressScale();
  const virgin = game.gamesPlayed === 0;

  return (
    <AnimatedPressable
      onPress={() =>
        router.push(`/(app)/mini-game/flash/${game.categoryId}` as never)
      }
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      style={[
        press.style,
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
          paddingVertical: 14,
          paddingHorizontal: 14,
          borderRadius: 18,
          backgroundColor: C.rubber,
          borderWidth: 1,
          borderColor: C.seam,
        },
      ]}
    >
      <View
        style={{
          width: 4,
          alignSelf: "stretch",
          borderRadius: 4,
          backgroundColor: game.color,
          marginVertical: 2,
        }}
      />
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          backgroundColor: game.color + "18",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{ width: 26, height: 26, tintColor: game.color }}
        />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          numberOfLines={1}
          className="text-base font-semibold"
          style={{ color: C.chalk }}
        >
          {localizeCategoryName(game.name, game.slug)}
        </Text>
        <Text className="mt-0.5 text-xs" style={{ color: C.mist }}>
          {virgin
            ? t("notPlayedYet")
            : t("gamesPlayed", { count: game.gamesPlayed })}
        </Text>
      </View>
      <RecordBlock score={game.bestScore} />
    </AnimatedPressable>
  );
}

export default function MiniGamesHubScreen() {
  const { t } = useTranslation("home");
  const { data: me } = useMe();
  const { data: games, isLoading } = useMiniGames();

  const flashGames = games ?? [];
  const memoryBest = me?.memoryGameBestScore ?? 0;

  return (
    <Screen className="pt-8">
      <RewardsTopBar />

      <Text className="mb-5 text-3xl font-semibold text-white">
        {t("trainYourMind")}
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28, gap: 18 }}
      >
        <FeaturedMemoryStation bestScore={memoryBest} />

        {isLoading && flashGames.length === 0 ? (
          <View style={{ gap: 10 }}>
            <Text className="mb-0.5 text-sm text-muted">{t("flashQuiz")}</Text>
            <MiniGamesSkeleton />
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            <Text className="mb-0.5 text-sm text-muted">{t("flashQuiz")}</Text>

            {flashGames.map((game) => (
              <StationLane
                key={game.categoryId}
                game={game}
                icon={getPathIcon(game.slug)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
