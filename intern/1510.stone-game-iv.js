/*
 * @lc app=leetcode id=1510 lang=javascript
 *
 * [1510] Stone Game IV
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function (n) {
    /**
     * dp[i] 如果还剩下 i 个石子，能不能赢
     *
     * base case
     * dp[0] = false
     *
     * dp[i] =
     * for k from 1 to sqrt(i)
     * if !dp[i-k**2]
     *  dp[i] = true
     *  break;
     */

    const dp = new Array(n + 1);
    dp[0] = false;

    for (let i = 1; i <= n; i++) {
        dp[i] = false;
        const sqrt = Math.sqrt(i);
        for (let k = 1; k <= sqrt; k++) {
            if (!dp[i - k ** 2]) {
                // 对方会输
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};
// @lc code=end
