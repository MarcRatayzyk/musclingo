import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { onboardingColors, onboardingType, radius, space } from "../theme";
import { OnboardingPrimaryButton } from "./OnboardingPrimaryButton";
import { OnboardingFormSkeleton } from "@/shared/ui/Skeleton";

type LoadingProps = {
  message?: string;
};

/** Skeleton onboarding — remplace le spinner générique. */
export function OnboardingLoadingState(_props: LoadingProps) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: space.xl,
        paddingTop: space.xl,
        backgroundColor: onboardingColors.ink,
      }}
    >
      <OnboardingFormSkeleton />
    </View>
  );
}

type EmptyProps = {
  title: string;
  hint: string;
};

export function OnboardingEmptyState({ title, hint }: EmptyProps) {
  return (
    <View
      style={{
        borderRadius: radius.panel,
        borderWidth: 1,
        borderColor: onboardingColors.seam,
        borderStyle: "dashed",
        backgroundColor: onboardingColors.rubber,
        padding: space.xl,
        alignItems: "flex-start",
      }}
    >
      <Text style={onboardingType.title}>{title}</Text>
      <Text style={{ ...onboardingType.bodyMuted, marginTop: space.sm }}>
        {hint}
      </Text>
    </View>
  );
}

type ErrorProps = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
};

export function OnboardingErrorState({
  message,
  actionLabel = "Réessayer",
  onAction,
  compact,
}: ErrorProps) {
  if (compact) {
    return (
      <View
        style={{
          marginTop: space.md,
          borderRadius: radius.tile,
          borderWidth: 1,
          borderColor: onboardingColors.strain,
          backgroundColor: onboardingColors.strainWash,
          paddingHorizontal: space.lg,
          paddingVertical: space.md,
          gap: space.sm,
        }}
      >
        <Text
          style={{
            ...onboardingType.meta,
            color: onboardingColors.strain,
          }}
        >
          {message}
        </Text>
        {onAction ? (
          <Pressable onPress={onAction} accessibilityRole="button">
            <Text
              style={{
                ...onboardingType.label,
                color: onboardingColors.chalk,
              }}
            >
              {actionLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: space.sm,
        gap: space.lg,
      }}
    >
      <Text style={onboardingType.hero}>{message}</Text>
      <Text style={onboardingType.bodyMuted}>
        Vérifie ta connexion, puis relance.
      </Text>
      {onAction ? (
        <OnboardingPrimaryButton label={actionLabel} onPress={onAction} />
      ) : null}
    </View>
  );
}

export function OnboardingInlineSpinner({ label }: { label?: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: space.sm,
        paddingVertical: space.sm,
      }}
    >
      <ActivityIndicator color={onboardingColors.pulse} />
      {label ? <Text style={onboardingType.meta}>{label}</Text> : null}
    </View>
  );
}
