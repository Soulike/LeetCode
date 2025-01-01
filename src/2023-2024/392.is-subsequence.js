/*
 * @lc app=leetcode id=392 lang=javascript
 *
 * [392] Is Subsequence
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let sIndex = 0;

  for (let i = 0; i < t.length; i++) {
    if (t[i] === s[sIndex]) sIndex++;
    if (sIndex === s.length) break;
  }

  return sIndex === s.length;
};
// @lc code=end
