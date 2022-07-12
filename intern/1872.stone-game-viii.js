/*
 * @lc app=leetcode id=1872 lang=javascript
 *
 * [1872] Stone Game VIII
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVIII = function (stones) {
    const n = stones.length;
    const prefixSum = new Array(n);
    stones.reduce((prev, curr, i) => {
        prefixSum[i] = prev + curr;
        return prev + curr;
    }, 0);

    let dp = prefixSum[n - 1];

    for (let i = n - 2; i > 0; i--) {
        dp = Math.max(dp, prefixSum[i] - dp);
    }

    return dp;
};
// @lc code=end
