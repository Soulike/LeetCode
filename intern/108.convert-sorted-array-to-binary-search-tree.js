/*
 * @lc app=leetcode id=108 lang=javascript
 *
 * [108] Convert Sorted Array to Binary Search Tree
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
var sortedArrayToBST = function (nums) {
    function buildAVL(left, right) {
        if (left > right) {
            return null;
        }
        if (left === right) {
            return new TreeNode(nums[left], null, null);
        }

        const mid = left + Math.floor((right - left) / 2);
        const leftChild = buildAVL(left, mid - 1);
        const rightChild = buildAVL(mid + 1, right);

        const root = new TreeNode(nums[mid], leftChild, rightChild);

        return root;
    }

    return buildAVL(0, nums.length - 1);
};
// @lc code=end
