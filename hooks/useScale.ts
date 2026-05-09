import { useWindowDimensions } from 'react-native';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export function useScale() {
  const { width, height } = useWindowDimensions();

  /** Scale a horizontal measurement relative to screen width. */
  const rw = (n: number): number => (n * width) / BASE_WIDTH;

  /** Scale a vertical measurement relative to screen height. */
  const rh = (n: number): number => (n * height) / BASE_HEIGHT;

  /**
   * Scale a font size relative to screen width, capped to ±15% of the
   * base value to keep text legible on both small and large screens.
   */
  const rs = (n: number): number => {
    const scaled = (n * width) / BASE_WIDTH;
    return Math.max(n * 0.85, Math.min(n * 1.15, scaled));
  };

  return { rw, rh, rs, screenWidth: width, screenHeight: height };
}
