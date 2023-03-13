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
     * @param {TreeNode|null} leftRoot
     * @param {TreeNode|null} rightRoot
     * @returns {boolean}
     */
    const isSymmetricRecursive = (leftRoot, rightRoot) => {
        if (leftRoot === null && rightRoot === null) {
            return true;
        } else if (leftRoot === null || rightRoot === null) {
            return false;
        } else {
            return (
                leftRoot.val === rightRoot.val &&
                isSymmetricRecursive(leftRoot.left, rightRoot.right) &&
                isSymmetricRecursive(leftRoot.right, rightRoot.left)
            );
        }
    };

    return isSymmetricRecursive(root.left, root.right);
};
// @lc code=end
