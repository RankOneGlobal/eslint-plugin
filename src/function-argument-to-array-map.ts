import ts from 'typescript';
import { createRule, AST_NODE_TYPES, getParserServices, TSESTree } from './utils';

const MSG = 'unnecessary';

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
    fixable: 'code',
    schema: [] // Add a schema if the rule has options
  },
  defaultOptions: [],
  create(context: any) {
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

        let fix = undefined;

        if (anonymousFunc.type === AST_NODE_TYPES.ArrowFunctionExpression) {
          if (anonymousFunc.body.type === AST_NODE_TYPES.CallExpression) {
            argsToRightHandFunction = anonymousFunc.body.arguments;

            if (anonymousFunc.body.callee.type === AST_NODE_TYPES.MemberExpression) {
              // The anonymous function is calling the method of an object.
              const classOrInstance = anonymousFunc.body.callee.object.name;
              const classMethod = anonymousFunc.body.callee.property.name;

              // https://typescript-eslint.io/custom-rules/#type-checking
              const parserServices = getParserServices(context);
              const checker = parserServices.program.getTypeChecker();

              const getType = (node: TSESTree.Expression): ts.Type =>
                checker.getTypeAtLocation(parserServices.esTreeNodeToTSNodeMap.get(node));

              const type = getType(anonymousFunc.body.callee.property);
              const signatures = type.getCallSignatures();

              if (!signatures.some((signature) => signature.parameters.length === 1)) {
                return;
              }

              fix = (fixer: any) => fixer.replaceText(anonymousFunc, `${classOrInstance}.${classMethod}`);
            } else {
              fix = (fixer: any) => fixer.replaceText(anonymousFunc, anonymousFunc.body.callee.name);
            }
          } else {
            return; // Unhandled or not breaking the rule
          }
        } else if (anonymousFunc.type === AST_NODE_TYPES.FunctionExpression) {
          const returnStatement = anonymousFunc.body.body.find(function (statement: any) {
            return statement.type === AST_NODE_TYPES.ReturnStatement;
          });

          if (returnStatement?.argument.type !== AST_NODE_TYPES.CallExpression) {
            return; // Unhandled or not breaking the rule
          }

          argsToRightHandFunction = returnStatement.argument.arguments;
          fix = (fixer: any) => fixer.replaceText(anonymousFunc, returnStatement.argument.callee.name);
        } else {
          return; // Unhandled or not breaking the rule
        }

        if (argsToAnonymousFunction.length !== argsToRightHandFunction.length) {
          return; // Unhandled or not breaking the rule
        }

        const difference = argsToAnonymousFunction.some(function (param: any, i: number) {
          return argsToRightHandFunction[i].name !== param.name;
        });

        if (!difference) {
          context.report({
            node,
            messageId: MSG,
            fix
          });
        }
      }
    };
  }
});

export default rule;
