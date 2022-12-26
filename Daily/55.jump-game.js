/*
 * @lc app=leetcode id=55 lang=javascript
 *
 * [55] Jump Game
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    const N = nums.length;
    /**
     * dp[i] can jump if start from nums[i]
     *
     * base case
     * dp[N-1] = true
     *
     * i from N-2 to 0
     * dp[i] = false if nums[i] === 0
     * j from 1 to nums[i]
     * dp[i] = true if dp[i+j] = true
     *
     * return dp[0]
     */

    /** @type {boolean[]} */
    const dp = new Array(N);
    dp.fill(false);
    dp[N - 1] = true;

    for (let i = N - 2; i >= 0; i--) {
        for (let j = 1; j <= nums[i]; j++) {
            if (dp[i + j] === true) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[0];
};
// @lc code=end
