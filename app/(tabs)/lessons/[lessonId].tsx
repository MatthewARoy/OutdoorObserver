import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLessonStore, LessonProgress } from '@/src/stores/useLessonStore';
import { TaskStep } from '@/src/components/lessons/TaskStep';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';

const DEFAULT_PROGRESS: LessonProgress = {
  lessonId: '',
  currentTaskIndex: 0,
  completedTaskIds: [],
  isCompleted: false,
};

export default function LessonDetailScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();

  const lesson = useLessonStore((s) => s.lessons.find((l) => l.id === lessonId));
  const progress = useLessonStore((s) => s.progress[lessonId!] ?? DEFAULT_PROGRESS);
  const selectLesson = useLessonStore((s) => s.selectLesson);

  if (!lesson) {
    return (
      <View style={styles.centered}>
        <Text>Lesson not found</Text>
      </View>
    );
  }

  const completedCount = progress.completedTaskIds.length;
  const progressValue = lesson.tasks.length > 0 ? completedCount / lesson.tasks.length : 0;

  const handleStartLesson = () => {
    selectLesson(lesson.id);
    router.push(`/ar/${lesson.id}` as any);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: lesson.thumbnailUri }} style={styles.heroImage} />

      <View style={styles.content}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.subtitle}>{lesson.subtitle}</Text>

        <View style={styles.metaRow}>
          <Badge label={lesson.difficulty} color={colors.primary[500]} size="sm" />
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={colors.neutral[400]} />
            <Text style={styles.metaText}>{lesson.estimatedMinutes} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="list-outline" size={16} color={colors.neutral[400]} />
            <Text style={styles.metaText}>{lesson.tasks.length} tasks</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            Progress: {completedCount}/{lesson.tasks.length} tasks
          </Text>
          <ProgressBar progress={progressValue} height={8} />
        </View>

        <Text style={styles.description}>{lesson.description}</Text>

        <Text style={styles.sectionTitle}>Lesson Tasks</Text>
        <View style={styles.taskList}>
          {lesson.tasks.map((task, index) => (
            <TaskStep
              key={task.id}
              task={task}
              isCompleted={progress.completedTaskIds.includes(task.id)}
              isCurrent={index === progress.currentTaskIndex && !progress.isCompleted}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={progress.isCompleted ? 'Review Lesson' : 'Start Lesson'}
            onPress={handleStartLesson}
            size="lg"
            fullWidth
            icon={progress.isCompleted ? 'refresh-outline' : 'play'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: 220,
    backgroundColor: colors.neutral[200],
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary[700],
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: colors.neutral[400],
  },
  progressSection: {
    marginTop: spacing.xl,
  },
  progressLabel: {
    fontSize: 13,
    color: colors.neutral[600],
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.neutral[600],
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
    marginTop: spacing['2xl'],
    marginBottom: spacing.md,
  },
  taskList: {
    gap: spacing.xs,
  },
  buttonContainer: {
    marginTop: spacing['2xl'],
    marginBottom: spacing['3xl'],
  },
});
