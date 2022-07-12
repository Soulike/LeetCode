/*
 * @lc app=leetcode id=583 lang=javascript
 *
 * [583] Delete Operation for Two Strings
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    /**
     * dp[i][j] word1[0,i-1] 和 word2[0,j-1] 所需的最小 steps
     *
     * base case
     * dp[i][0] = i
     * dp[0][j] = j
     *
     * if(word1[i-1] === word2[j-1])
     *  dp[i][j] = dp[i-1][j-1]
     * else
     *  dp[i][j] = Math.min(
     *      dp[i][j-1]+1 // 留下 word1[i-1]
     *      dp[i-1][j]+1 // 留下 word2[j-1]
     * )
     *
     * return dp[word1.length][word2.length]
     */

    const dp = new Array(word1.length + 1);
    for (let i = 0; i <= word1.length; i++) {
        dp[i] = new Array(word2.length + 1);
    }

    for (let i = 0; i <= word1.length; i++) {
        dp[i][0] = i;
    }

    for (let j = 0; j <= word2.length; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i][j - 1] + 1, // 留下 word1[i-1]
                    dp[i - 1][j] + 1,
                ); // 留下 word2[j-1]
            }
        }
    }

    return dp[word1.length][word2.length];
};
// @lc code=end
