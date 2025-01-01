/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// @lc code=start

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode | null}
 */
const buildTree = function (preorder, inorder) {
  /**
   * @param {[number,number]} preorderRange
   * @param {[number,number]} inorderRange
   */
  function helper(preorderRange, inorderRange) {
    const [preorderStart, preorderEnd] = preorderRange;
    const [inorderStart, inorderEnd] = inorderRange;
    if (preorderEnd === preorderStart) {
      return null;
    }

    const rootVal = preorder[preorderStart];
    let rootIndexInInorder = inorderStart;
    for (let i = inorderStart; i < inorderEnd; i++) {
      if (inorder[i] === rootVal) {
        rootIndexInInorder = i;
        break;
      }
    }

    const leftChildNodeCount = rootIndexInInorder - inorderStart;

    const leftChild = helper(
      [preorderStart + 1, preorderStart + 1 + leftChildNodeCount],
      [inorderStart, rootIndexInInorder],
    );
    const rightChild = helper(
      [preorderStart + 1 + leftChildNodeCount, preorderEnd],
      [rootIndexInInorder + 1, inorderEnd],
    );

    const root = new TreeNode(rootVal, leftChild, rightChild);
    return root;
  }

  return helper([0, preorder.length], [0, inorder.length]);
};
// @lc code=end
