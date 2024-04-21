/*
 * @lc app=leetcode id=145 lang=typescript
 *
 * [145] Binary Tree Postorder Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function postorderTraversal(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  const stack: {
    hasVisited: boolean;
    node: TreeNode;
  }[] = [
    {
      hasVisited: false,
      node: root,
    },
  ];
  const result: number[] = [];

  while (stack.length > 0) {
    const top = stack[stack.length - 1];
    if (top.hasVisited) {
      result.push(top.node.val);
      stack.pop();
    } else {
      top.hasVisited = true;
      if (top.node.right) {
        stack.push({
          hasVisited: false,
          node: top.node.right,
        });
      }
      if (top.node.left) {
        stack.push({
          hasVisited: false,
          node: top.node.left,
        });
      }
    }
  }

  return result;
}
// @lc code=end
