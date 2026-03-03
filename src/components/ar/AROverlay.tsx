import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AROverlayProps {
  children: React.ReactNode;
}

export function AROverlay({ children }: AROverlayProps) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={styles.topGradient}
        pointerEvents="none"
      />
      <View style={styles.content} pointerEvents="box-none">
        {children}
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.bottomGradient}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  content: {
    flex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
});
