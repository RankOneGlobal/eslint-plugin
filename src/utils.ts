import { ESLintUtils, AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

const { getParserServices } = ESLintUtils;

export const createRule = ESLintUtils.RuleCreator(() => ``);

export { getParserServices, AST_NODE_TYPES, TSESTree };
