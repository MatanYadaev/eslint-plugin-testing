import {TSESTree} from "@typescript-eslint/utils";
import {createRule} from "../utils/create-rule.js";

export const RULE_NAME = 'aaa-comments'
export type Options = []
export type MessageIds = 'missing' | 'wrong-order';

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

const findCommentByKeyword = (comments: TSESTree.Comment[], keyword: string) =>
  comments.find(comment => comment.value.trim().toLowerCase().startsWith(keyword));


export default createRule<Options, MessageIds>({
  create: (context) => ({
    CallExpression(node) {
      if (!isTestCallExpression(node)) {
        return;
      }

      const comments = context.getSourceCode().getCommentsInside(node);

      const arrangeComment = findCommentByKeyword(comments, 'arrange');
      const actComment = findCommentByKeyword(comments, 'act');
      const assertComment = findCommentByKeyword(comments, 'assert');

      if (!arrangeComment || !actComment || !assertComment) {
        context.report({
          node,
          messageId: 'missing',
        });
        return;
      }

      if (
        arrangeComment.loc.start.line > actComment.loc.start.line ||
        actComment.loc.start.line > assertComment.loc.start.line
      ) {
        context.report({
          node,
          messageId: 'wrong-order',
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
      missing: 'Test should have arrange, act, and assert comments',
      'wrong-order': 'Test should have arrange, act, and assert comments in the right order',
    },
    schema: [],
  },
  defaultOptions: [],
})

