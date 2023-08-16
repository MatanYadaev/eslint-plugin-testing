import enforceAaaComments, {RULE_NAME as enforceAaaCommentsRuleName} from './rules/aaa-comments.js';
import {createConfig} from "./utils/create-config.js";

const rules = {
  [enforceAaaCommentsRuleName]: enforceAaaComments,
}

const allRules = Object.entries(rules).reduce(
  (acc, [name, rule]) => ({
    ...acc,
    [`testing/${name}`]: rule,
  }
), {});

const recommendedRules = Object.entries(rules)
  .filter(([, rule]) => rule.meta.docs?.recommended)
  .reduce(
    (acc, [name, rule]) => ({
      ...acc,
      [`testing/${name}`]: rule.meta.docs!.recommended,
    }),
    {},
  );

export default {
  rules: {
    [enforceAaaCommentsRuleName]: enforceAaaComments,
  },
  configs: {
    all : createConfig(allRules),
    recommended: createConfig(recommendedRules),
  },
}