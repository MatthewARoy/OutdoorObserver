import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MediaItem } from '@/src/types';
import { colors, spacing, borderRadius } from '@/src/theme';

interface MediaRowProps {
  items: MediaItem[];
}

export function MediaRow({ items }: MediaRowProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          {item.type === 'photo' && item.uri !== 'placeholder' ? (
            <Image source={{ uri: item.uri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons
                name={item.type === 'video' ? 'play-circle-outline' : 'image-outline'}
                size={28}
                color={colors.neutral[400]}
              />
            </View>
          )}
          <View style={styles.typeIcon}>
            <Ionicons
              name={item.type === 'video' ? 'videocam' : 'camera'}
              size={12}
              color={colors.neutral[0]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  item: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral[200],
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: colors.overlayDark,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
