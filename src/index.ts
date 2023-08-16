import aaaComments, {RULE_NAME as aaaCommentsRuleName} from './rules/aaa-comments.js';
import {createConfig} from "./utils/create-config.js";

export const rules = {
  [aaaCommentsRuleName]: aaaComments,
}

const allRules = {
  [`testing/${aaaCommentsRuleName}`]: 'warn',
} as const;

const recommendedRules = {
  [`testing/${aaaCommentsRuleName}`]: 'error',
} as const;


export const configs = {
  all: createConfig(allRules),
  recommended: createConfig(recommendedRules),
};

export default {
  rules,
  configs: configs,
}