import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import {createRule} from "../utils/create-rule";

export const RULE_NAME = 'aaa-comments'
export type Options = []
export type MessageIds = 'default'

const isTestBlock = (node: TSESTree.CallExpression) => {
  return (
    node.callee.type === 'Identifier' &&
    (node.callee.name === 'it' || node.callee.name === 'test')
  );
}

export default createRule<Options, MessageIds>({
  create: (context) => ({
    CallExpression(node) {
      if (!isTestBlock(node)) {
        return;
      }

      const comments = context.getSourceCode().getCommentsInside(node);

      const hasArrangeComment = comments.some((comment) =>
        comment.value.trim().toLowerCase().startsWith('arrange')
      );

      const hasActComment = comments.some((comment) =>
        comment.value.trim().toLowerCase().startsWith('act')
      );

      const hasAssertComment = comments.some((comment) =>
        comment.value.trim().toLowerCase().startsWith('assert')
      );

      if (!(hasArrangeComment && hasActComment && hasAssertComment)) {
        context.report({
          node,
          messageId: 'default',
        });
      }
    },
  }),
  name: RULE_NAME,
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce AAA comments',
    },
    messages: {
      default: 'All tests should include Arrange, Act, and Assert comments.',
    },
    schema: [],
  },
  defaultOptions: []
})

