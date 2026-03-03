import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { colors, borderRadius } from '@/src/theme';

interface PlantThumbnailProps {
  imageUri: string;
  onPress: () => void;
  size?: number;
}

export function PlantThumbnail({ imageUri, onPress, size = 100 }: PlantThumbnailProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { width: size, height: size, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primary[200],
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral[200],
  },
});
