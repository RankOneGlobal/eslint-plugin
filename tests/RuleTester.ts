import { ESLintUtils } from '@typescript-eslint/utils';
import * as path from 'path';

export const { RuleTester } = ESLintUtils;

export function getFixturesRootDir(): string {
  return path.join(__dirname, 'fixtures');
}
