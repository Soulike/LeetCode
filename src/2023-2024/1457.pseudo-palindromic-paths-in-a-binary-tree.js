/*
 * @lc app=leetcode id=1457 lang=javascript
 *
 * [1457] Pseudo-Palindromic Paths in a Binary Tree
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
var pseudoPalindromicPaths = function (root) {
  let pathNum = 0;
  const numberCounts = new Array(10);
  numberCounts.fill(0);

  /**
   * @param {TreeNode} root
   */
  const backtrack = (root) => {
    numberCounts[root.val]++;
    if (root.left === null && root.right === null) {
      if (hasOnlyOneOddCountNumber(numberCounts)) pathNum++;
    }
    if (root.left) backtrack(root.left);
    if (root.right) backtrack(root.right);
    numberCounts[root.val]--;
  };

  backtrack(root);
  return pathNum;
};

/**
 * @param {readonly number[]} numberCounts
 * @returns {boolean}
 */
function hasOnlyOneOddCountNumber(numberCounts) {
  let oddNumCount = 0;
  for (const count of numberCounts) {
    if (count % 2 === 1) {
      if (oddNumCount === 1) return false;
      oddNumCount++;
    }
  }
  return true;
}
// @lc code=end
