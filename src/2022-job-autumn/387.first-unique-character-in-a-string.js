/*
 * @lc app=leetcode id=387 lang=javascript
 *
 * [387] First Unique Character in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  /** @type {Map<string, number>} */
  const letterToCount = new Map();

  for (const c of s) {
    letterToCount.set(c, (letterToCount.get(c) ?? 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    const count = letterToCount.get(s[i]);
    if (count === 1) {
      return i;
    }
  }

  return -1;
};
// @lc code=end
