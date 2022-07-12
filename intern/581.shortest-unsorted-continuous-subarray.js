/*
 * @lc app=leetcode id=581 lang=javascript
 *
 * [581] Shortest Unsorted Continuous Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    let begin = -1;
    let end = -2;
    let min = nums[nums.length - 1];
    let max = nums[0];

    for (let i = 1; i < nums.length; i++) {
        max = Math.max(max, nums[i]);
        min = Math.min(min, nums[nums.length - 1 - i]);

        // 对于有序部分，从前向后，max 应该越来越大。
        // 如果出现了小于 max 的 nums[i]，
        // 最后一次符合该情况的 i 一定是 end
        // 因为打乱部分的 max 在中间
        if (nums[i] < max) {
            end = i;
        }

        // 对于有序部分，从后向前，min 应该越来越小。
        // 如果出现了大于 min 的 nums[i]，
        // 最后一次符合该情况的 i 一定是 begin
        // 因为打乱部分的 min 在中间
        if (nums[nums.length - 1 - i] > min) {
            begin = nums.length - 1 - i;
        }
    }

    return end - begin + 1;
};
// @lc code=end
