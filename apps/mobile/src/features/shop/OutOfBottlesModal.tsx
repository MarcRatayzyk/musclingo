import { Modal, Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { WaterBottleIcon } from "@/shared/ui/WaterBottle";

type Props = {
  visible: boolean;
  cost: number;
  remaining: number;
  onClose: () => void;
  onGoShop: () => void;
};

export function OutOfBottlesModal({
  visible,
  cost,
  remaining,
  onClose,
  onGoShop,
}: Props) {
  const { t } = useTranslation();
  const shortfall = Math.max(0, cost - remaining);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.86)",
          paddingHorizontal: 24,
        }}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 340,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.12)",
            backgroundColor: "#121820",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 22,
              paddingTop: 28,
              paddingBottom: 20,
              backgroundColor: "#1A2332",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255,255,255,0.06)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
              }}
            >
              <WaterBottleIcon size={36} />
              <Text
                style={{
                  color: "#5BCfff",
                  fontSize: 28,
                  fontWeight: "800",
                }}
              >
                {remaining}
              </Text>
              <Text
                style={{
                  color: "#8B95A8",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                / {cost}
              </Text>
            </View>
            <Text
              style={{
                color: "#5BCfff",
                fontSize: 11,
                fontWeight: "800",
                letterSpacing: 1.6,
                textTransform: "uppercase",
              }}
            >
              {t("shop:outOfBottlesEyebrow")}
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 22,
              paddingTop: 20,
              paddingBottom: 22,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: "700",
                textAlign: "center",
                lineHeight: 28,
              }}
            >
              {t("shop:outOfBottlesTitle")}
            </Text>
            <Text
              style={{
                color: "#8B95A8",
                fontSize: 15,
                textAlign: "center",
                lineHeight: 22,
                marginTop: 10,
              }}
            >
              {t("shop:outOfBottlesBody", {
                cost,
                remaining,
                shortfall,
              })}
            </Text>

            <View style={{ marginTop: 22, gap: 10 }}>
              <Pressable
                onPress={onGoShop}
                accessibilityRole="button"
                accessibilityLabel={t("shop:outOfBottlesCta")}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  paddingVertical: 15,
                  backgroundColor: "#5BCfff",
                }}
              >
                <Text
                  style={{
                    color: "#0B0F14",
                    fontSize: 16,
                    fontWeight: "800",
                    letterSpacing: 0.4,
                  }}
                >
                  {t("shop:outOfBottlesCta")}
                </Text>
              </Pressable>
              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                style={{
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={{
                    color: "#8B95A8",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {t("shop:outOfBottlesLater")}
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
