/*
 * @lc app=leetcode id=938 lang=javascript
 *
 * [938] Range Sum of BST
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
    let rangeSum = 0;

    /**
     * @param {TreeNode | null} root
     * @returns {void}
     */
    const inOrderTraverse = (root) => {
        if (root === null) return;
        if (root.val > low) {
            inOrderTraverse(root.left);
        }
        if (root.val >= low && root.val <= high) {
            rangeSum += root.val;
        }
        if (root.val < high) {
            inOrderTraverse(root.right);
        }
    };

    inOrderTraverse(root);
    return rangeSum;
};
// @lc code=end
