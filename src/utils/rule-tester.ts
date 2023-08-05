import { RuleTester } from "eslint";

export const ruleTester = new RuleTester({
  env: {
    es6: true,
  }
});