import rules from './rules';

const plugin = {
  meta: {
    name: '@rankone/eslint-plugin'
  },
  rules
};

const recommendedRules = {
  '@rankone/function-argument-to-array-map': ['error']
};

export = {
  ...plugin,
  configs: {
    // .eslintrc
    recommended: {
      plugins: ['@rankone/eslint-plugin'],
      rules: recommendedRules
    },
    // eslint.config.js
    'flat/recommended': {
      plugins: { '@rankone': plugin },
      rules: recommendedRules
    }
  }
};
