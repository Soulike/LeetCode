/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  /**
   * @param {number} preorderStart
   * @param {number} inorderStart
   * @param {number} length
   * @returns {TreeNode|null}
   */
  function helper(preorderStartIndex, inorderStartIndex, length) {
    if (length === 0) {
      return null;
    }
    const rootValue = preorder[preorderStartIndex];

    const rootValueIndexInInorder = inorder.indexOf(
      rootValue,
      inorderStartIndex,
    );

    const leftChildLength = rootValueIndexInInorder - inorderStartIndex;
    const rightChildLength = length - leftChildLength - 1;

    const root = new TreeNode(rootValue);
    root.left = helper(
      preorderStartIndex + 1,
      inorderStartIndex,
      leftChildLength,
    );
    root.right = helper(
      preorderStartIndex + 1 + leftChildLength,
      rootValueIndexInInorder + 1,
      rightChildLength,
    );
    return root;
  }

  return helper(0, 0, preorder.length);
};
// @lc code=end
