/*
 * @lc app=leetcode id=111 lang=javascript
 *
 * [111] Minimum Depth of Binary Tree
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
var minDepth = function (root) {
    if (root === null) {
        return 0;
    }

    if (root.left !== null && root.right !== null) {
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    } else if (root.left !== null) {
        return 1 + minDepth(root.left);
    } else if (root.right !== null) {
        return 1 + minDepth(root.right);
    } else {
        return 1;
    }
};
// @lc code=end
