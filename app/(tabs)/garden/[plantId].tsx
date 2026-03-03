import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGardenStore } from '@/src/stores/useGardenStore';
import { BadgeGrid } from '@/src/components/garden/BadgeGrid';
import { MediaRow } from '@/src/components/garden/MediaRow';
import { Card } from '@/src/components/ui/Card';
import { colors, spacing, borderRadius } from '@/src/theme';

export default function PlantDetailScreen() {
  const { plantId } = useLocalSearchParams<{ plantId: string }>();
  const entry = useGardenStore((s) => s.entries.find((e) => e.plantId === plantId));
  const plant = useGardenStore((s) => s.plants.find((p) => p.id === plantId));

  if (!plant) {
    return (
      <View style={styles.centered}>
        <Text>Plant not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: plant.imageUri }} style={styles.heroImage} />

      <View style={styles.content}>
        <Text style={styles.commonName}>{plant.commonName}</Text>
        <Text style={styles.scientificName}>{plant.scientificName}</Text>
        <Text style={styles.description}>{plant.description}</Text>

        {entry && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.sectionTitle}>You collected...</Text>
              </View>
              <Text style={styles.collectedDate}>
                {new Date(entry.collectedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </View>

            {entry.mediaItems.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Photos & Media</Text>
                <MediaRow items={entry.mediaItems} />
              </View>
            )}

            {entry.badges.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Badges Earned</Text>
                <BadgeGrid badges={entry.badges} />
              </View>
            )}

            {entry.keyPointsLearned.length > 0 && (
              <Card variant="filled" style={styles.section}>
                <Text style={styles.sectionTitle}>Key Points Learned</Text>
                {entry.keyPointsLearned.map((point, i) => (
                  <View key={i} style={styles.keyPoint}>
                    <Ionicons name="leaf" size={14} color={colors.primary[500]} />
                    <Text style={styles.keyPointText}>{point}</Text>
                  </View>
                ))}
              </Card>
            )}

            {entry.personalNotes ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Notes</Text>
                <Text style={styles.notes}>{entry.personalNotes}</Text>
              </View>
            ) : null}
          </>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plant Parts</Text>
          {plant.parts.map((part) => (
            <Card key={part.id} variant="outlined" style={styles.partCard}>
              <Text style={styles.partName}>{part.name}</Text>
              <Text style={styles.partDescription}>{part.description}</Text>
              <View style={styles.factRow}>
                <Ionicons name="bulb-outline" size={14} color={colors.accent[500]} />
                <Text style={styles.factText}>{part.learnedFact}</Text>
              </View>
            </Card>
          ))}
        </View>

        <Card variant="filled" style={{ ...styles.section, ...styles.funFact }}>
          <View style={styles.funFactHeader}>
            <Ionicons name="sparkles" size={18} color={colors.accent[500]} />
            <Text style={styles.funFactLabel}>Fun Fact</Text>
          </View>
          <Text style={styles.funFactText}>{plant.funFact}</Text>
        </Card>
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
    height: 250,
    backgroundColor: colors.neutral[200],
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  commonName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary[700],
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.neutral[400],
    marginTop: spacing.xs,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.neutral[600],
    marginTop: spacing.md,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: spacing.md,
  },
  collectedDate: {
    fontSize: 13,
    color: colors.neutral[400],
    marginTop: spacing.xs,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  keyPointText: {
    fontSize: 14,
    color: colors.neutral[600],
    flex: 1,
    lineHeight: 20,
  },
  notes: {
    fontSize: 14,
    color: colors.neutral[600],
    fontStyle: 'italic',
    lineHeight: 22,
  },
  partCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  partName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary[700],
  },
  partDescription: {
    fontSize: 13,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginTop: spacing.sm,
    backgroundColor: colors.accent[100],
    padding: spacing.md,
    borderRadius: borderRadius.sm,
  },
  factText: {
    fontSize: 13,
    color: colors.accent[700],
    flex: 1,
    lineHeight: 18,
  },
  funFact: {
    padding: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  funFactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  funFactLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.accent[500],
  },
  funFactText: {
    fontSize: 15,
    color: colors.neutral[800],
    lineHeight: 22,
  },
});
