/*
 * @lc app=leetcode id=543 lang=javascript
 *
 * [543] Diameter of Binary Tree
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
var diameterOfBinaryTree = function (root) {
  const {diameter} = helper(root);
  return diameter;
};

/**
 * @returns {{maxDepth: number, diameter: number}} - 树的最大深度，和树中存在的最长路径
 */
function helper(root) {
  if (root === null) {
    return {maxDepth: 0, diameter: 0};
  }
  const {maxDepth: leftMaxDepth, diameter: leftDiameter} = helper(root.left);
  const {maxDepth: rightMaxDepth, diameter: rightDiameter} = helper(root.right);
  return {
    maxDepth: 1 + Math.max(leftMaxDepth, rightMaxDepth),
    diameter: Math.max(
      leftDiameter,
      rightDiameter,
      leftMaxDepth + rightMaxDepth,
    ),
  };
}
// @lc code=end
