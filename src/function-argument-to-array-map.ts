import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';

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

        // If the following args are equal then the anonymous function wrapper is redundant.
        const argsToAnonymousFunction = anonymousFunc.params;
        let argsToRightHandFunction: any[] = [];

        if (anonymousFunc.type === AST_NODE_TYPES.ArrowFunctionExpression) {
          if (anonymousFunc.body.callee.type === AST_NODE_TYPES.MemberExpression) {
            argsToRightHandFunction = anonymousFunc.body.arguments;
          } else {
            return;
          }
        } else if (anonymousFunc.type === AST_NODE_TYPES.FunctionExpression) {
          const returnStatement = anonymousFunc.body.body.find(function (statement: any) {
            return statement.type === AST_NODE_TYPES.ReturnStatement;
          });

          if (returnStatement?.argument.type !== AST_NODE_TYPES.CallExpression) {
            return;
          }

          argsToRightHandFunction = returnStatement.argument.arguments;
        } else {
          return;
        }

        if (argsToAnonymousFunction.length !== argsToRightHandFunction.length) {
          return;
        }

        const difference = argsToAnonymousFunction.some(function (param: any, i: number) {
          return argsToRightHandFunction[i].name !== param.name;
        });

        if (!difference) {
          context.report({ node, messageId: MSG });
        }
      }
    };
  }
});

export default rule;
