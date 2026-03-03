import React, { useEffect } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius } from '@/src/theme';

interface PlantHighlightMarkerProps {
  label: string;
  x: number;
  y: number;
  color?: string;
  isRevealed: boolean;
  onPress: () => void;
}

export function PlantHighlightMarker({
  label,
  x,
  y,
  color = colors.highlight,
  isRevealed,
  onPress,
}: PlantHighlightMarkerProps) {
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (!isRevealed) {
      pulseScale.value = withRepeat(
        withTiming(1.3, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }
  }, [isRevealed]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isRevealed ? 1 : pulseScale.value }],
    opacity: isRevealed ? 0.6 : 1,
  }));

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { left: `${x}%`, top: `${y}%` }]}
    >
      <Animated.View
        style={[
          styles.marker,
          { backgroundColor: color, borderColor: color },
          pulseStyle,
        ]}
      />
      {isRevealed && (
        <View style={styles.tooltip}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: -20,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    backgroundColor: 'rgba(245, 212, 75, 0.5)',
  },
  tooltip: {
    backgroundColor: colors.neutral[800],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
  },
  label: {
    color: colors.neutral[0],
    fontSize: 13,
    fontWeight: '600',
  },
});
