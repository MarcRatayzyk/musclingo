import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useMiniGames } from "@/features/mini-games/api";
import { getPathIcon } from "@/features/path/icons";
import { Screen } from "@/shared/ui/primitives";

type CardItem = {
  key: string;
  title: string;
  color: string;
  icon?: ReturnType<typeof getPathIcon>;
  onPress: () => void;
};

function GameTile({
  index,
  title,
  color,
  icon,
  onPress,
}: {
  index: number;
  title: string;
  color: string;
  icon?: ReturnType<typeof getPathIcon>;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={{ width: "48%" }}>
      <View
        
        
        
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 12,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: color + "55",
          backgroundColor: "#141820",
          paddingHorizontal: 12,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            borderWidth: 2,
            backgroundColor: color + "22",
            borderColor: color,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon ? (
            <Image
              source={icon}
              resizeMode="contain"
              style={{ width: 34, height: 34, tintColor: color }}
            />
          ) : (
            <Text style={{ color, fontSize: 28 }}>▣</Text>
          )}
        </View>
        <Text
          className="mt-3 text-center text-base font-semibold text-white"
          numberOfLines={2}
          style={{ alignSelf: "stretch", textAlign: "center" }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default function MiniGamesHubScreen() {
  const { data: games, isLoading } = useMiniGames();

  const cards: CardItem[] = [
    {
      key: "memory",
      title: "Mémoire",
      color: "#7CFFB2",
      onPress: () => router.push("/(app)/mini-game/memory" as never),
    },
    ...(games ?? []).map((game) => ({
      key: game.categoryId,
      title: game.name,
      color: game.color,
      icon: getPathIcon(game.slug),
      onPress: () =>
        router.push(`/(app)/mini-game/flash/${game.categoryId}` as never),
    })),
  ];

  return (
    <Screen>
      <Text className="text-xs uppercase tracking-[3px] text-accent">
        Mini-jeux
      </Text>
      <Text className="mt-2 mb-6 text-3xl font-semibold text-white">
        Entraîne ta tête
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
        <View className="flex-row flex-wrap justify-between">
          {cards.map((card, index) => (
            <GameTile
              key={card.key}
              index={index}
              title={card.title}
              color={card.color}
              icon={card.icon}
              onPress={card.onPress}
            />
          ))}
        </View>

        {isLoading && (
          <Text className="mt-2 text-sm text-muted">Chargement…</Text>
        )}
      </ScrollView>
    </Screen>
  );
}
