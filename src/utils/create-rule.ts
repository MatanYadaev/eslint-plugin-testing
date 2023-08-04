import {ESLintUtils} from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/MatanYadaev/eslint-plugin-testing/blob/main/docs/rules/${name}.md`,
);