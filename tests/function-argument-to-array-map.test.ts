import { TSESLint } from '@typescript-eslint/utils';
import rule from '../src/function-argument-to-array-map';

const ruleTester = new TSESLint.RuleTester({
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  parser: require.resolve('@typescript-eslint/parser'),
});


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const messageId = 'unnecessary';
ruleTester.run('function-argument-to-array-map', rule, {
  valid: [
    { code: 'var someFunc = function(arg) { return arg+1; }; [].map(someFunc);'},
    { code: 'var someList = [1, 2]; var someFunc = function(arg1, arg2) { }; someList.map(someFunc);'}
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
      code: `
      class Test {
        public some = (arg) => arg+1;
      }
      const test = new Test();
      [].map(arg => test.some(arg));`,
      errors: [
        {
          messageId,
          line: 6
        }
      ]
    }
  ]
});
