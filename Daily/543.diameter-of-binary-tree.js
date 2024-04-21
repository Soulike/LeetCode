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
 * @param {TreeNode | null} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  /** @type {Map<TreeNode, [left: number, right: number]>} */
  const subtreePathLengthsMemo = new Map();
  /**
   * @param {TreeNode} root
   * @return {[left: number, right: number]} - The max length of the path from root to a leaf node in left / right subtree.
   */
  const maxSubtreePathLengthsOfRoot = (root) => {
    if (root.left === null && root.right === null) return [0, 0];

    if (subtreePathLengthsMemo.has(root))
      return subtreePathLengthsMemo.get(root);
    const leftSubtreeMaxPathLength = root.left
      ? Math.max(...maxSubtreePathLengthsOfRoot(root.left))
      : -1;
    const rightSubtreeMaxPathLength = root.right
      ? Math.max(...maxSubtreePathLengthsOfRoot(root.right))
      : -1;

    /** @type {[number, number]} */
    const result = [
      1 + leftSubtreeMaxPathLength,
      1 + rightSubtreeMaxPathLength,
    ];
    subtreePathLengthsMemo.set(root, result);
    return result;
  };

  let maxDiameter = 0;

  /**
   * @param {TreeNode | null} root
   * @return {void}
   */
  const postOrderTraverse = (root) => {
    if (root === null) return;
    postOrderTraverse(root.left);
    postOrderTraverse(root.right);

    const [left, right] = maxSubtreePathLengthsOfRoot(root);
    maxDiameter = Math.max(maxDiameter, left + right);
  };

  postOrderTraverse(root);
  return maxDiameter;
};
// @lc code=end
