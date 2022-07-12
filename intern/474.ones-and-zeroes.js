/*
 * @lc app=leetcode id=474 lang=javascript
 *
 * [474] Ones and Zeroes
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
    /** @type {[number, number][]} */
    const strCounts = [];

    for (let i = 0; i < strs.length; i++) {
        const str = strs[i];
        strCounts[i] = [0, 0];
        for (const c of str) {
            strCounts[i][c]++;
        }
    }

    /**
     * 0-1背包问题
     *
     * dp[i][j][k] - 只取前 i 个物品，有 j 个 0 和 k 个 1，最多能装下多少个
     *
     * base case
     * dp[0][j][k] = 0
     * dp[i][0][0] = 0
     *
     * zeroCount = strCounts[i][0]
     * oneCount = strCounts[i][1]
     * 如果装得下
     * dp[i][j][k] = Math.max(dp[i-1][j][k],
     * dp[i-1][j-zeroCount][k-oneCount]+1)
     *
     * 如果装不下
     * dp[i][j][k] = dp[i-1][j][k]
     *
     * returns
     *
     * dp[str.length][m][n]
     */

    /**
     * @type {number[][][]}
     */
    const dp = new Array(strs.length + 1);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(m + 1);
        for (let j = 0; j < dp[i].length; j++) {
            dp[i][j] = new Array(n + 1);
            if (i === 0) {
                dp[i][j].fill(0);
            }
            dp[i][0][0] = 0;
        }
    }

    for (let i = 1; i <= strCounts.length; i++) {
        const [zeroCount, oneCount] = strCounts[i - 1];

        for (let j = 0; j <= m; j++) {
            for (let k = 0; k <= n; k++) {
                if (j < zeroCount || k < oneCount) {
                    dp[i][j][k] = dp[i - 1][j][k];
                } else {
                    dp[i][j][k] = Math.max(
                        dp[i - 1][j][k],
                        dp[i - 1][j - zeroCount][k - oneCount] + 1,
                    );
                }
            }
        }
    }

    return dp[strs.length][m][n];
};
// @lc code=end
