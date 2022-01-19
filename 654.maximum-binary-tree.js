/*
 * @lc app=leetcode id=654 lang=javascript
 *
 * [654] Maximum Binary Tree
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums)
{
    return helper(0, nums.length);

    function helper(left, right)
    {
        const LENGTH = right - left;
        if (LENGTH === 0)
        {
            return null;
        }
        let maxVal = -1;
        let maxValIndex = -1;
        for (let i = left; i < right; i++)
        {
            if (nums[i] > maxVal)
            {
                maxVal = nums[i];
                maxValIndex = i;
            }
        }

        const leftChild = helper(left, maxValIndex);
        const rightChild = helper(maxValIndex + 1, right);
        const root = new TreeNode(maxVal, leftChild, rightChild);
        return root;
    }
};
// @lc code=end

