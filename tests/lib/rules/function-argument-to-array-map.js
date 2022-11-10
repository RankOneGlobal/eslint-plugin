/**
 * @fileoverview Promotes function argument to Array.map rather than anonymous function that passes through arguments
 * @author
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/function-argument-to-array-map'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('function-argument-to-array-map', rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: 'someArray.map((arg) => someFunc(arg))',
      errors: [{ message: 'Fill me in.', type: 'Me too' }]
    }
  ]
});
