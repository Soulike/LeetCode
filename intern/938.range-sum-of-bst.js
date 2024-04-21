/*
 * @lc app=leetcode id=938 lang=javascript
 *
 * [938] Range Sum of BST
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
const rangeSumBST = function (root, low, high) {
  const stack = [root];
  let sum = 0;
  while (stack.length > 0) {
    const top = stack.pop();
    if (top === null) {
      continue;
    }

    if (top.val < low) {
      stack.push(top.right);
    } else if (top.val > high) {
      stack.push(top.left);
    } else {
      sum += top.val;
      stack.push(top.left, top.right);
    }
  }
  return sum;
};
// @lc code=end
