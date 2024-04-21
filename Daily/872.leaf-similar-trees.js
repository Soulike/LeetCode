/*
 * @lc app=leetcode id=872 lang=javascript
 *
 * [872] Leaf-Similar Trees
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  /**
   * @param {TreeNode | null} root
   * @returns {number[]}
   */
  const getLeafValues = (root) => {
    if (root === null) return [];
    if (root.left === null && root.right === null) {
      return [root.val];
    }
    const leftLeafValues = getLeafValues(root.left);
    const rightLeafValues = getLeafValues(root.right);
    leftLeafValues.push(...rightLeafValues);
    return leftLeafValues;
  };

  const tree1LeafValues = getLeafValues(root1);
  const tree2LeafValues = getLeafValues(root2);

  if (tree1LeafValues.length !== tree2LeafValues.length) {
    return false;
  }

  const leavesLength = tree1LeafValues.length;

  for (let i = 0; i < leavesLength; i++) {
    if (tree1LeafValues[i] !== tree2LeafValues[i]) {
      return false;
    }
  }

  return true;
};
// @lc code=end
