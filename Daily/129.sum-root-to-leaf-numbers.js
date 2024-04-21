/*
 * @lc app=leetcode id=129 lang=javascript
 *
 * [129] Sum Root to Leaf Numbers
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// @lc code=start

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  let totalSum = 0;
  let currentPathSum = 0;

  /**
   * @param {TreeNode} root
   * @returns {void}
   */
  const backtrack = (root) => {
    if (root === null) return;

    currentPathSum *= 10;
    currentPathSum += root.val;
    if (root.left === null && root.right === null) {
      totalSum += currentPathSum;
    } else {
      backtrack(root.left);
      backtrack(root.right);
    }
    currentPathSum -= root.val;
    currentPathSum /= 10;
  };

  backtrack(root);
  return totalSum;
};
// @lc code=end
