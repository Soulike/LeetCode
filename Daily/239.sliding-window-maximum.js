/*
 * @lc app=leetcode id=239 lang=javascript
 *
 * [239] Sliding Window Maximum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    /** @type {number[]} */
    const windowMax = [];

    /** @type {number[]} */
    const nonIncreasingQueue = [];
    let left = 0;
    let right = k - 1;

    for (let i = 0; i < k; i++) {
        while (
            nonIncreasingQueue.length > 0 &&
            nonIncreasingQueue[nonIncreasingQueue.length - 1] < nums[i]
        ) {
            nonIncreasingQueue.pop();
        }
        nonIncreasingQueue.push(nums[i]);
    }

    windowMax.push(nonIncreasingQueue[0]);

    while (right < nums.length - 1) {
        if (nums[left] === nonIncreasingQueue[0]) {
            nonIncreasingQueue.shift();
        }

        left++;
        right++;

        while (
            nonIncreasingQueue.length > 0 &&
            nonIncreasingQueue[nonIncreasingQueue.length - 1] < nums[right]
        ) {
            nonIncreasingQueue.pop();
        }
        nonIncreasingQueue.push(nums[right]);

        windowMax.push(nonIncreasingQueue[0]);
    }

    return windowMax;
};
// @lc code=end
