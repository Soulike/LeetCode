/*
 * @lc app=leetcode id=1563 lang=javascript
 *
 * [1563] Stone Game V
 */

// @lc code=start
/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function (stoneValue) {
  const n = stoneValue.length;
  const prefixSum = new Array(n);
  stoneValue.reduce((prev, curr, i) => {
    prefixSum[i] = prev + curr;
    return prev + curr;
  }, 0);

  function getSum(start, end) {
    return prefixSum[end] - prefixSum[start] + stoneValue[start];
  }

  /**
   * dp[i][j] 如果取 [i, j]，alice 能在其中取得的最大分数
   *
   * base case
   * dp[i][i] = 0
   *
   * dp[i][j] = max(
   * for k from i+1 to j
   *  if leftSum > rightSum
   *      rightSum + dp[k][j]
   *  else if leftSum < rightSum
   *      leftSum + dp[i][k-1]
   *  else
   *      max(rightSum + dp[k][j],leftSum + dp[i][k-1])
   * )
   *
   * return dp[0,n-1]
   */

  const dp = new Array(n);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(n);
    dp[i][i] = 0;
  }

  for (let left = n - 1; left >= 0; left--) {
    for (let right = left + 1; right < n; right++) {
      let max = 0;
      for (
        let rightPartStart = left + 1;
        rightPartStart <= right;
        rightPartStart++
      ) {
        const leftSum = getSum(left, rightPartStart - 1);
        const rightSum = getSum(rightPartStart, right);

        if (leftSum > rightSum) {
          max = Math.max(max, rightSum + dp[rightPartStart][right]);
        } else if (leftSum < rightSum) {
          max = Math.max(max, leftSum + dp[left][rightPartStart - 1]);
        } else {
          max = Math.max(
            max,
            Math.max(
              rightSum + dp[rightPartStart][right],
              leftSum + dp[left][rightPartStart - 1],
            ),
          );
        }
      }
      dp[left][right] = max;
    }
  }

  return dp[0][n - 1];
};
// @lc code=end
