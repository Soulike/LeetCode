/*
 * @lc app=leetcode id=13 lang=javascript
 *
 * [13] Roman to Integer
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let result = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === 'I') {
      result += 1;
    } else if (s[i] === 'V') {
      if (i === 0 || s[i - 1] !== 'I') {
        result += 5;
      } else {
        result += 4;
        i--;
      }
    } else if (s[i] === 'X') {
      if (i === 0 || s[i - 1] !== 'I') {
        result += 10;
      } else {
        result += 9;
        i--;
      }
    } else if (s[i] === 'L') {
      if (i === 0 || s[i - 1] !== 'X') {
        result += 50;
      } else {
        result += 40;
        i--;
      }
    } else if (s[i] === 'C') {
      if (i === 0 || s[i - 1] !== 'X') {
        result += 100;
      } else {
        result += 90;
        i--;
      }
    } else if (s[i] === 'D') {
      if (i === 0 || s[i - 1] !== 'C') {
        result += 500;
      } else {
        result += 400;
        i--;
      }
    } else if (s[i] === 'M') {
      if (i === 0 || s[i - 1] !== 'C') {
        result += 1000;
      } else {
        result += 900;
        i--;
      }
    }
  }
  return result;
};
// @lc code=end
