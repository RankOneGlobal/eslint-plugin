import { ESLintUtils } from '@typescript-eslint/utils';

const MSG = 'unnecessary';

const createRule = ESLintUtils.RuleCreator(() => '');

const rule = createRule({
  name: 'function-argument-to-array-map',
  meta: {
    messages: {
      [MSG]: 'Unnecessary anonymous function wrapper'
    },
    type: 'suggestion',
    docs: {
      description:
        'Enforce function argument to Array.map() instead of anonymous function that passes through arguments.',
      recommended: 'error',
      requiresTypeChecking: false
    },
    fixable: undefined, // Or `code` or `whitespace`
    schema: [] // Add a schema if the rule has options
  },
  defaultOptions: [],
  create(context) {
    return {
      // https://eslint.org/docs/latest/developer-guide/selectors
      'CallExpression[callee.type="MemberExpression"][callee.property.name="map"]': function (node: any) {
        if (node.arguments.length !== 1) {
          return;
        }

        const anonymousFunc = node.arguments[0];
        if (anonymousFunc.type !== 'FunctionExpression') {
          return;
        }

        const returnStatement = anonymousFunc.body.body.find(function (statement: any) {
          return statement.type === 'ReturnStatement';
        });

        if (!returnStatement) {
          return;
        }

        if (returnStatement.argument.type !== 'CallExpression') {
          return;
        }

        if (anonymousFunc.params.length !== returnStatement.argument.arguments.length) {
          return;
        }

        const difference = anonymousFunc.params.some(function (param: any, i: number) {
          return returnStatement.argument.arguments[i].name !== param.name;
        });

        if (!difference) {
          context.report({ node, messageId: MSG });
        }
      }
    };
  }
});

export default rule;

// /** @type {import('eslint').Rule.RuleModule} */
// module.exports = {
//   meta: {
//     messages: {
//       [MSG]: 'Unnecessary anonymous function wrapper'
//     },
//     type: 'suggestion',
//     docs: {
//       description:
//         'Enforce function argument to Array.map() instead of anonymous function that passes through arguments.',
//       recommended: true,
//       url: null // URL to the documentation page for this rule
//     },
//     fixable: null, // Or `code` or `whitespace`
//     schema: [] // Add a schema if the rule has options
//   },

//   create(context) {
//     // variables should be defined here

//     //----------------------------------------------------------------------
//     // Helpers
//     //----------------------------------------------------------------------

//     // any helper functions should go here or else delete this section

//     //----------------------------------------------------------------------
//     // Public
//     //----------------------------------------------------------------------

//     return {
//       // https://eslint.org/docs/latest/developer-guide/selectors
//       'CallExpression[callee.type="MemberExpression"][callee.property.name="map"]': function (node) {
//         if (node.arguments.length !== 1) {
//           return;
//         }

//         const anonymousFunc = node.arguments[0];
//         if (anonymousFunc.type !== 'FunctionExpression') {
//           return;
//         }

//         const returnStatement = anonymousFunc.body.body.find(function (statement) {
//           return statement.type === 'ReturnStatement';
//         });

//         if (!returnStatement) {
//           return;
//         }

//         if (returnStatement.argument.type !== 'CallExpression') {
//           return;
//         }

//         if (anonymousFunc.params.length !== returnStatement.argument.arguments.length) {
//           return;
//         }

//         const difference = anonymousFunc.params.some(function (param, i) {
//           return returnStatement.argument.arguments[i].name !== param.name;
//         });

//         if (!difference) {
//           context.report({ node, messageId: MSG });
//         }
//       }
//     };
//   }
// };
