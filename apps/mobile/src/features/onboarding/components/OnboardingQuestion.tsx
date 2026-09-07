import { Text, View } from "react-native";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function OnboardingQuestion({
  eyebrow,
  title,
  subtitle,
  children,
}: Props) {
  return (
    <View className="mb-5">
      {eyebrow ? (
        <Text className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-accent">
          {eyebrow}
        </Text>
      ) : null}
      <Text className="text-3xl font-semibold leading-9 text-white">
        {title}
      </Text>
      {subtitle ? (
        <Text className="mt-2 text-base leading-6 text-muted">{subtitle}</Text>
      ) : null}
      {children}
    </View>
  );
}
