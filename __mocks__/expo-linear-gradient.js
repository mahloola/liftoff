const React = require('react');
const { View } = require('react-native');

module.exports = {
  LinearGradient: ({ children, style }) => React.createElement(View, { style }, children),
};
