/*
 * @lc app=leetcode id=1379 lang=javascript
 *
 * [1379] Find a Corresponding Node of a Binary Tree in a Clone of That Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */
var getTargetCopy = function (original, cloned, target) {
  if (original === null) {
    return null;
  }

  if (original === target) {
    return cloned;
  } else {
    return (
      getTargetCopy(original.left, cloned.left, target) ??
      getTargetCopy(original.right, cloned.right, target)
    );
  }
};
// @lc code=end
