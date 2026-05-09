We are building a pixel-perfect Expo React Native mobile app based on a provided Figma mockup.

You must guide this implementation in stages and STOP after every stage for approval before continuing.

Tech stack requirements:

* Expo React Native
* TypeScript
* NativeWind (Tailwind for React Native)
* React Native Reanimated
* Rive
* Lottie

Requirements:

* Match layout, typography, spacing, colors, shadows, and sizing as closely as possible to the mockup
* Handle responsive layouts for:

  * iPhone 13 Mini
  * iPhone 17 Pro Max
* Use reusable components and maintainable architecture
* Use smooth animations
* Include a public API integration for the FREE DATA section using bike-related data
* Use TypeScript throughout
* Use Expo Router if appropriate

Assets will exist in this structure:

/public
/assets
/png
/svg
/misc
/navbar
/products

Animations:

* Screen transitions: right-to-left swipe
* Accent-colored buttons shrink slightly on press
* Skeuomorphic buttons smoothly transition between states
* Checkout section slides from left to right

Development constraints:

* DO NOT generate the entire app at once
* Break implementation into stages
* At the end of EVERY stage:

  1. Explain what was completed
  2. Explain architecture decisions
  3. Explain responsive considerations
  4. Provide a testing strategy
  5. STOP and wait for approval

Each stage must:

* Keep the app runnable
* Keep TypeScript types clean
* Avoid dead code
* Include tests where relevant
* Avoid placeholder architecture that will later need rewriting

Stage 1 MUST:

1. Scaffold the Expo app
2. Configure TypeScript
3. Configure NativeWind/Tailwind
4. Configure Reanimated correctly
5. Configure testing setup
6. Initialize git
7. Create folder architecture
8. Verify app boots successfully
9. Create a responsive layout foundation
10. Add a basic navigation structure
11. Add ESLint + Prettier
12. Explain all setup decisions

You should first:

* Propose the complete stage breakdown
* Explain the reasoning behind the stage order
* Then begin ONLY Stage 1

Important:

* Optimize for production-quality maintainability
* Avoid overengineering
* Use modern Expo/React Native best practices
* Explain tradeoffs when making architecture decisions
