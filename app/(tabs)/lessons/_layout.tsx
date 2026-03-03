import { Stack } from 'expo-router';
import { colors } from '@/src/theme';

export default function LessonsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary[500] },
        headerTintColor: colors.neutral[0],
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Explore Lessons' }} />
      <Stack.Screen
        name="[lessonId]"
        options={{
          title: 'Lesson Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
