import React, { useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/theme';

interface CameraViewfinderProps {
  children?: React.ReactNode;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800';

export function CameraViewfinder({ children }: CameraViewfinderProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: FALLBACK_IMAGE }} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <View style={styles.permissionOverlay}>
          <Button
            title="Enable Camera"
            onPress={requestPermission}
            variant="primary"
            icon="camera-outline"
          />
        </View>
        {children}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[900],
  },
  permissionOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
