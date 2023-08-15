import {TSESTree} from "@typescript-eslint/utils";
import {createRule} from "../utils/create-rule";

export const RULE_NAME = 'aaa-comments'
export type Options = []
export type MessageIds = 'default';

const testFunctionNames = ['it', 'test'];

const isTestCallExpression = (node: TSESTree.CallExpression) => {
  if (node.callee.type === 'Identifier' &&
    testFunctionNames.includes(node.callee.name)) {
    return true;
  }

  const isOnlyOrSkipCall = node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    testFunctionNames.includes(node.callee.object.name) &&
    'name' in node.callee.property &&
    ['only', 'skip'].includes(node.callee.property.name);

  if (isOnlyOrSkipCall) {
    return true;
  }

  const isEachCallExpression = node.callee.type === 'CallExpression' &&
    node.callee.callee.type === 'MemberExpression' &&
    node.callee.callee.object.type === 'Identifier' &&
    testFunctionNames.includes(node.callee.callee.object.name) &&
    node.callee.callee.property.type === 'Identifier' &&
    node.callee.callee.property.name === 'each';

  return isEachCallExpression;
}

export default createRule<Options, MessageIds>({
  create: (context) => ({
    CallExpression(node) {
      if (!isTestCallExpression(node)) {
        return;
      }

      const comments = context.getSourceCode().getCommentsInside(node);

      const hasActComment = comments.some((comment) =>
        comment.value.trim().toLowerCase().startsWith('act')
      );

      const hasAssertComment = comments.some((comment) =>
        comment.value.trim().toLowerCase().startsWith('assert')
      );

      if (!(hasActComment && hasAssertComment)) {
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

