/*
 * @lc app=leetcode id=700 lang=javascript
 *
 * [700] Search in a Binary Search Tree
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
 * @param {TreeNode | null} root
 * @param {number} val
 * @return {TreeNode | null}
 */
var searchBST = function (root, val) {
  if (root === null || root.val === val) {
    return root;
  }

  return searchBST(val < root.val ? root.left : root.right, val);
};
// @lc code=end
