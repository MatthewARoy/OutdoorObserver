import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/src/components/ui/Button';
import { colors, spacing, borderRadius } from '@/src/theme';

interface ObservationPromptProps {
  title: string;
  instruction?: string;
  buttonText?: string;
  onPress?: () => void;
}

export function ObservationPrompt({
  title,
  instruction,
  buttonText = 'Continue',
  onPress,
}: ObservationPromptProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {instruction && <Text style={styles.instruction}>{instruction}</Text>}
        {onPress && (
          <View style={styles.buttonRow}>
            <Button title={buttonText} onPress={onPress} variant="primary" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: spacing.lg,
    right: spacing.lg,
  },
  card: {
    backgroundColor: colors.overlayLight,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary[700],
  },
  instruction: {
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  buttonRow: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
});
