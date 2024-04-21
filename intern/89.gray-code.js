/*
 * @lc app=leetcode id=89 lang=javascript
 *
 * [89] Gray Code
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
const grayCode = function (n) {
  let k = 1;
  let current = [0, 1];
  let currentBit = 2;
  while (k < n) {
    const currentLength = current.length;
    for (let i = currentLength - 1; i >= 0; i--) {
      current.push(current[i] + currentBit);
    }
    k++;
    currentBit <<= 1;
  }
  return current;
};
// @lc code=end
