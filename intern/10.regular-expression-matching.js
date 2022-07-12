/*
 * @lc app=leetcode id=10 lang=javascript
 *
 * [10] Regular Expression Matching
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    /**
     * dp[i][j] 从 s 的 i 位置和 p 的 j 位置开始，之后能否全部匹配？
     *
     * m = s.length
     * n = p.length
     *
     * base case
     * dp[m][n] = true
     *
     * dp[i][j] = 当前位置匹配，而且后面的也匹配
     * }
     */

    const m = s.length;
    const n = p.length;

    const dp = new Array(m + 1);
    for (let i = 0; i < m + 1; i++) {
        dp[i] = new Array(n + 1);
        if (i === m) {
            dp[i].fill(false);
        }
        dp[i][n] = false;
    }

    dp[m][n] = true;

    for (let i = m; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (p[j] === '*') {
                continue;
            }
            // 不是星号
            if (j === n - 1 || p[j + 1] !== '*') {
                if (i === m) {
                    // 字符串用完了，绝对不匹配
                    dp[i][j] = false;
                } else {
                    if (p[j] === '.' || s[i] === p[j]) {
                        dp[i][j] = dp[i + 1][j + 1];
                    } else {
                        dp[i][j] = false;
                    }
                }
            }
            // 是星号
            else {
                if (i === m) {
                    // 字符串用完了，绝对不匹配
                    dp[i][j] = dp[i][j + 2]; // 不匹配
                } else {
                    if (p[j] === '.' || s[i] === p[j]) {
                        dp[i][j] =
                            dp[i][j + 2] || // 不匹配
                            dp[i + 1][j]; // 匹配一次或者多次
                    } else {
                        dp[i][j] = dp[i][j + 2]; // 不匹配
                    }
                }
            }
        }
    }

    return dp[0][0];
};
// @lc code=end
