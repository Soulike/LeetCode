/*
 * @lc app=leetcode id=450 lang=javascript
 *
 * [450] Delete Node in a BST
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
 * @param {number} key
 * @return {TreeNode | null}
 */
var deleteNode = function (root, key) {
  if (root === null) {
    return null;
  }

  if (root.val === key) {
    if (root.left === null && root.right === null) {
      return null;
    } else if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      const minNode = getMinNode(root.right);
      root.right = deleteNode(root.right, minNode.val);
      minNode.left = root.left;
      minNode.right = root.right;
      return minNode;
    }
  } else {
    root.left = deleteNode(root.left, key);
    root.right = deleteNode(root.right, key);
    return root;
  }
};

/**
 * @param {TreeNode} root
 * @returns {TreeNode}
 */
function getMinNode(root) {
  while (root.left !== null) {
    root = root.left;
  }
  return root;
}
// @lc code=end
