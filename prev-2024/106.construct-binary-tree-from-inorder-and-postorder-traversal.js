/*
 * @lc app=leetcode id=106 lang=javascript
 *
 * [106] Construct Binary Tree from Inorder and Postorder Traversal
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// @lc code=start
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode | null}
 */
var buildTree = function (inorder, postorder) {
  /**
   * @param {[number, number]} inorderRange
   * @param {[number, number]} postorderRange
   * @returns {TreeNode | null}
   */
  const helper = (
    [inorderStart, inorderEnd],
    [postOrderStart, postOrderEnd],
  ) => {
    const rootVal = postorder[postOrderEnd];
    const root = new TreeNode(rootVal, null, null);

    if (inorderStart > inorderEnd || postOrderStart > postOrderEnd) {
      return null;
    }

    let rootValIndexInInorder = 0;
    for (let i = inorderStart; i <= inorderEnd; i++) {
      if (inorder[i] === rootVal) {
        rootValIndexInInorder = i;
        break;
      }
    }

    const leftSubTreeSize = rootValIndexInInorder - inorderStart;
    const rightSubTreeSize = inorderEnd - rootValIndexInInorder;

    const leftSubTreeInorderStart = inorderStart;
    const leftSubTreeInorderEnd = leftSubTreeInorderStart + leftSubTreeSize - 1;

    const leftSubTreePostorderStart = postOrderStart;
    const leftSubTreePostorderEnd =
      leftSubTreePostorderStart + leftSubTreeSize - 1;

    const rightSubTreeInorderStart = rootValIndexInInorder + 1;
    const rightSubTreeInorderEnd =
      rightSubTreeInorderStart + rightSubTreeSize - 1;

    const rightSubTreePostorderStart = leftSubTreePostorderEnd + 1;
    const rightSubTreePostorderEnd =
      rightSubTreePostorderStart + rightSubTreeSize - 1;

    const leftSubTree = helper(
      [leftSubTreeInorderStart, leftSubTreeInorderEnd],
      [leftSubTreePostorderStart, leftSubTreePostorderEnd],
    );
    const rightSubTree = helper(
      [rightSubTreeInorderStart, rightSubTreeInorderEnd],
      [rightSubTreePostorderStart, rightSubTreePostorderEnd],
    );
    root.left = leftSubTree;
    root.right = rightSubTree;

    return root;
  };

  return helper([0, inorder.length - 1], [0, postorder.length - 1]);
};
// @lc code=end
