import { Stack } from 'expo-router';
import { colors } from '@/src/theme';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary[500] },
        headerTintColor: colors.neutral[0],
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Profile' }} />
    </Stack>
  );
}
