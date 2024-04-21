/*
 * @lc app=leetcode id=230 lang=javascript
 *
 * [230] Kth Smallest Element in a BST
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const resultWrapper = {result: NaN};
  inorderTraverse(root, k, resultWrapper);
  return resultWrapper.result;
};

/**
 *
 * @param {TreeNode|null} root
 * @param {number} k - How many iteration positions left before traveling `root`
 * @param {{result: number}} resultWrapper
 * @returns {number} - How many iteration positions left after traveling `root`
 */
function inorderTraverse(root, k, resultWrapper) {
  if (root === null) return k;

  k = inorderTraverse(root.left, k, resultWrapper);
  k--;
  // the current root uses the last position, stop traveling and output result
  if (k === 0) {
    resultWrapper.result = root.val;
  } else {
    k = inorderTraverse(root.right, k, resultWrapper);
  }
  return k;
}
// @lc code=end
