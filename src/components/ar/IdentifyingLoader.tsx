import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';

export function IdentifyingLoader() {
  const opacity = useSharedValue(0.4);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    scale.value = withRepeat(
      withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <Ionicons name="search" size={48} color={colors.neutral[0]} />
      </Animated.View>
      <Text style={styles.text}>Identifying...</Text>
      <Text style={styles.subtext}>Analyzing plant features</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.neutral[0],
  },
  subtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xs,
  },
});
