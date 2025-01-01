/*
 * @lc app=leetcode id=1784 lang=javascript
 *
 * [1784] Check if Binary String Has at Most One Segment of Ones
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function (s) {
  return !s.includes('01');
};
// @lc code=end
