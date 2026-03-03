import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLessonStore } from '@/src/stores/useLessonStore';
import { useGardenStore } from '@/src/stores/useGardenStore';
import { Card } from '@/src/components/ui/Card';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { colors, spacing, borderRadius } from '@/src/theme';

export default function ProfileScreen() {
  const lessons = useLessonStore((s) => s.lessons);
  const progress = useLessonStore((s) => s.progress);
  const entries = useGardenStore((s) => s.entries);

  const completedLessons = Object.values(progress).filter((p) => p.isCompleted).length;
  const totalBadges = entries.reduce((sum, e) => sum + e.badges.length, 0);
  const overallProgress = lessons.length > 0 ? completedLessons / lessons.length : 0;

  const stats = [
    {
      icon: 'book-outline' as const,
      label: 'Lessons Completed',
      value: `${completedLessons}/${lessons.length}`,
      color: colors.primary[500],
    },
    {
      icon: 'flower-outline' as const,
      label: 'Plants Collected',
      value: `${entries.length}`,
      color: colors.success,
    },
    {
      icon: 'ribbon-outline' as const,
      label: 'Badges Earned',
      value: `${totalBadges}`,
      color: colors.accent[500],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color={colors.neutral[0]} />
        </View>
        <Text style={styles.name}>Nature Explorer</Text>
        <Text style={styles.subtitle}>Beginner Botanist</Text>
      </View>

      <View style={styles.content}>
        <Card variant="elevated" style={styles.progressCard}>
          <Text style={styles.progressTitle}>Overall Progress</Text>
          <ProgressBar progress={overallProgress} height={10} showLabel />
        </Card>

        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <Card key={stat.label} variant="outlined" style={styles.statCard}>
              <Ionicons name={stat.icon} size={28} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Settings</Text>
        <Card variant="outlined" style={styles.settingsCard}>
          {[
            { icon: 'notifications-outline', label: 'Notifications' },
            { icon: 'moon-outline', label: 'Dark Mode' },
            { icon: 'information-circle-outline', label: 'About' },
            { icon: 'help-circle-outline', label: 'Help & Support' },
          ].map((item) => (
            <View key={item.label} style={styles.settingsRow}>
              <Ionicons name={item.icon as any} size={22} color={colors.neutral[600]} />
              <Text style={styles.settingsLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.neutral[400]} />
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing['3xl'] + 20,
    paddingBottom: spacing.xl,
    backgroundColor: colors.primary[500],
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary[200],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.neutral[0],
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.neutral[0],
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: 14,
    color: colors.primary[100],
    marginTop: spacing.xs,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  progressCard: {
    padding: spacing.xl,
    marginTop: -spacing.xl,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.neutral[800],
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: 11,
    color: colors.neutral[400],
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    gap: spacing.md,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.neutral[800],
  },
});
