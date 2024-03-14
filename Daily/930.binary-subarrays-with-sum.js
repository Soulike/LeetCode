/*
 * @lc app=leetcode id=930 lang=javascript
 *
 * [930] Binary Subarrays With Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function (nums, goal) {
    return atMostSubarray(nums, goal) - atMostSubarray(nums, goal - 1);
};

/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
function atMostSubarray(nums, goal) {
    if (goal < 0) return 0;

    let left = 0;
    let right = 0;
    let currentSum = 0;
    let result = 0;

    while (right < nums.length) {
        currentSum += nums[right];

        while (currentSum > goal) {
            currentSum -= nums[left];
            left++;
        }

        result += right - left + 1;
        right++;
    }

    return result;
}
// @lc code=end

numSubarraysWithSum([0, 1, 1, 1, 1], 3);
