import {ESLintUtils} from "@typescript-eslint/utils";
import { version } from '../../package.json';

export const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/MatanYadaev/eslint-plugin-testing/blob/v${version}/docs/rules/${name}.md`,
);