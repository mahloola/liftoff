import React, { useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Skeleton } from './Skeleton';
import { borderRadius } from '@/constants/theme';

interface ProductImageProps {
  source: ImageSourcePropType;
  aspectRatio?: number;
  width?: number | `${number}%`;
  radius?: number;
}

export function ProductImage({
  source,
  aspectRatio = 1,
  width = '100%',
  radius = borderRadius.md,
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={{ width, aspectRatio }}>
      {!loaded && (
        <Skeleton radius={radius} style={StyleSheet.absoluteFill} />
      )}
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
        resizeMode="contain"
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
}
