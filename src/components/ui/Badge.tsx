import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '@/src/theme';

interface BadgeProps {
  label: string;
  color?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'sm' | 'md';
}

export function Badge({ label, color = colors.accent[500], icon, size = 'md' }: BadgeProps) {
  const isSmall = size === 'sm';

  return (
    <View style={[styles.base, { backgroundColor: color + '20' }, isSmall && styles.small]}>
      {icon && (
        <Ionicons
          name={icon}
          size={isSmall ? 12 : 14}
          color={color}
          style={{ marginRight: spacing.xs }}
        />
      )}
      <Text style={[styles.text, { color }, isSmall && styles.smallText]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 11,
  },
});
