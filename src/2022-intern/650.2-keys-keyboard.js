/*
 * @lc app=leetcode id=650 lang=javascript
 *
 * [650] 2 Keys Keyboard
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n) {
  /**
   * 状态
   * 已经输入了多少？
   * 剪切板里面字符的数量？
   *
   * 转移
   * 复制
   * 粘贴
   */

  /**
   * dp[i][j] 当已经输入了 i 个字符，剪切板里面字符数量为 j 的时候，最小的操作次数
   *
   * base case
   * dp[n][?] = 0
   *
   * dp[i][j] =
   * if j === 0
   *  1+dp[i][i]
   * else if(j<i)
   *  1+min(
   *  dp[i][i],  // copy
   *  i+j>n?Infinity: dp[i+j][j]
   *  )
   * else
   *  1+(i+j>n?Infinity:dp[i+j][j])
   *
   * 返回 dp[1][0]
   */

  /**
     * 优化
     * dp[i] 输入 i 个字符所需的最小操作次数
     * 
     * base case
     * dp[1] = 0 
     * 
     * k from 1 to i-1
     * if (i % k === 0)
         min = Math.min(min,
                dp[k]   // 得到被复制部分
                + 1     // 复制
                + (i / k - 1) // 粘贴这么多次
            );
     * 
     * 返回 dp[n]
     */

  const dp = new Array(n + 1);
  dp[1] = 0;

  for (let i = 2; i <= n; i++) {
    let min = Infinity;
    for (let k = 1; k <= i - 1; k++) {
      if (i % k === 0) {
        min = Math.min(min, dp[k] + i / k);
      }
    }
    dp[i] = min;
  }

  return dp[n];
};
// @lc code=end
