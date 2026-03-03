import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSpring,
  Easing,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';
import Svg, { Path, Circle, Ellipse, G, Line } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CIRCLE_SIZE = SCREEN_WIDTH * 0.42;

function LeafBanner() {
  return (
    <View style={bannerStyles.container}>
      <Svg width={SCREEN_WIDTH} height={70} viewBox={`0 0 ${SCREEN_WIDTH} 70`}>
        {/* Vine line */}
        <Path
          d={`M 0 45 Q ${SCREEN_WIDTH * 0.15} 20, ${SCREEN_WIDTH * 0.3} 35 Q ${SCREEN_WIDTH * 0.45} 50, ${SCREEN_WIDTH * 0.55} 30 Q ${SCREEN_WIDTH * 0.7} 10, ${SCREEN_WIDTH * 0.85} 35 Q ${SCREEN_WIDTH * 0.95} 50, ${SCREEN_WIDTH} 40`}
          stroke="#7BA887"
          strokeWidth={1.5}
          fill="none"
        />
        {/* Leaves along the vine */}
        {[0.08, 0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88].map((pos, i) => {
          const x = SCREEN_WIDTH * pos;
          const y = 25 + Math.sin(pos * Math.PI * 3) * 15;
          const rotation = -30 + (i % 3) * 30;
          return (
            <G key={i} transform={`translate(${x}, ${y}) rotate(${rotation})`}>
              <Path
                d="M 0 0 Q 6 -10 0 -18 Q -6 -10 0 0"
                fill={i % 2 === 0 ? '#8FBC8F' : '#A8CCA8'}
                opacity={0.8}
              />
              <Line x1={0} y1={0} x2={0} y2={-16} stroke="#7BA887" strokeWidth={0.5} />
            </G>
          );
        })}
        {/* Second row of leaves slightly offset */}
        {[0.13, 0.23, 0.33, 0.43, 0.53, 0.63, 0.73, 0.83, 0.93].map((pos, i) => {
          const x = SCREEN_WIDTH * pos;
          const y = 35 + Math.sin(pos * Math.PI * 2.5) * 12;
          const rotation = 20 - (i % 3) * 25;
          return (
            <G key={`b-${i}`} transform={`translate(${x}, ${y}) rotate(${rotation})`}>
              <Path
                d="M 0 0 Q 5 -8 0 -14 Q -5 -8 0 0"
                fill={i % 2 === 0 ? '#A8CCA8' : '#D4E5D4'}
                opacity={0.7}
              />
              <Line x1={0} y1={0} x2={0} y2={-12} stroke="#7BA887" strokeWidth={0.4} />
            </G>
          );
        })}
      </Svg>
    </View>
  );
}

function AppLogo() {
  return (
    <View style={logoStyles.container}>
      <Svg width={80} height={80} viewBox="0 0 80 80">
        {/* Left circle */}
        <Circle cx={32} cy={45} r={22} fill="none" stroke="#A8CCA8" strokeWidth={1.2} />
        {/* Right circle */}
        <Circle cx={48} cy={45} r={22} fill="none" stroke="#A8CCA8" strokeWidth={1.2} />
        {/* Leaf in center */}
        <G transform="translate(40, 45)">
          <Path
            d="M 0 12 Q -10 0 0 -16 Q 10 0 0 12"
            fill="none"
            stroke="#4A7C59"
            strokeWidth={1.5}
          />
          <Line x1={0} y1={12} x2={0} y2={-14} stroke="#4A7C59" strokeWidth={1} />
          {/* Leaf veins */}
          <Line x1={0} y1={-4} x2={-5} y2={-8} stroke="#4A7C59" strokeWidth={0.6} />
          <Line x1={0} y1={0} x2={5} y2={-4} stroke="#4A7C59" strokeWidth={0.6} />
          <Line x1={0} y1={4} x2={-4} y2={1} stroke="#4A7C59" strokeWidth={0.6} />
        </G>
      </Svg>
    </View>
  );
}

function NoticeIcon() {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44">
      {/* Hand outline */}
      <Path
        d="M 22 38 C 14 38 10 32 10 26 L 10 18 C 10 16 12 14 14 16 L 14 22 M 14 18 L 14 10 C 14 8 16 7 18 9 L 18 20 M 18 9 L 18 7 C 18 5 20 4 22 6 L 22 20 M 22 7 C 22 5 24 4 26 6 L 26 18 M 26 12 C 26 10 28 10 30 12 L 30 26 C 30 32 26 38 22 38"
        fill="none"
        stroke="#4A5568"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function WonderIcon() {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44">
      {/* Question mark / curiosity symbol with sparkles */}
      <Path
        d="M 16 18 C 16 12 22 8 28 12 C 32 15 28 20 22 22 L 22 26"
        fill="none"
        stroke="#4A5568"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle cx={22} cy={31} r={1.5} fill="#4A5568" />
      {/* Sparkle dots */}
      <Circle cx={10} cy={12} r={1.2} fill="#4A5568" />
      <Circle cx={34} cy={8} r={1.2} fill="#4A5568" />
      <Circle cx={8} cy={28} r={1} fill="#4A5568" />
      <Circle cx={36} cy={30} r={1} fill="#4A5568" />
      {/* Small lines radiating from sparkles */}
      <Line x1={10} y1={9} x2={10} y2={7} stroke="#4A5568" strokeWidth={1} />
      <Line x1={8} y1={12} x2={6} y2={12} stroke="#4A5568" strokeWidth={1} />
      <Line x1={34} y1={5} x2={34} y2={3} stroke="#4A5568" strokeWidth={1} />
      <Line x1={36} y1={8} x2={38} y2={8} stroke="#4A5568" strokeWidth={1} />
    </Svg>
  );
}

function ObserveIcon() {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44">
      {/* Magnifying glass */}
      <Circle cx={20} cy={20} r={10} fill="none" stroke="#4A5568" strokeWidth={1.8} />
      <Line x1={27} y1={27} x2={36} y2={36} stroke="#4A5568" strokeWidth={2.5} strokeLinecap="round" />
      {/* Small detail inside lens */}
      <Circle cx={17} cy={17} r={3} fill="none" stroke="#4A5568" strokeWidth={0.8} opacity={0.5} />
    </Svg>
  );
}

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const pulseNotice = useSharedValue(1);
  const pulseWonder = useSharedValue(1);
  const pulseObserve = useSharedValue(1);

  React.useEffect(() => {
    pulseNotice.value = withRepeat(
      withTiming(1.04, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    pulseWonder.value = withDelay(
      400,
      withRepeat(
        withTiming(1.04, { duration: 2800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
    );
    pulseObserve.value = withDelay(
      800,
      withRepeat(
        withTiming(1.04, { duration: 2600, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
    );
  }, []);

  const noticeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseNotice.value }],
  }));
  const wonderStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseWonder.value }],
  }));
  const observeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseObserve.value }],
  }));

  const handleGetStarted = () => {
    router.replace('/(tabs)/lessons' as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Leaf Banner */}
      <Animated.View entering={FadeIn.duration(800)}>
        <LeafBanner />
      </Animated.View>

      {/* Welcome Card */}
      <Animated.View entering={FadeInDown.delay(300).duration(700)} style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <AppLogo />
        <Text style={styles.appName}>
          <Text style={styles.appNameOutdoor}>Outdoor</Text>
          <Text style={styles.appNameObserver}>Observer</Text>
        </Text>
      </Animated.View>

      {/* Venn Diagram Circles */}
      <View style={styles.circlesContainer}>
        {/* Notice Circle - top center */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(600)}
          style={[noticeStyle]}
        >
          <Pressable
            onPress={handleGetStarted}
            style={[styles.circle, styles.noticeCircle]}
          >
            <Text style={styles.circleLabel}>Notice</Text>
            <NoticeIcon />
          </Pressable>
        </Animated.View>

        {/* Bottom row: Wonder + Observe */}
        <View style={styles.bottomCircles}>
          {/* Wonder Circle - bottom left */}
          <Animated.View
            entering={FadeInDown.delay(800).duration(600)}
            style={[wonderStyle]}
          >
            <Pressable
              onPress={handleGetStarted}
              style={[styles.circle, styles.wonderCircle]}
            >
              <Text style={styles.circleLabel}>Wonder</Text>
              <WonderIcon />
            </Pressable>
          </Animated.View>

          {/* Observe Circle - bottom right */}
          <Animated.View
            entering={FadeInDown.delay(1000).duration(600)}
            style={[observeStyle]}
          >
            <Pressable
              onPress={handleGetStarted}
              style={[styles.circle, styles.observeCircle]}
            >
              <Text style={styles.circleLabel}>Observe</Text>
              <ObserveIcon />
            </Pressable>
          </Animated.View>
        </View>
      </View>

      {/* Get Started Button */}
      <Animated.View entering={FadeInDown.delay(1200).duration(600)} style={styles.buttonContainer}>
        <Pressable
          onPress={handleGetStarted}
          style={({ pressed }) => [styles.startButton, pressed && styles.startButtonPressed]}
        >
          <Text style={styles.startButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.neutral[0]} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const bannerStyles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
});

const logoStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
    alignItems: 'center',
  },
  welcomeCard: {
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.xl,
    borderRadius: 12,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.neutral[600],
    fontWeight: '500',
  },
  appName: {
    fontSize: 20,
    fontWeight: '600',
  },
  appNameOutdoor: {
    color: colors.primary[700],
  },
  appNameObserver: {
    color: colors.neutral[600],
  },
  circlesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -spacing.lg,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.sm,
  },
  noticeCircle: {
    backgroundColor: 'rgba(219, 160, 175, 0.55)',
    marginBottom: -CIRCLE_SIZE * 0.18,
    zIndex: 3,
  },
  bottomCircles: {
    flexDirection: 'row',
    marginTop: 0,
    gap: -CIRCLE_SIZE * 0.15,
  },
  wonderCircle: {
    backgroundColor: 'rgba(168, 150, 198, 0.5)',
    zIndex: 2,
  },
  observeCircle: {
    backgroundColor: 'rgba(150, 190, 230, 0.5)',
    zIndex: 1,
  },
  circleLabel: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: spacing.sm,
  },
  buttonContainer: {
    paddingBottom: spacing['3xl'],
    paddingHorizontal: spacing['2xl'],
    width: '100%',
  },
  startButton: {
    backgroundColor: colors.primary[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    borderRadius: 28,
    gap: spacing.sm,
    shadowColor: colors.primary[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonPressed: {
    backgroundColor: colors.primary[700],
    transform: [{ scale: 0.98 }],
  },
  startButtonText: {
    color: colors.neutral[0],
    fontSize: 18,
    fontWeight: '700',
  },
});
