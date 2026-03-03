import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius } from '@/src/theme';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export function ProgressBar({
  progress,
  color = colors.primary[500],
  height = 8,
  showLabel = false,
}: ProgressBarProps) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(Math.min(Math.max(progress, 0), 1) * 100, {
      duration: 600,
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View>
      <View style={[styles.track, { height }]}>
        <Animated.View
          style={[styles.fill, { backgroundColor: color, height }, animatedStyle]}
        />
      </View>
      {showLabel && (
        <Text style={styles.label}>{Math.round(progress * 100)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: borderRadius.full,
  },
  label: {
    fontSize: 12,
    color: colors.neutral[600],
    marginTop: spacing.xs,
    textAlign: 'right',
  },
});
