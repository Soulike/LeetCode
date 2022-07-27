/*
 * @lc app=leetcode id=236 lang=javascript
 *
 * [236] Lowest Common Ancestor of a Binary Tree
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
 * @param {TreeNode | null} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode | null}
 */
var lowestCommonAncestor = function (root, p, q) {
    if (root === null) {
        return null;
    }
    if (root === p || root === q) {
        return root;
    }

    const leftResult = lowestCommonAncestor(root.left, p, q);
    const rightResult = lowestCommonAncestor(root.right, p, q);
    if (leftResult !== null && rightResult !== null) {
        return root;
    }
    return leftResult ?? rightResult;
};
// @lc code=end
