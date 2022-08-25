/*
 * @lc app=leetcode id=494 lang=javascript
 *
 * [494] Target Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    /** @type {Map<string, number>} */
    const memo = new Map();
    /**
     * @param {number} startIndex
     * @param {number} target
     * @returns {number}
     */
    const dp = (startIndex, target) => {
        if (startIndex === nums.length) {
            return target === 0 ? 1 : 0;
        }

        const memoKey = `${startIndex}-${target}`;

        if (memo.has(memoKey)) {
            return memo.get(memoKey);
        }

        const result =
            dp(startIndex + 1, target - nums[startIndex]) +
            dp(startIndex + 1, target + nums[startIndex]);

        memo.set(memoKey, result);
        return result;
    };

    return dp(0, target);
};
// @lc code=end

findTargetSumWays([1], 1);
