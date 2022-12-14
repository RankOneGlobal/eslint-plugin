import rule from '../../src/rules/function-argument-to-array-map';
import { RuleTester, getFixturesRootDir } from '../RuleTester';

const rootDir = getFixturesRootDir();
const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    tsconfigRootDir: rootDir,
    project: './tsconfig.json'
  }
});

const messageId = 'unnecessary';

// https://github.com/typescript-eslint/typescript-eslint/blob/6c3816b3831e6e683c1a7842196b34248803d69b/packages/experimental-utils/src/ts-eslint/RuleTester.ts
ruleTester.run('function-argument-to-array-map', rule, {
  valid: [
    { code: 'var someFunc = function(arg) { return arg+1; }; [].map(someFunc);' },
    { code: 'var someList = [1, 2]; var someFunc = function(arg1, arg2) { }; someList.map(someFunc);' },
    {
      // Some functions take more parameters that we want to discard
      code: `const someList = [{"test": true}];
      someList.map((val) => JSON.stringify(val));`
    },
    {
      code: `let y = 0;
      const someFunc = (arg1) => 0;
      [].map((arg1, i) => {
        y += i;
        return someFunc(arg1);
      })`
    },
    {
      code: `const someFunc = (arg1, s) => 0;
      [].map((arg1) => someFunc(arg1, 'test'))`
    },
    {
      code: `let y = 0;
      const someFunc = (arg1, index) => 0;
      [].map((arg1, i) => {
        y += i;
        return someFunc(arg1, i);
      })`
    }
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
      ],
      output: `var someFunc = function(arg) { return arg+1; };
      var x = [].map(someFunc);`
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
      ],
      output: `var someList = [1,2];
      var someFunc = function(arg1, arg2) { };
      someList.map(someFunc);`
    },
    {
      code: `var someFunc = function(...args) { };
      [].map((...args) => someFunc(...args));`,
      errors: [
        {
          messageId,
          line: 2
        }
      ],
      output: `var someFunc = function(...args) { };
      [].map(someFunc);`
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
      ],
      output: `class Test {
        public some = (arg) => arg+1;
      }
      const test = new Test();
      [].map(test.some);`
    }
  ]
});
