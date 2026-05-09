export const colors = {
  background: '#0A0F1E',
  surface: '#141B2E',
  surfaceElevated: '#1C2540',
  accent: '#2B6BFF',
  accentDark: '#1A4FBF',
  gradientStart: '#0A0F1E',
  gradientEnd: '#1A4FBF',
  textPrimary: '#FFFFFF',
  textSecondary: '#8896B3',
  navInactive: '#5A6582',
  border: '#1E2A45',
  success: '#22C55E',
  error: '#EF4444',
  badge: '#2B6BFF',
} as const;

export const fontSizes = {
  display: 28,
  heading: 20,
  subheading: 17,
  body: 14,
  caption: 12,
  price: 18,
  button: 15,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

export const NAV_BAR_HEIGHT = 64;
export const TAB_BAR_HEIGHT = 80;
