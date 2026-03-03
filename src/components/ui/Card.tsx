import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '@/src/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'elevated',
  padding = spacing.lg,
  onPress,
  style,
}: CardProps) {
  const variantStyles = {
    elevated: styles.elevated,
    outlined: styles.outlined,
    filled: styles.filled,
  };

  const content = (
    <View style={[styles.base, variantStyles[variant], { padding }, style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral[0],
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  filled: {
    backgroundColor: colors.primary[50],
  },
});
