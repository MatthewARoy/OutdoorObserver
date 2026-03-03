import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useLessonStore } from '@/src/stores/useLessonStore';
import { LessonCard } from '@/src/components/lessons/LessonCard';
import { colors, spacing } from '@/src/theme';

export default function LessonListScreen() {
  const router = useRouter();
  const lessons = useLessonStore((s) => s.lessons);
  const progress = useLessonStore((s) => s.progress);

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Discover Nature</Text>
            <Text style={styles.headerSubtitle}>
              Choose a lesson and head outside to explore
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const lessonProgress = progress[item.id];
          const completedCount = lessonProgress?.completedTaskIds.length ?? 0;
          const progressValue = item.tasks.length > 0 ? completedCount / item.tasks.length : 0;

          return (
            <LessonCard
              lesson={item}
              progress={progressValue}
              isCompleted={lessonProgress?.isCompleted ?? false}
              onPress={() => router.push(`/(tabs)/lessons/${item.id}` as any)}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  list: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  header: {
    marginBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary[700],
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
});
