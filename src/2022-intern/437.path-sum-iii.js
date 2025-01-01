/*
 * @lc app=leetcode id=437 lang=javascript
 *
 * [437] Path Sum III
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// @lc code=start
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
const pathSum = function (root, targetSum) {
  if (root === null) {
    return 0;
  }

  let count = 0;
  // 算上根结点
  count += includePathSum(root, targetSum);
  // 不算根结点
  if (root.left !== null) {
    count += pathSum(root.left, targetSum);
  }
  if (root.right !== null) {
    count += pathSum(root.right, targetSum);
  }
  return count;
};

/**
 * 从根结点出发，查找等于 targetSum 的路径个数
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
function includePathSum(root, targetSum) {
  let count = 0;
  if (root.val === targetSum) {
    count++;
  }
  if (root.left !== null) {
    count += includePathSum(root.left, targetSum - root.val);
  }
  if (root.right !== null) {
    count += includePathSum(root.right, targetSum - root.val);
  }
  return count;
}
// @lc code=end
