/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
    if (nums.length < 3) {
        return [];
    }
    return nSum(3, nums, 0);
};

/**
 * @param {number} n 要求和由几个数字组成，最小是 2
 * @param {number[]} nums 数字数组
 * @param {number} target 要求的和
 * @returns {number[][]}
 */
function nSum(n, nums, target) {
    if (nums.length < n) {
        return [];
    }

    nums.sort((a, b) => a - b);
    return nSumHelper(n, nums, 0, target);

    /**
     * @param {number} n 要求和由几个数字组成，最小是 2
     * @param {number[]} nums 已经排序的数字数组
     * @param {number} start 从 nums 的什么位置开始
     * @param {number} target 要求的和
     * @returns {number[][]}
     */
    function nSumHelper(n, nums, start, target) {
        if (n === 2) {
            let left = start;
            let right = nums.length - 1;
            let results = [];

            while (left < right) {
                const sum = nums[left] + nums[right];
                if (sum > target) {
                    right--;
                    while (nums[right] === nums[right + 1]) {
                        right--;
                    }
                } else if (sum < target) {
                    left++;
                    while (nums[left] === nums[left - 1]) {
                        left++;
                    }
                } else if (sum === target) {
                    results.push([nums[left], nums[right]]);
                    right--;
                    while (nums[right] === nums[right + 1]) {
                        right--;
                    }
                    left++;
                    while (nums[left] === nums[left - 1]) {
                        left++;
                    }
                }
            }
            return results;
        } else if (n > 2) {
            const results = [];
            for (let i = start; i < nums.length - 1; i++) {
                if (i === start || nums[i] !== nums[i - 1]) {
                    const subResults = nSumHelper(
                        n - 1,
                        nums,
                        i + 1,
                        target - nums[i],
                    );
                    for (const subResult of subResults) {
                        subResult.push(nums[i]);
                        results.push(subResult);
                    }
                }
            }

            return results;
        }
    }
}
// @lc code=end

console.log(threeSum([-1, 0, 1]));
