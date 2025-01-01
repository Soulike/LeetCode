/*
 * @lc app=leetcode id=144 lang=typescript
 *
 * [144] Binary Tree Preorder Traversal
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

function preorderTraversal(root: TreeNode | null): number[] {
  const stack: TreeNode[] = [];
  const result: number[] = [];

  let currentNode = root;

  while (currentNode || stack.length > 0) {
    while (currentNode !== null) {
      stack.push(currentNode);
      result.push(currentNode.val);
      currentNode = currentNode.left;
    }
    const top = stack.pop()!;
    currentNode = top.right;
  }

  return result;
}
// @lc code=end
