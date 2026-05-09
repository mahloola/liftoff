# LiftOff App — Progress Documentation

This file records thought process, assumptions, architecture decisions, and stage-by-stage progress.

---

## Proposed Stage Breakdown

| Stage | Focus | Gate |
|-------|-------|------|
| 1 | Scaffold, config, folder structure, navigation shell, GitHub repo | App boots cleanly, repo created |
| 2 | Theme system, typography, spacing primitives, shared UI atoms | Design tokens locked before any screen |
| 3 | Home / product listing screen | Layout + responsive strategy validated in real device |
| 4 | Product detail screen + FREE DATA section (BikeIndex API) | API integration + tab layout verified |
| 5 | Shopping cart screen | Cart state, item list, order summary |
| 6 | Checkout slide-in animation | Slide panel fidelity |
| 7 | Animations pass — screen transitions, button interactions, Lottie | Reanimated + Lottie globally wired |
| 8 | Polish, edge cases, responsive QA on both target devices | Pixel-perfect sign-off |

**Reasoning for this order:**
- Tokens/theme locked before screens prevents design drift and avoids rework.
- Home before detail avoids building detail with wrong assumptions about shared components.
- Cart before checkout because checkout is a panel within (or triggered from) the cart/detail context.
- Dedicated animation pass after structure is correct avoids animating shapes that will change.
- GitHub repo created in Stage 1; commits happen at end of every approved stage after all tests pass.

---

## Asset Map (Confirmed)

### PNG → Product usage

| File | Used in |
|------|---------|
| `assets/png/Electric Bicycle.png` | Home hero card (30% Off featured product) |
| `assets/png/PEUGOT - LR01.png` | Home list card · Product detail hero · Cart item |
| `assets/png/PILOT - CHROMOLY 520.png` | Cart item only |
| `assets/png/SMITH - Trade.png` | Home list card · Cart item |

### SVG → UI placement

| File | Used in |
|------|---------|
| `assets/svg/misc/Search.svg` | Home screen top-right search icon |
| `assets/svg/misc/chevron-left.svg` | Back button in product detail header |
| `assets/svg/navbar/Subtract.svg` | Bottom nav — Home tab (active, tab 1) |
| `assets/svg/navbar/map.fill.svg` | Bottom nav — Map tab (tab 2) |
| `assets/svg/navbar/cart.fill.svg` | Bottom nav — Cart tab (tab 3) |
| `assets/svg/navbar/person.fill.svg` | Bottom nav — Profile tab (tab 4) |
| `assets/svg/navbar/doc.text.fill.svg` | Bottom nav — Orders tab (tab 5) |
| `assets/svg/products/Bicycle.svg` | Home category filter — position 1 |
| `assets/svg/products/Road.svg` | Home category filter — position 2 |
| `assets/svg/products/Mountain.svg` | Home category filter — position 3 |
| `assets/svg/products/Helmet.svg` | Home category filter — position 4 |

---

## Pre-Implementation: Responsive Layout Strategy

### Target devices
- iPhone 13 Mini: 375 × 812 pt
- iPhone 17 Pro Max: 440 × 956 pt
- Width delta: ~17% · Height delta: ~18%
- Base reference width for scaling: **390 pt** (midpoint, matches iPhone 14)

---

### 1. Spacing Scale

A `useScale()` hook in `hooks/useScale.ts` exposes three helpers:

```
rw(n) — scales n proportionally to screen width  (n * screenWidth / 390)
rh(n) — scales n proportionally to screen height (n * screenHeight / 844)
rs(n) — scales font size, capped with min/max to prevent illegibility
```

NativeWind Tailwind classes handle the majority of spacing. `rw`/`rh` are reserved for:
- Custom `style` props where Tailwind cannot express the exact value
- Image and card dimensions
- Decorative geometry (gradients, background shapes)

**What stays fixed (never scaled):**
- Border widths (1, 1.5 px)
- Border radii within the standard set (4, 8, 12, 16, 24) — look correct at both sizes
- Icon sizes in the navbar (24 pt — SF symbol optical sizing convention)
- Minimum touch targets (44 pt minimum, per Apple HIG — never scaled down)
- Button height (intentional brand height, fixed)

**What scales:**
- Card widths and heights (screen-relative or rw())
- Hero/banner image heights
- Horizontal container padding
- Display-sized headings (> 24 pt) via rs()

---

### 2. Dimension Adaptation

**Containers:** `width: '100%'` with horizontal padding via `rw()`. Never hardcode `width: 390`.

**Cards:** Width derived from screen width minus gutters:
```
// Full-bleed card with gutters
cardWidth = screenWidth - rw(32)

// Two-column grid
cardWidth = (screenWidth - rw(48)) / 2
```

**Heights:** Never fixed on containers that hold text. Use `minHeight` + `paddingVertical`. Fixed height is acceptable only on:
- Image thumbnails (locked via `aspectRatio`, not both dimensions)
- Bottom nav bar
- Buttons (intentional fixed brand height)

**Images:** Always `resizeMode="cover"` (or `contentFit="cover"` on Expo Image) with `aspectRatio`. Never set both `width` and `height` as fixed pixel values.

```tsx
// Correct
<Image style={{ width: '100%', aspectRatio: 4 / 3 }} contentFit="cover" />

// Wrong — breaks on 13 Mini
<Image style={{ width: 390, height: 292 }} />
```

---

### 3. When Fixed Sizing Is Acceptable

| Element | Fixed OK? | Reason |
|---------|-----------|--------|
| Border widths | Yes | Sub-pixel, no layout impact |
| Icon sizes (16, 20, 24) | Yes | Optical sizing, not layout |
| Bottom nav bar height | Yes | Platform convention |
| Touch target minimum (44) | Yes | HIG compliance |
| Button height | Yes | Intentional brand sizing |
| Avatar / thumbnail in list | Yes (with aspectRatio) | Known proportional asset |
| Hero image height | No | Must adapt to screen height |
| Card width | No | Must adapt to screen width |
| Modal / sheet height | No | Must adapt to screen height |
| Decorative geometry | No | Must adapt to screen dimensions |

---

### 4. Gradients and Background Geometry

Background gradients and decorative shapes are a common source of overflow and clipping bugs.

**Rules:**
- Decorative containers use `overflow: 'hidden'` to clip geometry that intentionally bleeds
- Gradient components use `width: '100%'` and `rh()`-based or percentage heights — never fixed px
- Absolute-positioned decorative elements are sized relative to `screenWidth` / `screenHeight` from `useWindowDimensions()`
- `useWindowDimensions()` is preferred over `Dimensions.get('window')` — it reacts to any window size change
- Background arcs / color washes that form a visual frame use `aspectRatio` so they reflow cleanly
- `expo-linear-gradient` is used for all gradient needs; no Skia unless already a dependency

---

### 5. Card Resizing

- Card width: screen-relative (see §2)
- Card height: content-driven with `minHeight`, never fixed
- Product image inside card: `width: '100%'` + `aspectRatio` — never fixed dimensions
- Single-line text: `numberOfLines={1}` + `ellipsizeMode="tail"` to prevent overflow
- Two-line descriptions: `numberOfLines={2}`
- Price + badge row: `flexDirection: 'row'` + `flexWrap: 'nowrap'`; text portion gets `flexShrink: 1` so it yields before overflowing the card edge

---

### 6. SafeArea Handling

Use `SafeAreaProvider` + `SafeAreaView` from `react-native-safe-area-context` exclusively. Never use the deprecated `SafeAreaView` from `react-native`.

**Rules:**
- Root `_layout.tsx` wraps everything in `<SafeAreaProvider>`
- Screens that own their own background use `<SafeAreaView edges={['top', 'bottom']}>`
- Screens with full-bleed gradient backgrounds use `useSafeAreaInsets()` to apply padding manually, keeping the background flush to the screen edge
- Bottom tab bar always respects `insets.bottom` so the nav does not sit behind the home indicator
- Modals / bottom sheets pad inner content by `insets.bottom`; the sheet background extends behind the indicator

**What to avoid:**
- Applying the top inset twice (layout + screen) — causes double-padding on notched phones
- Hardcoded `paddingTop: 44` or `paddingTop: 47` — breaks on non-standard notch sizes
- Omitting the `edges` prop — default applies all edges, which interferes with full-bleed designs

---

## Pre-Implementation: Animation Strategy

### Tool Selection Matrix

| Motion type | Tool | Reason |
|-------------|------|--------|
| Button press (scale/opacity) | Reanimated shared value | Frame-accurate, UI thread, interrupt-safe |
| Screen transitions | Expo Router built-in | Native layer, no JS/Reanimated conflict |
| Checkout slide-in panel | Reanimated shared value | Gesture-tied, needs interrupt safety |
| Skeuomorphic button depth | Reanimated shared value | Synchronous state machine |
| Decorative looping icons | Lottie | File-driven, zero JS overhead on idle loop |
| Loading spinners | Lottie | Same reason |
| Skeleton shimmer | Reanimated shared value | Layout-tied, needs precise position control |
| Rive | Not used unless justified | No screen requires state-machine-level animation |

---

### 1. Reanimated Shared Values

Use `useSharedValue` + `useAnimatedStyle` for any animation that:
- Responds to a gesture (press, drag, swipe)
- Must be interrupt-safe
- Needs to synchronize with scroll position
- Drives a layout change

**Named shared values in this app:**
- `pressScale` — button shrink on press (`withSpring`)
- `checkoutOffset` — slide-in panel translateX
- `tabIndicatorX` — animated tab underline x-position
- `shimmerPosition` — skeleton shimmer sweep

All shared values live inside the owning component or a dedicated custom hook. Never in React state.

---

### 2. Layout Animations

Use Reanimated declarative layout animations (`FadeIn`, `SlideInRight`, `ZoomIn`) for:
- List items entering after data loads
- Cards animating in on initial render
- Toast / snackbar appearance

These are one-shot, mount/unmount effects. They do not require `useSharedValue`.

**Avoid layout animations for:**
- Anything that re-triggers on every render (causes jank)
- Anything that must coordinate with gesture state

---

### 3. Screen Transitions: Expo Router vs Custom

**Decision: Expo Router built-in transitions, configured via `screenOptions`.**

Reasoning:
- `animation: 'slide_from_right'` on the `Stack` navigator gives the required right-to-left swipe at the native layer — zero JS overhead
- Custom Reanimated transitions layered on top of Router navigation cause double-animation conflicts and stutter
- Where a transition cannot be expressed via Router options (e.g. the checkout panel), it is implemented as an in-route overlay rather than a route change

**Checkout slide-in specifically:** An overlay panel within the product detail / cart route. Animated with `useSharedValue(screenWidth)` → `withSpring(0)` on a toggle. Stays within one route; no navigation complexity.

---

### 4. Avoiding Animation Jank

- All interaction animations run on the **UI thread** via Reanimated worklets — no `runOnJS` in the hot path
- No `setState` inside animation callbacks; use derived animated values instead
- `cancelAnimation()` called before starting a new animation on the same shared value (prevents queue buildup on rapid taps)
- FlatList / FlashList items use `itemLayoutAnimation` rather than wrapping each item in its own Animated.View with a timer
- Images use Expo `Image` with `contentFit` to avoid layout shifts that retrigger animations
- Never animate `width` / `height` directly — use `scaleX` / `scaleY` or `transform`

---

### 5. Button Press Abstraction — `PressableScale`

All tappable elements with press feedback use a single `<PressableScale>` primitive (`components/ui/PressableScale.tsx`):

- Wraps `Pressable` with a Reanimated scale animation
- Props: `children`, `onPress`, `scaleTo` (default 0.96), `duration` (default 100)
- `onPressIn` → `withSpring(scaleTo, { damping: 15, stiffness: 300 })`
- `onPressOut` → `withSpring(1, { damping: 15, stiffness: 300 })`

Skeuomorphic buttons extend this with an additional animated `shadowOffset` to simulate physical depression.

Zero duplicated animation logic across the app. All interactive elements share identical spring parameters for tactile consistency.

---

### 6. Rive — Conditional Usage

Rive is available as a dependency but **will not be used unless** a specific animation requires a multi-state state machine that cannot be expressed in Lottie or Reanimated. No current screen in the mockup requires this. If Rive becomes justified, the decision will be documented here with the specific reason.

---

## FREE DATA Section — Integration Strategy

### Source: BikeIndex API (`bikeindex.org/api/v3`)
- Free, no authentication required for read operations
- Query by manufacturer / model name derived from the selected product
- Returns: frame material, drivetrain, wheel size, manufacture year, component group, verified status

### Integration
- `hooks/useBikeSpecs.ts` — accepts `brand` + `model`, fetches + normalizes response into a `BikeSpec` type
- Rendered as an inline card within the **Specification** tab of the product detail screen
- Loading state: Lottie skeleton shimmer
- Error state: graceful fallback with static copy
- Visual style matches the app's card language (same border radius, shadow, padding) — not a foreign widget

### What NOT to use
- Unrelated APIs (weather, news, etc.)
- Anything requiring auth

---

## Design Tokens (Eyeballed — Variables Created, Values Refined Later)

| Token | Initial value | Variable |
|-------|--------------|---------|
| Background | `#0A0F1E` | `colors.background` |
| Surface / card | `#141B2E` | `colors.surface` |
| Accent / CTA | `#2B6BFF` | `colors.accent` |
| Hero gradient start | `#0A0F1E` | `colors.gradientStart` |
| Hero gradient end | `#1A4FBF` | `colors.gradientEnd` |
| Text primary | `#FFFFFF` | `colors.textPrimary` |
| Text secondary | `#8896B3` | `colors.textSecondary` |
| Nav inactive | `#5A6582` | `colors.navInactive` |
| Font family | System default (SF Pro / sans-serif) | `fonts.body` |
| Display heading | ~28sp | `fontSizes.display` |
| Section heading | ~20sp | `fontSizes.heading` |
| Body | ~14sp | `fontSizes.body` |
| Caption | ~12sp | `fontSizes.caption` |
| Price | ~18sp bold | `fontSizes.price` |

---

## Component Architecture Rules

- No file exceeds ~200 lines. Past that, extract sub-components.
- One concern per file. Screen files compose; they do not define UI primitives inline.
- `components/ui/` — shared atoms: `Button`, `PressableScale`, `Typography`, `Card`, `Badge`, `Divider`, `Skeleton`
- `constants/theme.ts` — all colors, fontSizes, spacing, borderRadius
- No magic numbers in component files. All sizing via `theme.*` or `rw()` / `rh()`
- Animated components suffixed `Animated` or named descriptively (e.g. `PressableScale`, `AnimatedCard`)

---

## Stage Progress Log

### Stage 1 — Scaffold, Config, GitHub Repo
- **Status: COMPLETE — awaiting approval to proceed to Stage 2**
- Commit: `b99b49e` — pushed to https://github.com/mahloola/liftoff

**What was completed:**
- Expo SDK 54, React 19.1, React Native 0.81.5
- Expo Router 6.0 with typed routes, `(tabs)` group + `product/[id]` stack
- NativeWind 4.2 + Tailwind 3.4, metro SVG transformer, global.css
- Reanimated 4.1 + react-native-worklets (Reanimated v4 peer dep)
- ESLint (expo config) + Prettier + Jest 29 + jest-expo 54
- `constants/theme.ts` — all design tokens as named variables (eyeballed)
- `hooks/useScale.ts` — `rw()`, `rh()`, `rs()` proportional scale helpers
- `components/ui/` — PressableScale, Typography, Card, Badge, Skeleton
- 5-tab navigation shell + product detail route (all placeholder screens)
- 8 tests passing, TypeScript clean, Android bundle verified (3.97 MB)
- GitHub repo: https://github.com/mahloola/liftoff

**Architecture decisions:**
- `blank-typescript` scaffolded in a temp dir then cherry-picked into LiftOff-Task (create-expo-app refused non-empty dirs)
- `react-native-worklets` installed explicitly — Reanimated v4 extracted worklets into a separate peer dep
- `jest-expo@54` + `jest@29` pinned — jest-expo@55 uses Jest 30 APIs incompatible with the current runner
- `--legacy-peer-deps` for NativeWind — optional `react-dom` peer conflict in expo-router (non-issue for mobile builds)
- Tailwind stays in `dependencies` — NativeWind uses it at runtime via metro, not just at build time

**Responsive note:** `useScale` base: 390pt. Jest env uses 750pt, so tests assert proportionality not absolute values.

**Tests:** 8 passing — `useScale` math contracts (6) + HomeScreen render (2).

### Stage 2 — Theme + Shared UI Atoms
- **Status: COMPLETE — awaiting approval to proceed to Stage 3**
- Commit: `7522115` — pushed to https://github.com/mahloola/liftoff

**What was completed:**
- `tailwind.config.js` extended with all brand colors, font sizes, spacing, border radii —
  NativeWind className utilities now match `constants/theme.ts` tokens exactly
- `Button` — accent/outline/ghost variants, sm/md/lg sizes, loading spinner, disabled state, fullWidth
- `Divider` — hairline separator using theme border color
- `ProductImage` — local PNG wrapper with skeleton loading, contain resize mode, configurable aspect ratio
- `components/ui/index.ts` — barrel export so imports are `from '@/components/ui'`
- `__mocks__/react-native-reanimated.js` — full v4 API stub that avoids native worklets init
- `__mocks__/react-native-worklets.js` — stub for Reanimated v4's peer dependency
- `jest.config.js` moduleNameMapper wires both mocks globally (no per-test mock needed)
- 14 tests passing, TypeScript clean
- Housekeeping: `android/` prebuild folder added to `.gitignore` and untracked (managed workflow)

### Stage 3 — Home Screen
- Status: Not started

### Stage 4 — Product Detail + FREE DATA
- Status: Not started

### Stage 5 — Shopping Cart
- Status: Not started

### Stage 6 — Checkout Slide-In
- Status: Not started

### Stage 7 — Animation Pass
- Status: Not started

### Stage 8 — Polish + QA
- Status: Not started
