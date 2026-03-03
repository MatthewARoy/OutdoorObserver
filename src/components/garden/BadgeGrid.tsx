import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge as BadgeComponent } from '@/src/components/ui/Badge';
import { Badge } from '@/src/types';
import { spacing } from '@/src/theme';

interface BadgeGridProps {
  badges: Badge[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <View style={styles.container}>
      {badges.map((badge) => (
        <BadgeComponent
          key={badge.id}
          label={badge.label}
          color={badge.color}
          icon={badge.iconName as any}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
