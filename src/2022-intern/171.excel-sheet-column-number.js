/*
 * @lc app=leetcode id=171 lang=javascript
 *
 * [171] Excel Sheet Column Number
 */

// @lc code=start
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  const n = columnTitle.length;
  const aASCII = 'A'.charCodeAt(0);
  let result = 0;
  let exp = 1;
  for (let i = n - 1; i >= 0; i--) {
    result += (columnTitle.charCodeAt(i) - aASCII + 1) * exp;
    exp *= 26;
  }

  return result;
};
// @lc code=end
