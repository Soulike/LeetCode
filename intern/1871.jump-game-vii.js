/*
 * @lc app=leetcode id=1871 lang=javascript
 *
 * [1871] Jump Game VII
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function (s, minJump, maxJump) {
  const n = s.length;
  if (s[s.length - 1] === '1') {
    return false;
  }

  /**
   * dp[i] s[i] 是否能到达终点？
   *
   * base case
   * dp[n-1] = true
   *
   * dp[i] = s[i] === '0  && any(dp[i+minJump...i+maxJump])
   *
   * 维护一个窗口，看 i+minJump...i+maxJump 里面有多少个 true
   */

  const dp = new Array(n);
  dp.fill(false);
  dp[n - 1] = true;

  // i+minJump...i+maxJump 范围内有多少个 true？
  let slideWindow = 0;

  for (let i = n - 2; i >= 0; i--) {
    // 窗口刚刚进入字符串内
    if (i + minJump === n - 1) {
      slideWindow = 1;
    }
    // 向左滑动一下窗口
    else if (i + minJump < n - 1) {
      if (i + maxJump + 1 < n && dp[i + maxJump + 1]) {
        slideWindow--;
      }
      if (dp[i + minJump]) {
        slideWindow++;
      }
    }

    if (s[i] === '0') {
      dp[i] = slideWindow > 0;
    }
  }

  return dp[0];
};
// @lc code=end
