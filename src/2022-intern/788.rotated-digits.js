/*
 * @lc app=leetcode id=788 lang=javascript
 *
 * [788] Rotated Digits
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var rotatedDigits = function (n) {
  /**
   * @type {(0|1|2)[]}
   * numberState[i]：数字 i 是否是有效的
   * 0 -> 旋转过后是自己
   * 1 -> 旋转过后得到不同的数字
   * 2 -> 旋转过后无效
   */
  const numberState = [];
  let goodCount = 0;

  for (let i = 0; i <= n; i++) {
    if (i < 10) {
      if (i === 0 || i === 1 || i === 8) {
        numberState[i] = 0;
      } else if (i === 2 || i === 5 || i === 6 || i === 9) {
        numberState[i] = 1;
        goodCount++;
      } else {
        numberState[i] = 2;
      }
    } else {
      const tailNumber = i % 10;
      const headNumbers = (i - tailNumber) / 10;

      if (numberState[tailNumber] === 2 || numberState[headNumbers] === 2) {
        numberState[i] = 2;
      } else if (
        numberState[tailNumber] === 0 &&
        numberState[headNumbers] === 0
      ) {
        numberState[i] = 0;
      } else {
        numberState[i] = 1;
        goodCount++;
      }
    }
  }

  return goodCount;
};
// @lc code=end
