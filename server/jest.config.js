export default {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',  // Tells Jest to use Babel for transforming JS files
    },
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: 'node',  // Specifies the environment
  };