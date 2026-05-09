export const colors = {
  // Base backgrounds
  background:      '#242C3B',
  surface:         '#141B2E',
  surfaceElevated: '#1C2540',
  border:          '#1E2A45',

  // Main gradient: buttons, active category, search/back icons, Add-to-Cart
  gradientStart: '#34C8E8',
  gradientEnd:   '#4E4AF2',

  // Panel gradient: description/spec container, unselected category tab
  panelStart: '#353F54',
  panelEnd:   '#222834',

  // Tab bar gradient
  tabBarStart: '#363E51',
  tabBarEnd:   '#181C24',

  // Product tab text gradient (Description / Specification when active)
  tabTextStart: '#3CA4EB',
  tabTextEnd:   '#4286EE',

  // Product-bottom container background (price + Add to Cart bar)
  productBottomBg: '#262E3D',

  // Price colours
  priceBlue: '#3D9CEA',
  totalBlue: '#38B8EA',

  // Drop-shadow for gradient icon buttons
  dropShadow: '#10141C',

  // Legacy accent (used in badge, outline buttons)
  accent:    '#2B6BFF',
  accentDark:'#1A4FBF',

  // Text
  textPrimary:   '#FFFFFF',
  textSecondary: '#8896B3',
  navInactive:   '#5A6582',

  // Status
  success: '#22C55E',
  error:   '#EF4444',
  badge:   '#2B6BFF',
} as const;

export const fontSizes = {
  display:    28,
  heading:    20,
  subheading: 17,
  body:       14,
  caption:    12,
  price:      18,
  button:     15,
} as const;

export const fontWeights = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
} as const;

// Poppins font-family names, loaded in app/_layout.tsx
export const fontFamilies = {
  regular:  'Poppins_400Regular',
  medium:   'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold:     'Poppins_700Bold',
} as const;

export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  xxl:  32,
  xxxl: 48,
} as const;

export const borderRadius = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  pill: 20,   // gradient icon buttons (search, back, active category)
  full: 999,
} as const;

// Shared shadow for gradient icon buttons (search btn, back btn, active category tab)
export const gradientButtonShadow = {
  shadowColor:   '#10141C',
  shadowOffset:  { width: 0, height: 20 },
  shadowOpacity: 1,
  shadowRadius:  20,
  elevation:     10,
} as const;

export const shadows = {
  card: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius:  8,
    elevation:     8,
  },
  button: {
    shadowColor:   '#10141C',
    shadowOffset:  { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius:  16,
    elevation:     8,
  },
} as const;

export const NAV_BAR_HEIGHT = 64;
export const TAB_BAR_HEIGHT = 88;
