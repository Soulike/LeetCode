/*
 * @lc app=leetcode id=520 lang=javascript
 *
 * [520] Detect Capital
 */

// @lc code=start
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  const regex = /^(?:(?:[A-Z]+)|(?:[A-z][a-z]*))$/;
  return regex.test(word);
};

// @lc code=end
