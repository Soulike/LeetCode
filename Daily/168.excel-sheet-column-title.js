/*
 * @lc app=leetcode id=168 lang=javascript
 *
 * [168] Excel Sheet Column Title
 */

// @lc code=start
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  /** @type {string[]} */
  const numToLetter = [];
  for (let i = 0; i < 26; i++) {
    numToLetter[i] = String.fromCharCode('A'.charCodeAt(0) + i);
  }

  /** @type {string[]} */
  const columnName = [];

  while (columnNumber > 0) {
    columnNumber--;
    const remainder = columnNumber % 26;
    columnNumber = (columnNumber - remainder) / 26;
    columnName.unshift(numToLetter[remainder]);
  }

  return columnName.join('');
};
// @lc code=end
convertToTitle(701); // ZY

convertToTitle(245234); // MXTB
