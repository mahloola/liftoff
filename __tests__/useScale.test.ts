import { renderHook } from '@testing-library/react-native';
import { useScale } from '@/hooks/useScale';

/**
 * jest-expo's test environment uses a fixed screen size (750×1334).
 * These tests verify the mathematical correctness of the scale helpers
 * relative to whatever dimension the environment provides, rather than
 * asserting specific pixel values that depend on device context.
 */

describe('useScale', () => {
  it('returns functions rw, rh, rs and screen dimensions', () => {
    const { result } = renderHook(() => useScale());
    expect(typeof result.current.rw).toBe('function');
    expect(typeof result.current.rh).toBe('function');
    expect(typeof result.current.rs).toBe('function');
    expect(typeof result.current.screenWidth).toBe('number');
    expect(typeof result.current.screenHeight).toBe('number');
  });

  it('rw scales linearly — doubling input doubles output', () => {
    const { result } = renderHook(() => useScale());
    const a = result.current.rw(100);
    const b = result.current.rw(200);
    expect(b).toBeCloseTo(a * 2, 5);
  });

  it('rh scales linearly — doubling input doubles output', () => {
    const { result } = renderHook(() => useScale());
    const a = result.current.rh(100);
    const b = result.current.rh(200);
    expect(b).toBeCloseTo(a * 2, 5);
  });

  it('rs result stays within ±15% of the base value', () => {
    const { result } = renderHook(() => useScale());
    [12, 16, 20, 28].forEach((base) => {
      const scaled = result.current.rs(base);
      expect(scaled).toBeGreaterThanOrEqual(base * 0.85 - 0.001);
      expect(scaled).toBeLessThanOrEqual(base * 1.15 + 0.001);
    });
  });

  it('rw(0) returns 0', () => {
    const { result } = renderHook(() => useScale());
    expect(result.current.rw(0)).toBe(0);
  });

  it('rh(0) returns 0', () => {
    const { result } = renderHook(() => useScale());
    expect(result.current.rh(0)).toBe(0);
  });

  it('screenWidth and screenHeight are positive numbers', () => {
    const { result } = renderHook(() => useScale());
    expect(result.current.screenWidth).toBeGreaterThan(0);
    expect(result.current.screenHeight).toBeGreaterThan(0);
  });
});
