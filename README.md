# LiftOff

A pixel-perfect Expo React Native bike shop app.

## Tech Stack

- Expo React Native
- TypeScript
- NativeWind (Tailwind for React Native)
- React Native Reanimated + Gesture Handler
- TanStack Query
- Lottie
- Expo Router

## Getting Started

You'll need Node.js and the Expo Go app installed on your phone (available on the App Store and Google Play).

**Install dependencies**

```bash
npm install
```

**Start the dev server**

```bash
npx expo start
```

Scan the QR code in your terminal with the Expo Go app (Android) or your iPhone camera (iOS).

If you run into Metro cache issues, clear it with:

```bash
npx expo start --clear
```

## Assumptions

- I noticed the front-end requirements section mentions a specific tech stack, but on the other hand the FAQ section says "use whatever you'd like" - I'm comfortable with that specific stack anyway, so I went with it
- This bit also mentions Expo React Native + Next - I'm not sure how I could fit Next into the mix here and I didn't particularly need any of its features, so I stuck with Expo React Native
- At the bottom of the React Native app, the bike tab has a blue pattern overlaid on top of it. I'm guessing this is the active tab indicator and is meant to be angled that way for all of them? Either that or it's the "home tab" indicator but probably not
- The navbar at the bottom vanishes on the product page + checkout page? makes sense for the product page but feels unintuitive for the checkout page since that's accessed via the navbar
- On the home page, the product card for the bike is not transparent, while the helmet is. I made them both glass, the same way the Hero section bike is in a glass container.
- Some svgs are taken directly from the Figma e.g. the hero section bike - I wouldn't normally do that in prod (I'd probably prioritize native HTML/CSS) but for the sake of pixel-perfect design I wanted the slope on the bottom border to be the exact same
- I made up the name + specifications/price of the white electric bike in the hero
- On the product page I'm actually not sure whether the inset shadow styling is the 'active tab indicator' or the other way around. I think the font color makes it confusing + description/specification are more or less interchangeable words here
- The checkout page example has enough products to use up 100% of the page height - it's unclear whether the checkout thumb slide should stay near the bottom of the page when that's not the case. In a real scenario I'd probably check how other sites do it but I decided to go with my intuition
- search button at the top right isn't functional, I decided it wasn't mentioned as a specific requirement so I spent my time elsewhere

## Extra stuff I did

- swipe between tabs
- add to cart confirmation

## If I had more time

- fix some redundancies in the code e.g. back button should be its own reusable component
- fix checkout thumb slider to correctly hide text once slider goes past it
- page swipe animation flashbangs you
- inset shadow on product page tab buttons broke
- better animations e.g. home page category tabs

## About the API

- I found a public 'missing bikes' API - it's not concise enough to search for specific bike models like PEUGOT LR01 so I'm using it for a generic bike search and randomly selecting between the first 5 results
