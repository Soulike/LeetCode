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
var threeSum = function (nums) {
    return nSum(nums, 3, 0);
};

/**
 * @param {number[]} nums
 * @param {number} n
 * @param {number} target
 * @returns {number[][]}
 */
function nSum(nums, n, target) {
    nums.sort((a, b) => a - b);

    /**
     * @param {number} startIndex
     * @param {number} n
     * @param {number} target
     * @returns {number[][]}
     */
    const helper = (startIndex, n, target) => {
        /** @type {number[][]} */
        const results = [];
        if (n === 2) {
            let left = startIndex;
            let right = nums.length - 1;

            while (left < right) {
                const sum = nums[left] + nums[right];
                if (sum > target) {
                    right--;
                    while (
                        (right === nums.length - 1 ||
                            nums[right] === nums[right + 1]) &&
                        left < right
                    ) {
                        right--;
                    }
                } else if (sum < target) {
                    left++;
                    while (
                        (left === 0 || nums[left] === nums[left - 1]) &&
                        left < right
                    ) {
                        left++;
                    }
                } else {
                    results.push([nums[left], nums[right]]);
                    left++;
                    right--;
                    while (
                        (left === 0 || nums[left] === nums[left - 1]) &&
                        left < right
                    ) {
                        left++;
                    }
                    while (
                        (right === nums.length - 1 ||
                            nums[right] === nums[right + 1]) &&
                        left < right
                    ) {
                        right--;
                    }
                }
            }
        } // n > 2
        else {
            for (let i = startIndex; i < nums.length; i++) {
                if (i === startIndex || nums[i] !== nums[i - 1]) {
                    const restResults = helper(i + 1, n - 1, target - nums[i]);
                    for (const restResult of restResults) {
                        restResult.push(nums[i]);
                    }
                    results.push(...restResults);
                }
            }
        }
        return results;
    };

    return helper(0, n, target);
}
// @lc code=end
