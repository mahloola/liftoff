const React = require('react');
const { View } = require('react-native');

const LottieView = ({ style, ...props }) =>
  React.createElement(View, { style, testID: 'lottie-view', ...props });

module.exports = LottieView;
module.exports.default = LottieView;
