import { Stack } from 'expo-router';
import { colors } from '@/src/theme';

export default function GardenLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary[500] },
        headerTintColor: colors.neutral[0],
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'My Garden' }} />
      <Stack.Screen
        name="[plantId]"
        options={{
          title: 'Plant Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
