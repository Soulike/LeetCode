/*
 * @lc app=leetcode id=132 lang=javascript
 *
 * [132] Palindrome Partitioning II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
    /**
     * dp[i][j] [i,j] 是否是回文
     *
     * base case
     * dp[i][i] = true
     *
     * dp[i][j] =
     * if j === i+1
     *  dp[i][j] = s[i] === s[j]
     * else if s[i] === s[j]
     *  dp[i][j] = dp[i+1][j-1]
     * else
     *  dp[i][j] = false
     *
     */

    const n = s.length;
    const dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(n);
        dp[i].fill(false);
        dp[i][i] = true;
    }

    for (let i = n - 2; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            if (j === i + 1) {
                dp[i][j] = s[i] === s[j];
            } else if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1];
            } else {
                dp[i][j] = false;
            }
        }
    }

    function isPalindrome(left, right) {
        return dp[left][right];
    }

    /**
     * cut[i] 对于 [0,i] 需要的最少刀数
     *
     *
     * cut[i] =
     * if dp[0][i]
     *  cut[i] = 0
     * else
     *  for j from 0 to i-1
     *    if(dp[j+1][i])
     *      minA(cut[j]+1)
     */

    const cut = new Array(n);

    for (let i = 0; i < n; i++) {
        if (isPalindrome(0, i)) {
            cut[i] = 0;
        } else {
            let minCut = Infinity;
            for (let j = 0; j <= i - 1; j++) {
                if (isPalindrome(j + 1, i)) {
                    minCut = Math.min(minCut, cut[j] + 1);
                }
            }
            cut[i] = minCut;
        }
    }

    return cut[n - 1];
};
// @lc code=end
