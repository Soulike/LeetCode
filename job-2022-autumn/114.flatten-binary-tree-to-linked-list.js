/*
 * @lc app=leetcode id=114 lang=javascript
 *
 * [114] Flatten Binary Tree to Linked List
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (root === null) return;

  let left = root.left;
  const right = root.right;

  flatten(left);
  flatten(right);

  if (left !== null) {
    root.right = left;
    root.left = null;
    while (left.right !== null) {
      left = left.right;
    }
    left.right = right;
  }
};
// @lc code=end
