import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '@/src/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const sizeStyles = {
    sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, fontSize: 14 },
    md: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, fontSize: 16 },
    lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing['2xl'], fontSize: 18 },
  };

  const variantStyles = {
    primary: {
      bg: colors.accent[500],
      bgPressed: colors.accent[700],
      text: colors.neutral[0],
    },
    secondary: {
      bg: colors.primary[100],
      bgPressed: colors.primary[200],
      text: colors.primary[700],
    },
    ghost: {
      bg: 'transparent',
      bgPressed: colors.neutral[100],
      text: colors.primary[500],
    },
  };

  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed ? v.bgPressed : v.bg,
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'auto',
        },
        variant === 'secondary' && styles.secondaryBorder,
        style,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={s.fontSize + 2}
          color={v.text}
          style={{ marginRight: spacing.sm }}
        />
      )}
      <Text style={[styles.text, { color: v.text, fontSize: s.fontSize }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xl,
  },
  text: {
    fontWeight: '700',
  },
  secondaryBorder: {
    borderWidth: 1.5,
    borderColor: colors.primary[200],
  },
});
