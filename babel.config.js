module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Must remain last
      'react-native-reanimated/plugin',
    ],
  };
};
