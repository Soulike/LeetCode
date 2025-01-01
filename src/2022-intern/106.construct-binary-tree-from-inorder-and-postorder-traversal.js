/*
 * @lc app=leetcode id=106 lang=javascript
 *
 * [106] Construct Binary Tree from Inorder and Postorder Traversal
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  /**
   * @param {[number, number]} inorderRange
   * @param {[number, number]} postorderRange
   */
  function helper(inorderRange, postorderRange) {
    const [inorderStart, inorderEnd] = inorderRange;
    const [postorderStart, postorderEnd] = postorderRange;
    if (inorderStart === inorderEnd) {
      return null;
    }

    const rootVal = postorder[postorderEnd - 1];
    let rootIndexInInorder = inorderStart;
    for (let i = inorderStart; i < inorderEnd; i++) {
      if (inorder[i] === rootVal) {
        rootIndexInInorder = i;
        break;
      }
    }

    const leftChildNodeCount = rootIndexInInorder - inorderStart;

    const leftChild = helper(
      [inorderStart, inorderStart + leftChildNodeCount],
      [postorderStart, postorderStart + leftChildNodeCount],
    );
    const rightChild = helper(
      [rootIndexInInorder + 1, inorderEnd],
      [postorderStart + leftChildNodeCount, postorderEnd - 1],
    );

    const root = new TreeNode(rootVal, leftChild, rightChild);

    return root;
  }

  return helper([0, inorder.length], [0, postorder.length]);
};
// @lc code=end
