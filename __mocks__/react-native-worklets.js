module.exports = {
  initialize: jest.fn(),
  isWorklet: jest.fn(() => false),
  makeShareable: (v) => v,
  makeShareableCloneRecursive: (v) => v,
};
