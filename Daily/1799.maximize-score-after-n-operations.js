/*
 * @lc app=leetcode id=1799 lang=javascript
 *
 * [1799] Maximize Score After N Operations
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxScore = function (nums) {
    const N = nums.length;

    /** @type {number[]} */
    const memo = [];

    /**
     * @param {number} bitmask
     * @param {number} index
     * @returns {boolean}
     */
    const isRemoved = (bitmask, index) => {
        const mask = 0b1 << index;
        return (bitmask & mask) !== 0;
    };

    /**
     * @param {number} bitmask
     * @param {number} index
     * @returns {number}
     */
    const setRemoved = (bitmask, index) => {
        const mask = 0b1 << index;
        return bitmask | mask;
    };

    /**
     * 还未被使用的部分最多能拿多少分？
     * @param {number} bitmask
     * @param {number} operationNum
     * @returns {number}
     */
    const backtrack = (bitmask, operationNum) => {
        if (memo[bitmask] !== undefined) return memo[bitmask];

        let maxScore = 0;
        for (let i = 0; i < N; i++) {
            if (isRemoved(bitmask, i)) continue;
            for (let j = i + 1; j < N; j++) {
                if (isRemoved(bitmask, j)) continue;

                const currentScore = operationNum * getGcd(nums[i], nums[j]);

                const newBitmask = setRemoved(setRemoved(bitmask, i), j);

                const leftScore = backtrack(newBitmask, operationNum + 1);

                maxScore = Math.max(currentScore + leftScore, maxScore);
            }
        }

        memo[bitmask] = maxScore;
        return maxScore;
    };

    const maxScore = backtrack(0, 1);

    return maxScore;
};

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function getGcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
// @lc code=end

maxScore([1, 2, 3, 4, 5, 6]);
