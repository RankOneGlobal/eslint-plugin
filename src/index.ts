import rules from './rules';

export = {
  rules,
  configs: {
    recommended: {
      plugins: ['@rankone/eslint-plugin'],
      rules: {
        '@rankone/function-argument-to-array-map': ['error']
      }
    }
  }
};
