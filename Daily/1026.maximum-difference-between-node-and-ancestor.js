/*
 * @lc app=leetcode id=1026 lang=javascript
 *
 * [1026] Maximum Difference Between Node and Ancestor
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
 * @return {number}
 */
var maxAncestorDiff = function (root) {
    /**
     * @param {TreeNode|null} root
     * @param {number} min - min val in root's ancestors
     * @param {number} max - max val in root's ancestors
     * @returns {number} max diff in root
     */
    const maxDiff = (root, min, max) => {
        if (root === null) return -1;

        const selfDiff = Math.max(
            Math.abs(min - root.val),
            Math.abs(max - root.val),
        );

        min = Math.min(min, root.val);
        max = Math.max(max, root.val);

        const leftDiff = maxDiff(root.left, min, max);
        const rightDiff = maxDiff(root.right, min, max);

        return Math.max(selfDiff, leftDiff, rightDiff);
    };

    return maxDiff(root, root.val, root.val);
};
// @lc code=end
