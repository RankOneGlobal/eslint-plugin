import functionArgumentToArrayMap from './function-argument-to-array-map';

export = {
  rules: {
    'function-argument-to-array-map': functionArgumentToArrayMap
  },
  configs: {
    recommended: {
      plugins: ['@rankone/eslint-plugin'],
      rules: {
        '@rankone/function-argument-to-array-map': ['error']
      }
    }
  }
};
