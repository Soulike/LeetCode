/*
 * @lc app=leetcode id=1422 lang=javascript
 *
 * [1422] Maximum Score After Splitting a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
    const N = s.length;
    const LEFT_ZERO_NUM = 0;
    const RIGHT_ONE_NUM = 1;
    /** @type {[leftZeroNum: number, rightOneNum: number][]} */
    const dp = new Array(N);
    for (let i = 0; i < N; i++) {
        dp[i] = [0, 0];
    }

    dp[0][LEFT_ZERO_NUM] = s[0] === '0' ? 1 : 0;

    for (let i = 1; i < N; i++) {
        dp[i][LEFT_ZERO_NUM] =
            dp[i - 1][LEFT_ZERO_NUM] + (s[i] === '0' ? 1 : 0);
    }

    for (let i = N - 2; i >= 0; i--) {
        dp[i][RIGHT_ONE_NUM] =
            dp[i + 1][RIGHT_ONE_NUM] + (s[i + 1] === '1' ? 1 : 0);
    }

    let maxScore = -Infinity;

    for (let i = 0; i < N - 1; i++) {
        maxScore = Math.max(
            maxScore,
            dp[i][LEFT_ZERO_NUM] + dp[i][RIGHT_ONE_NUM],
        );
    }

    return maxScore;
};
// @lc code=end
