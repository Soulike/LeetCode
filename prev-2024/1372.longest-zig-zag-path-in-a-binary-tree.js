/*
 * @lc app=leetcode id=1372 lang=javascript
 *
 * [1372] Longest ZigZag Path in a Binary Tree
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
var longestZigZag = function (root) {
  let longestZigZagNodeNumber = 0;
  const TO_LEFT = 0;
  const TO_RIGHT = 1;

  /**
   * @param {TreeNode|null} root
   * @returns {[toLeft: number, toRight: number]}
   */
  const visit = (root) => {
    if (root === null) return [0, 0];

    const leftVisitResult = visit(root.left);
    const rightVisitResult = visit(root.right);

    longestZigZagNodeNumber = Math.max(
      longestZigZagNodeNumber,
      1 + leftVisitResult[TO_RIGHT],
      1 + rightVisitResult[TO_LEFT],
      leftVisitResult[TO_LEFT],
      rightVisitResult[TO_RIGHT],
    );

    return [1 + leftVisitResult[TO_RIGHT], 1 + rightVisitResult[TO_LEFT]];
  };

  visit(root);

  return longestZigZagNodeNumber - 1;
};
// @lc code=end
