/*
 * @lc app=leetcode id=606 lang=javascript
 *
 * [606] Construct String from Binary Tree
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
 * @return {string}
 */
var tree2str = function (root) {
    if (root === null) return '';
    const leftChildStr = tree2str(root.left);
    const rightChildStr = tree2str(root.right);

    if (rightChildStr === '') {
        return leftChildStr === ''
            ? `${root.val}`
            : `${root.val}(${leftChildStr})`;
    }
    return `${root.val}(${leftChildStr})(${rightChildStr})`;
};
// @lc code=end
