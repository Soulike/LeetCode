/*
 * @lc app=leetcode id=129 lang=javascript
 *
 * [129] Sum Root to Leaf Numbers
 */
class TreeNode {
  /**
   * @param {number} val
   * @param {TreeNode|null} left
   * @param {TreeNode|null} right
   */
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
// @lc code=start
/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumNumbers = function (root) {
  return helper(root, 0);
};

/**
 * @param {TreeNode} root
 * @param {number} prevSum
 * @return {number}
 */
function helper(root, prevSum) {
  const currentSum = prevSum * 10 + root.val;
  if (root.left === null && root.right === null) {
    return currentSum;
  }
  let result = 0;
  if (root.left !== null) {
    result += helper(root.left, currentSum);
  }
  if (root.right !== null) {
    result += helper(root.right, currentSum);
  }
  return result;
}
// @lc code=end
