/*
 * @lc app=leetcode id=1793 lang=javascript
 *
 * [1793] Maximum Score of a Good Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {
    let left = k;
    let right = k;

    let minNum = nums[k];
    let maxScore = nums[k];

    while (left > 0 || right < nums.length - 1) {
        if (left === 0) right++;
        else if (right === nums.length - 1) left--;
        else if (nums[left - 1] < nums[right + 1]) right++;
        else left--;

        minNum = Math.min(minNum, nums[left], nums[right]);
        maxScore = Math.max(maxScore, minNum * (right - left + 1));
    }
    return maxScore;
};
// @lc code=end
