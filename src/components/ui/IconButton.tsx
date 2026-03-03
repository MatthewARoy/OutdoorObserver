import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface IconButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function IconButton({
  iconName,
  onPress,
  size = 24,
  color = colors.neutral[0],
  backgroundColor = colors.overlayDark,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
