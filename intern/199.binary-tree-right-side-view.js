/*
 * @lc app=leetcode id=199 lang=javascript
 *
 * [199] Binary Tree Right Side View
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
 * @return {number[]}
 */
const rightSideView = function (root) {
  if (root === null) {
    return [];
  }
  const output = [];
  let currentLevelNodes = [root];
  let nextLevelNodes = [];
  while (currentLevelNodes.length !== 0) {
    output.push(currentLevelNodes[currentLevelNodes.length - 1].val);
    for (const node of currentLevelNodes) {
      if (node.left !== null) {
        nextLevelNodes.push(node.left);
      }
      if (node.right !== null) {
        nextLevelNodes.push(node.right);
      }
    }
    currentLevelNodes = nextLevelNodes;
    nextLevelNodes = [];
  }
  return output;
};
// @lc code=end
