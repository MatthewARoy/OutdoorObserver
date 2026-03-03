import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';
import { Lesson } from '@/src/types';

interface LessonCardProps {
  lesson: Lesson;
  progress: number;
  isCompleted: boolean;
  onPress: () => void;
}

const difficultyColors = {
  beginner: colors.success,
  intermediate: colors.accent[500],
  advanced: colors.error,
};

export function LessonCard({ lesson, progress, isCompleted, onPress }: LessonCardProps) {
  return (
    <Card onPress={onPress} style={styles.card}>
      <Image source={{ uri: lesson.thumbnailUri }} style={styles.thumbnail} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{lesson.title}</Text>
          {isCompleted && (
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          )}
        </View>
        <Text style={styles.subtitle} numberOfLines={2}>{lesson.subtitle}</Text>
        <View style={styles.meta}>
          <Badge
            label={lesson.difficulty}
            color={difficultyColors[lesson.difficulty]}
            size="sm"
          />
          <View style={styles.time}>
            <Ionicons name="time-outline" size={14} color={colors.neutral[400]} />
            <Text style={styles.timeText}>{lesson.estimatedMinutes} min</Text>
          </View>
        </View>
        <ProgressBar progress={progress} height={6} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: colors.neutral[200],
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.neutral[800],
    flex: 1,
  },
  subtitle: {
    fontSize: 13,
    color: colors.neutral[600],
    marginTop: 2,
    lineHeight: 18,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.neutral[400],
  },
});
