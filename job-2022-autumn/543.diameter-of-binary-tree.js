/*
 * @lc app=leetcode id=543 lang=javascript
 *
 * [543] Diameter of Binary Tree
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
var diameterOfBinaryTree = function (root) {
    if (root === null) {
        return 0;
    }

    let maxDiameter = 0;

    /**
     * @param {TreeNode | null} root
     * @return {number}
     */
    function maxTreeDepth(root) {
        if (root === null) {
            return 0;
        }

        const leftMaxDepth = maxTreeDepth(root.left);
        const rightMaxDepth = maxTreeDepth(root.right);

        maxDiameter = Math.max(maxDiameter, leftMaxDepth + rightMaxDepth);

        const result = 1 + Math.max(leftMaxDepth, rightMaxDepth);

        return result;
    }

    maxTreeDepth(root);

    return maxDiameter;
};
// @lc code=end
