module.exports = {
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Reanimated sharedValue.value = ... is intentional mutation — not a React anti-pattern
    'react-hooks/immutability': 'off',
    // Resetting loading state at the top of an effect is valid for data-fetching hooks
    'react-hooks/set-state-in-effect': 'off',
    // RN Animated.Value via useRef().current is the documented pattern — not a render-time ref read
    'react-hooks/refs': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  overrides: [
    {
      // Jest mock factories require require() — allow it in test files
      files: ['**/__tests__/**', '**/__mocks__/**', '**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules/', '.expo/', 'dist/'],
};
