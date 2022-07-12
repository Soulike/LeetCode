/*
 * @lc app=leetcode id=1403 lang=javascript
 *
 * [1403] Minimum Subsequence in Non-Increasing Order
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minSubsequence = function (nums) {
    const sum = nums.reduce((prev, curr) => prev + curr);
    const halfSum = sum / 2;

    nums.sort((a, b) => b - a);

    let currentSum = 0;
    let seq = [];

    for (const num of nums) {
        currentSum += num;
        seq.push(num);
        if (currentSum > halfSum) {
            return seq;
        }
    }
};
// @lc code=end
