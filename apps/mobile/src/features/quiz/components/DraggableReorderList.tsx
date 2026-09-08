import { useCallback, useEffect, useRef } from "react";
import { Platform, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const GAP = 10;
const ROW_H = 54;

const SPRING = {
  damping: 20,
  stiffness: 260,
  mass: 0.65,
};

type RowBox = { index: number; y: number; height: number };

type Props<T extends { id: string }> = {
  items: T[];
  onReorder: (ids: string[]) => void;
  disabled?: boolean;
  wrong?: boolean;
  onDraggingChange?: (dragging: boolean) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  hint?: string;
};

function ReorderRow<T extends { id: string }>({
  item,
  index,
  count,
  disabled,
  wrong,
  activeIndex,
  dragY,
  hoverIndex,
  getRowLayouts,
  onDragEnd,
  onDraggingChange,
  renderItem,
}: {
  item: T;
  index: number;
  count: number;
  disabled?: boolean;
  wrong?: boolean;
  activeIndex: SharedValue<number>;
  dragY: SharedValue<number>;
  hoverIndex: SharedValue<number>;
  getRowLayouts: () => RowBox[];
  onDragEnd: (from: number, to: number) => void;
  onDraggingChange?: (dragging: boolean) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const scale = useSharedValue(1);
  const z = useSharedValue(1);

  const setDragging = useCallback(
    (value: boolean) => onDraggingChange?.(value),
    [onDraggingChange],
  );

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .activateAfterLongPress(140)
    .onBegin(() => {
      activeIndex.value = index;
      hoverIndex.value = index;
      dragY.value = 0;
      scale.value = withSpring(1.05, SPRING);
      z.value = 40;
      runOnJS(setDragging)(true);
    })
    .onUpdate((e) => {
      dragY.value = e.translationY;
      const layouts = getRowLayouts();
      let target = index;
      if (layouts.length > 0) {
        let best = Number.POSITIVE_INFINITY;
        for (const row of layouts) {
          const mid = row.y + row.height / 2;
          const dist = Math.abs(e.absoluteY - mid);
          if (dist < best) {
            best = dist;
            target = row.index;
          }
        }
      } else {
        const step = ROW_H + GAP;
        target = Math.round(index + e.translationY / step);
      }
      hoverIndex.value = Math.max(0, Math.min(count - 1, target));
    })
    .onEnd(() => {
      runOnJS(onDragEnd)(index, hoverIndex.value);
    })
    .onFinalize(() => {
      dragY.value = withSpring(0, SPRING);
      scale.value = withSpring(1, SPRING);
      activeIndex.value = -1;
      hoverIndex.value = -1;
      z.value = 1;
      runOnJS(setDragging)(false);
    });

  const style = useAnimatedStyle(() => {
    const from = activeIndex.value;
    const to = hoverIndex.value;
    const isActive = from === index;

    if (isActive) {
      return {
        transform: [{ translateY: dragY.value }, { scale: scale.value }],
        zIndex: z.value,
        elevation: 14,
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        borderColor: "#7CFFB2",
      };
    }

    let shift = 0;
    if (from >= 0 && to >= 0 && from !== to) {
      const step = ROW_H + GAP;
      if (from < to && index > from && index <= to) shift = -step;
      else if (from > to && index >= to && index < from) shift = step;
    }

    return {
      transform: [{ translateY: withSpring(shift, SPRING) }, { scale: 1 }],
      zIndex: 1,
      elevation: 0,
      shadowOpacity: 0,
      borderColor: wrong ? "#EF4444" : "#2A3344",
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          style,
          {
            height: ROW_H,
            marginBottom: GAP,
            borderRadius: 14,
            borderWidth: 1.5,
            backgroundColor: wrong ? "rgba(239,68,68,0.12)" : "#151A24",
            justifyContent: "center",
            paddingHorizontal: 14,
          },
          Platform.OS === "web"
            ? ({
                cursor: disabled ? "default" : "grab",
                touchAction: "none",
                userSelect: "none",
              } as never)
            : null,
        ]}
      >
        <View pointerEvents="none">{renderItem(item, index)}</View>
      </Animated.View>
    </GestureDetector>
  );
}

export function DraggableReorderList<T extends { id: string }>({
  items,
  onReorder,
  disabled = false,
  wrong = false,
  onDraggingChange,
  renderItem,
  hint = "Maintiens puis glisse pour réordonner",
}: Props<T>) {
  const activeIndex = useSharedValue(-1);
  const dragY = useSharedValue(0);
  const hoverIndex = useSharedValue(-1);
  const rowNodes = useRef<Record<number, View | null>>({});
  const rowLayouts = useRef<RowBox[]>([]);

  const measureRows = useCallback(() => {
    Object.entries(rowNodes.current).forEach(([indexStr, node]) => {
      const index = Number(indexStr);
      node?.measureInWindow((_x, y, _w, height) => {
        if (height <= 0) return;
        rowLayouts.current = [
          ...rowLayouts.current.filter((r) => r.index !== index),
          { index, y, height },
        ];
      });
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(measureRows, 16);
    return () => clearTimeout(t);
  }, [items, measureRows]);

  const getRowLayouts = useCallback(() => rowLayouts.current, []);

  const onDragEnd = useCallback(
    (from: number, toRaw: number) => {
      const to = Math.max(0, Math.min(toRaw, items.length - 1));
      if (from === to || from < 0) return;
      const next = items.map((i) => i.id);
      const [moved] = next.splice(from, 1);
      if (!moved) return;
      next.splice(to, 0, moved);
      onReorder(next);
    },
    [items, onReorder],
  );

  return (
    <View onLayout={measureRows}>
      {items.map((item, index) => (
        <View
          key={item.id}
          collapsable={false}
          ref={(node) => {
            rowNodes.current[index] = node;
          }}
          onLayout={measureRows}
        >
          <ReorderRow
            item={item}
            index={index}
            count={items.length}
            disabled={disabled}
            wrong={wrong}
            activeIndex={activeIndex}
            dragY={dragY}
            hoverIndex={hoverIndex}
            getRowLayouts={getRowLayouts}
            onDragEnd={onDragEnd}
            onDraggingChange={onDraggingChange}
            renderItem={renderItem}
          />
        </View>
      ))}
      {hint ? (
        <Text className="mt-1 text-center text-xs text-muted">{hint}</Text>
      ) : null}
    </View>
  );
}
