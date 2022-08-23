/*
 * @lc app=leetcode id=712 lang=javascript
 *
 * [712] Minimum ASCII Delete Sum for Two Strings
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
    const m = s1.length;
    const n = s2.length;

    /**
     * dp[i][j] lowest ASCII deletion sum of s1[i:] and s2[j:]
     *
     * base case
     * dp[m][j] = asciiSum(str2[j:])
     * dp[i][n] = asciiSum(str1[i:])
     *
     * if(s1[i] === s2[j])
     *  dp[i][j] = dp[i+1][j+1]
     * else
     *  dp[i][j] = Math.min(s1.charCodeAt(i) + dp[i+1][j], s2.charCodeAt(j) + dp[i][j+1])
     *
     * return dp[0][0]
     *
     * memory compress
     *
     * base case
     * prevDp[j] = asciiSum(str2[j:])
     * dp[n] = asciiSum(str1[i:])
     *
     * if(s1[i] === s2[j])
     *  dp[j] = prevDp[j+1]
     * else
     *  dp[j] = Math.min(s1.charCodeAt(i) + prevDp[j], s2.charCodeAt(j) + dp[j+1])
     *
     * return dp[0]
     *
     * @type {number[]}
     */
    let dp = new Array(n + 1);
    let prevDp = new Array(n + 1);

    let str2ASCIISum = 0;
    for (let j = n; j >= 0; j--) {
        if (j < n) {
            str2ASCIISum += s2.charCodeAt(j);
            prevDp[j] = str2ASCIISum;
        } else {
            prevDp[j] = 0;
        }
    }

    let str1ASCIISum = 0;
    for (let i = m - 1; i >= 0; i--) {
        str1ASCIISum += s1.charCodeAt(i);
        dp[n] = str1ASCIISum;

        for (let j = n - 1; j >= 0; j--) {
            if (s1[i] === s2[j]) {
                dp[j] = prevDp[j + 1];
            } else {
                dp[j] = Math.min(
                    s1.charCodeAt(i) + prevDp[j],
                    s2.charCodeAt(j) + dp[j + 1],
                );
            }
        }

        [prevDp, dp] = [dp, prevDp];
    }

    return prevDp[0];
};
// @lc code=end
