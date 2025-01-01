/*
 * @lc app=leetcode id=1315 lang=javascript
 *
 * [1315] Sum of Nodes with Even-Valued Grandparent
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
 * @return {number}
 */
const sumEvenGrandparent = function (root) {
  return helper(root, false);
};

function helper(root, parentIsEven) {
  if (root === null) {
    return 0;
  }
  const currentIsEven = root.val % 2 === 0;

  if (parentIsEven) {
    return (
      (root.left?.val ?? 0) +
      (root.right?.val ?? 0) +
      helper(root.left, currentIsEven) +
      helper(root.right, currentIsEven)
    );
  } else {
    return helper(root.left, currentIsEven) + helper(root.right, currentIsEven);
  }
}
// @lc code=end
