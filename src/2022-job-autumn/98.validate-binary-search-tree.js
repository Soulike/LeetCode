/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  const result = helper(root);
  return result.isValid;
};

/**
 *
 * @param {TreeNode} root
 * @returns {{isValid: true, maxVal: number, minVal: number}|{isValid: false}}
 */
function helper(root) {
  if (root.left === null && root.right === null) {
    return {isValid: true, minVal: root.val, maxVal: root.val};
  }

  let minVal = root.val;
  let maxVal = root.val;

  if (root.left !== null) {
    const leftResult = helper(root.left);
    if (!leftResult.isValid || root.val <= leftResult.maxVal) {
      return {isValid: false};
    }
    minVal = leftResult.minVal;
  }
  if (root.right !== null) {
    const rightResult = helper(root.right);
    if (!rightResult.isValid || root.val >= rightResult.minVal) {
      return {isValid: false};
    }
    maxVal = rightResult.maxVal;
  }

  return {isValid: true, minVal, maxVal};
}
// @lc code=end
