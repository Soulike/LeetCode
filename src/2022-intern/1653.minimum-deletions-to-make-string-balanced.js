/*
 * @lc app=leetcode id=1653 lang=javascript
 *
 * [1653] Minimum Deletions to Make String Balanced
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const minimumDeletions = function (s) {
  const LENGTH = s.length;
  // dpA, dpB 表示在字符串 i 位置以 a， b 结尾的情况下，最少的删除次数
  const dpA = new Array(LENGTH);
  const dpB = new Array(LENGTH);
  if (s[0] == 'a') {
    dpA[0] = 0;
    dpB[0] = 1; //以 b 结尾需要删除1次
  } else {
    dpA[0] = 1;
    dpB[0] = 0;
  }
  for (let i = 1; i < LENGTH; ++i) {
    if (s[i] === 'a') {
      dpA[i] = dpA[i - 1];
      dpB[i] = Math.min(dpA[i - 1], dpB[i - 1]) + 1;
    } else {
      dpA[i] = dpA[i - 1] + 1;
      dpB[i] = Math.min(dpA[i - 1], dpB[i - 1]);
    }
  }
  return Math.min(dpA[LENGTH - 1], dpB[LENGTH - 1]);
};
// @lc code=end
