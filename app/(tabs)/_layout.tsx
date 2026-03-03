import { Tabs, useRouter } from 'expo-router';
import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

function HomeTabButton() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.replace('/' as any)}
      style={({ pressed }) => [
        homeStyles.button,
        pressed && homeStyles.buttonPressed,
      ]}
    >
      <View style={homeStyles.circle}>
        <Ionicons name="home" size={26} color={colors.neutral[0]} />
      </View>
    </Pressable>
  );
}

const homeStyles = StyleSheet.create({
  button: {
    top: -18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 3,
    borderColor: colors.neutral[0],
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.neutral[400],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.neutral[0],
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Lessons',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarButton: () => <HomeTabButton />,
        }}
        listeners={{
          tabPress: (e) => e.preventDefault(),
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          title: 'My Garden',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flower-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
