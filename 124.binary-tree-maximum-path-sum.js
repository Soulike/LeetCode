/*
 * @lc app=leetcode id=124 lang=javascript
 *
 * [124] Binary Tree Maximum Path Sum
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
var maxPathSum = function (root)
{
    let maxSum = Number.NEGATIVE_INFINITY;
    /**
     * 比较 root 的左右子树最大路径之和，并返回大的那个
     */
    function maxSideSum(root)
    {
        if (root === null)
        {
            return 0;
        }
        const leftSideMaxSum = Math.max(maxSideSum(root.left), 0);
        const rightSideMaxSum = Math.max(maxSideSum(root.right), 0);

        // 看看以 root 为根结点能得到的最大路径值
        maxSum = Math.max(maxSum, root.val + leftSideMaxSum + rightSideMaxSum);

        const sideSum = Math.max(leftSideMaxSum, rightSideMaxSum);

        const result = root.val + sideSum;
        return result;
    }


    maxSideSum(root);
    return maxSum;
};
// @lc code=end

