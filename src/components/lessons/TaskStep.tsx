import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';
import { LessonTask } from '@/src/types';

interface TaskStepProps {
  task: LessonTask;
  isCompleted: boolean;
  isCurrent: boolean;
}

const taskTypeIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  find: 'search-outline',
  interact: 'hand-left-outline',
  observe: 'eye-outline',
  animate: 'sparkles-outline',
  reflect: 'journal-outline',
};

export function TaskStep({ task, isCompleted, isCurrent }: TaskStepProps) {
  return (
    <View style={[styles.container, isCurrent && styles.current]}>
      <View style={[styles.circle, isCompleted && styles.circleCompleted]}>
        {isCompleted ? (
          <Ionicons name="checkmark" size={14} color={colors.neutral[0]} />
        ) : (
          <Ionicons
            name={taskTypeIcons[task.type] || 'ellipse-outline'}
            size={14}
            color={isCurrent ? colors.primary[500] : colors.neutral[400]}
          />
        )}
      </View>
      <Text
        style={[
          styles.title,
          isCompleted && styles.titleCompleted,
          isCurrent && styles.titleCurrent,
        ]}
      >
        {task.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  current: {
    backgroundColor: colors.primary[50],
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  circleCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  title: {
    fontSize: 15,
    color: colors.neutral[600],
    flex: 1,
  },
  titleCompleted: {
    color: colors.neutral[400],
    textDecorationLine: 'line-through',
  },
  titleCurrent: {
    color: colors.primary[700],
    fontWeight: '600',
  },
});
