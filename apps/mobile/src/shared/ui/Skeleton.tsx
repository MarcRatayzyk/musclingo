import { useEffect, type ReactNode } from "react";
import { View, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useReducedMotion } from "@/features/onboarding/useReducedMotion";

const BONE = "#1A2430";

type BoneProps = {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: ViewStyle;
  className?: string;
};

/** Bloc de base animé (pulse). */
export function SkeletonBone({
  width = "100%",
  height = 14,
  radius = 10,
  style,
  className,
}: BoneProps) {
  const reduced = useReducedMotion();
  const opacity = useSharedValue(0.55);

  useEffect(() => {
    if (reduced) {
      opacity.value = 0.55;
      return;
    }
    opacity.value = withRepeat(
      withTiming(1, { duration: 750, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, [reduced, opacity]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className={className}
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: BONE,
        },
        animStyle,
        style,
      ]}
    />
  );
}

function Row({
  children,
  gap = 12,
  style,
}: {
  children: ReactNode;
  gap?: number;
  style?: ViewStyle;
}) {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center", gap }, style]}>
      {children}
    </View>
  );
}

/** Splash / bootstrap app. */
export function BootSkeleton() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0A0F14",
        paddingHorizontal: 24,
        paddingTop: 80,
        gap: 20,
      }}
    >
      <Row style={{ justifyContent: "space-between" }}>
        <SkeletonBone width={72} height={28} radius={14} />
        <SkeletonBone width={72} height={28} radius={14} />
        <SkeletonBone width={72} height={28} radius={14} />
      </Row>
      <SkeletonBone
        width="55%"
        height={28}
        radius={10}
        style={{ marginTop: 24 }}
      />
      <SkeletonBone width="100%" height={56} radius={16} />
      <View style={{ alignItems: "center", gap: 28, marginTop: 32 }}>
        {[0, 1, 2].map((i) => (
          <SkeletonBone key={i} width={64} height={64} radius={32} />
        ))}
      </View>
    </View>
  );
}

/** Accueil / parcours : bandeau + nœuds. */
export function HomeSkeleton() {
  return (
    <View style={{ gap: 18, paddingTop: 8 }}>
      <SkeletonBone width="100%" height={56} radius={16} />
      <View style={{ alignItems: "center", gap: 28, paddingVertical: 20 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={{
              alignItems: i % 2 === 0 ? "flex-start" : "flex-end",
              width: "100%",
              paddingHorizontal: 28 + (i % 3) * 18,
            }}
          >
            <SkeletonBone width={64} height={64} radius={32} />
          </View>
        ))}
      </View>
    </View>
  );
}

/** Liste de cartes catégorie. */
export function CategoriesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View style={{ gap: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#2A3848",
            backgroundColor: "#121A22",
            padding: 16,
            gap: 10,
          }}
        >
          <Row>
            <SkeletonBone width={48} height={48} radius={14} />
            <View style={{ flex: 1, gap: 8 }}>
              <SkeletonBone width="55%" height={16} />
              <SkeletonBone width="35%" height={10} />
            </View>
          </Row>
          <SkeletonBone width="100%" height={8} radius={99} />
        </View>
      ))}
    </View>
  );
}

/** Profil : placeholder radar de progression. */
export function RadarSkeleton() {
  return (
    <View
      style={{
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#2A3848",
        backgroundColor: "#121A22",
        paddingVertical: 28,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SkeletonBone width={220} height={220} radius={110} />
    </View>
  );
}

/** Profil : carte identité + stats. */
export function ProfileSkeleton() {
  return (
    <View style={{ gap: 16, marginTop: 24 }}>
      <View
        style={{
          borderRadius: 24,
          borderWidth: 1,
          borderColor: "#2A3848",
          backgroundColor: "#121A22",
          padding: 20,
          gap: 16,
        }}
      >
        <Row gap={16}>
          <SkeletonBone width={64} height={64} radius={32} />
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonBone width="60%" height={18} />
            <SkeletonBone width="80%" height={12} />
          </View>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <SkeletonBone width={64} height={36} radius={10} />
          <SkeletonBone width={64} height={36} radius={10} />
          <SkeletonBone width={64} height={36} radius={10} />
        </Row>
        <SkeletonBone width="100%" height={10} radius={99} />
      </View>
      <SkeletonBone width="40%" height={14} />
      <RadarSkeleton />
    </View>
  );
}

/** Boutique : hero + offres. */
export function ShopSkeleton() {
  return (
    <View style={{ gap: 14, marginTop: 12 }}>
      <SkeletonBone width="100%" height={160} radius={24} />
      <SkeletonBone width="100%" height={100} radius={20} />
      <SkeletonBone width="45%" height={18} style={{ marginTop: 8 }} />
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#2A3848",
            backgroundColor: "#141820",
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonBone width="50%" height={16} />
            <SkeletonBone width="70%" height={12} />
          </View>
          <SkeletonBone width={88} height={48} radius={14} />
        </View>
      ))}
    </View>
  );
}

/** Hub mini-jeux — lanes quiz flash (sans la station mémoire). */
export function MiniGamesSkeleton() {
  return (
    <View style={{ gap: 10 }}>
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          style={{
            borderRadius: 18,
            borderWidth: 1,
            borderColor: "#2A3848",
            backgroundColor: "#121A22",
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
        >
          <SkeletonBone width={4} height={44} radius={4} />
          <SkeletonBone width={48} height={48} radius={14} />
          <View style={{ flex: 1, gap: 6 }}>
            <SkeletonBone width="45%" height={14} />
            <SkeletonBone width="30%" height={10} />
          </View>
          <SkeletonBone width={40} height={28} radius={8} />
        </View>
      ))}
    </View>
  );
}

/** Leçon : barre + zone texte. */
export function LessonSkeleton() {
  return (
    <View style={{ flex: 1, gap: 20, paddingTop: 8 }}>
      <SkeletonBone width="100%" height={6} radius={99} />
      <View style={{ flex: 1, justifyContent: "center", gap: 14, paddingHorizontal: 8 }}>
        <SkeletonBone width="90%" height={18} />
        <SkeletonBone width="100%" height={18} />
        <SkeletonBone width="75%" height={18} />
        <SkeletonBone width="95%" height={18} />
        <SkeletonBone width="60%" height={18} />
      </View>
      <SkeletonBone width="100%" height={52} radius={16} />
    </View>
  );
}

/** Quiz / checkpoint. */
export function QuizSkeleton() {
  return (
    <View style={{ gap: 18, paddingTop: 12 }}>
      <Row style={{ justifyContent: "space-between" }}>
        <SkeletonBone width={80} height={14} />
        <SkeletonBone width={48} height={14} />
      </Row>
      <SkeletonBone width="100%" height={8} radius={99} />
      <SkeletonBone width="85%" height={22} style={{ marginTop: 12 }} />
      <SkeletonBone width="70%" height={22} />
      <View style={{ gap: 10, marginTop: 16 }}>
        {[0, 1, 2, 3].map((i) => (
          <SkeletonBone key={i} width="100%" height={56} radius={16} />
        ))}
      </View>
    </View>
  );
}

/** Roadmap niveaux. */
export function LevelRoadmapSkeleton() {
  return (
    <View style={{ gap: 14, marginTop: 8 }}>
      <View
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#2A3848",
          backgroundColor: "#121A22",
          padding: 16,
          gap: 12,
        }}
      >
        <Row gap={14}>
          <SkeletonBone width={56} height={56} radius={28} />
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonBone width="40%" height={16} />
            <SkeletonBone width="100%" height={10} radius={99} />
          </View>
        </Row>
      </View>
      {[0, 1, 2, 3, 4].map((i) => (
        <View
          key={i}
          style={{
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#2A3848",
            backgroundColor: "#121A22",
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <SkeletonBone width={36} height={36} radius={18} />
          <View style={{ flex: 1, gap: 6 }}>
            <SkeletonBone width="35%" height={12} />
            <SkeletonBone width="55%" height={10} />
          </View>
        </View>
      ))}
    </View>
  );
}

/** Setup mini-jeu flash. */
export function FlashGameSkeleton() {
  return (
    <View style={{ gap: 16 }}>
      <SkeletonBone width="100%" height={140} radius={28} />
      <SkeletonBone width="50%" height={14} />
      <Row gap={10}>
        {[0, 1, 2].map((i) => (
          <SkeletonBone key={i} width={100} height={72} radius={16} style={{ flex: 1 }} />
        ))}
      </Row>
      <SkeletonBone width="100%" height={52} radius={16} />
    </View>
  );
}

/** Onboarding. */
export function OnboardingFormSkeleton() {
  return (
    <View style={{ flex: 1, gap: 16, paddingTop: 24 }}>
      <SkeletonBone width={64} height={64} radius={32} />
      <SkeletonBone width="80%" height={28} />
      <SkeletonBone width="60%" height={14} />
      <View style={{ gap: 10, marginTop: 12 }}>
        {[0, 1, 2].map((i) => (
          <SkeletonBone key={i} width="100%" height={64} radius={16} />
        ))}
      </View>
      <View style={{ flex: 1 }} />
      <SkeletonBone width="100%" height={52} radius={16} />
    </View>
  );
}
