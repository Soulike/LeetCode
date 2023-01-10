/*
 * @lc app=leetcode id=101 lang=javascript
 *
 * [101] Symmetric Tree
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
    /**
     * @param {TreeNode|null} left
     * @param {TreeNode|null} right
     * @returns {boolean}
     */
    const isSymmetricRecursive = (left, right) => {
        if (left !== null && right !== null) {
            if (left.val !== right.val) return false;
            else {
                return (
                    isSymmetricRecursive(left.left, right.right) &&
                    isSymmetricRecursive(left.right, right.left)
                );
            }
        } else return left === right;
    };

    return isSymmetricRecursive(root, root);
};
// @lc code=end
