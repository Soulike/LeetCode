/*
 * @lc app=leetcode id=94 lang=javascript
 *
 * [94] Binary Tree Inorder Traversal
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    /** @type {number[]} */
    const result = [];

    /**
     * @param {TreeNode | null} root
     * @returns {void}
     */
    const helper = (root) => {
        if (root === null) return;
        helper(root.left);
        result.push(root.val);
        helper(root.right);
    };

    helper(root);

    return result;
};
// @lc code=end
