/*
 * @lc app=leetcode id=72 lang=javascript
 *
 * [72] Edit Distance
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = function (word1, word2) {
    /**
     * dp[i][j] word1[0...i-1] 和 word2[0...j-1] 的最小编辑距离
     * @type {number[][]}
     */
    const dp = new Array(word1.length + 1);
    for (let i = 0; i < word1.length + 1; i++) {
        dp[i] = new Array(word2.length + 1);

        // base case
        dp[i][0] = i;
        if (i === 0) {
            for (let j = 0; j < word2.length + 1; j++) {
                dp[0][j] = j;
            }
        }
    }

    /**
     * base case，其中一个字符串用完了，那就是另一个字符串剩下的长度（直接插入到前面）
     * dp[0][j] = j
     * dp[i][0] = i
     *
     * 如果 word1[i-1] === word2[j-1]
     * dp[i][j] = dp[i-1][j-1]
     * 如果 word1[i-1] !== word2[j-1]
     * dp[i][j] = 1+min(
     *      dp[i][j-1],     // 插入
     *      dp[i-1][j],     // 删除
     *      dp[i-1][j-1]    // 替换
     * )
     */

    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] =
                    1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[word1.length][word2.length];
};
// @lc code=end
