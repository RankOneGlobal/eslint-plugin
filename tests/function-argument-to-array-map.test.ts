import { TSESLint } from '@typescript-eslint/utils';
import rule from '../src/function-argument-to-array-map';

const ruleTester = new TSESLint.RuleTester({
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false
  },
  parser: require.resolve('@typescript-eslint/parser')
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const messageId = 'unnecessary';

// https://github.com/typescript-eslint/typescript-eslint/blob/6c3816b3831e6e683c1a7842196b34248803d69b/packages/experimental-utils/src/ts-eslint/RuleTester.ts
ruleTester.run('function-argument-to-array-map', rule, {
  valid: [
    { code: 'var someFunc = function(arg) { return arg+1; }; [].map(someFunc);' },
    { code: 'var someList = [1, 2]; var someFunc = function(arg1, arg2) { }; someList.map(someFunc);' }
  ],
  invalid: [
    {
      code: `var someFunc = function(arg) { return arg+1; };
      var x = [].map(function(invalid) { return someFunc(invalid); });`,
      errors: [
        {
          messageId,
          line: 2
        }
      ]
    },
    {
      code: `var someList = [1,2];
      var someFunc = function(arg1, arg2) { };
      someList.map(function(arg1, arg2) { return someFunc(arg1, arg2); });`,
      errors: [
        {
          messageId,
          line: 3
        }
      ]
    },
    {
      code: `var someFunc = function(...args) { };
      [].map((...args) => someFunc(...args));`,
      errors: [
        {
          messageId,
          line: 2
        }
      ]
    },
    {
      code: `class Test {
        public some = (arg) => arg+1;
      }
      const test = new Test();
      [].map(arg => test.some(arg));`,
      errors: [
        {
          messageId,
          line: 5
        }
      ]
    }
  ]
});
