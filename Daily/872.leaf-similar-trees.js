/*
 * @lc app=leetcode id=872 lang=javascript
 *
 * [872] Leaf-Similar Trees
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
    /** @type {number[]} */
    const tree1Leaves = [];
    /** @type {number[]} */
    const tree2Leaves = [];

    /**
     * @param {TreeNode | null} root
     * @param {number[]} leafValues
     * @returns {void}
     */
    const preOrderTraverse = (root, leafValues) => {
        if (root === null) return;
        if (root.left === null && root.right === null) {
            leafValues.push(root.val);
            return;
        }
        preOrderTraverse(root.left, leafValues);
        preOrderTraverse(root.right, leafValues);
    };

    preOrderTraverse(root1, tree1Leaves);
    preOrderTraverse(root2, tree2Leaves);

    if (tree1Leaves.length !== tree2Leaves.length) {
        return false;
    }

    const length = tree1Leaves.length;
    for (let i = 0; i < length; i++) {
        if (tree1Leaves[i] !== tree2Leaves[i]) {
            return false;
        }
    }

    return true;
};
// @lc code=end
