/*
 * @lc app=leetcode id=44 lang=javascript
 *
 * [44] Wildcard Matching
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    /**
     * m = s.length
     * n = p.length
     * dp[i][j]
     * s[i:] 和 p[j:] 可以匹配吗？
     *
     * base case
     * dp[m][n] = true
     *
     * dp[0...m-1][n] = false
     *
     * if i === m
     *      if p[j] === '*'
     *          dp[i][j] = dp[i][j+1]
     *      else
     *          dp[i][j] = false
     *
     * else if p[j] === *
     *      dp[i][j] = dp[i+1][j] || dp[i][j+1]
     * else
     *    if s[i] === p[j] || p[j] === ?
     *      dp[i][j] = dp[i+1][j+1]
     *    else
     *      dp[i][j] = false
     *
     */

    const m = s.length;
    const n = p.length;

    const dp = new Array(m + 1);
    for (let i = 0; i < m + 1; i++) {
        dp[i] = new Array(n + 1);
        dp[i][n] = false;
    }

    dp[m][n] = true;

    for (let i = m; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i === m) {
                if (p[j] !== '*') {
                    dp[i][j] = false;
                } else {
                    dp[i][j] = dp[i][j + 1];
                }
            } else {
                if (p[j] === '*') {
                    dp[i][j] = dp[i + 1][j] || dp[i][j + 1];
                } else {
                    if (s[i] === p[j] || p[j] === '?') {
                        dp[i][j] = dp[i + 1][j + 1];
                    } else {
                        dp[i][j] = false;
                    }
                }
            }
        }
    }

    return dp[0][0];
};
// @lc code=end

isMatch('', '*****');
