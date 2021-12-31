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
const maxAncestorDiff = function (root)
{
    /**
     * @param {TreeNode} root
     * @returns {{maxVal: number, minVal: number, maxDiff: number}} 当前子树中的最小值，当前子树中的最大值，当前子树中的最大差
     */
    const helper = (root) =>
    {
        let leftMaxVal = -1;
        let leftMinVal = Number.POSITIVE_INFINITY;
        let leftMaxDiff = 0;
        let rightMaxVal = -1;
        let rightMinVal = Number.POSITIVE_INFINITY;
        let rightMaxDiff = 0;
        if (root.left !== null)
        {
            const leftResult = helper(root.left);
            leftMaxVal = leftResult.maxVal;
            leftMinVal = leftResult.minVal;
            leftMaxDiff = leftResult.maxDiff;
        }
        if (root.right !== null)
        {
            const rightResult = helper(root.right);
            rightMaxVal = rightResult.maxVal;
            rightMinVal = rightResult.minVal;
            rightMaxDiff = rightResult.maxDiff;
        }
        const maxVal = Math.max(leftMaxVal, rightMaxVal, root.val);
        const minVal = Math.min(leftMinVal, rightMinVal, root.val);
        const maxDiff = Math.max(leftMaxDiff, rightMaxDiff, Math.abs(root.val - minVal), Math.abs(root.val - maxVal));
        return {maxVal, minVal, maxDiff};
    }

    const {maxDiff} = helper(root);
    return maxDiff;
};
// @lc code=end

