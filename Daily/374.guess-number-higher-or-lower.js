/*
 * @lc app=leetcode id=374 lang=javascript
 *
 * [374] Guess Number Higher or Lower
 */
/**
 * @param {number} num   your guess
 * @return {-1|1|0} -1 if num is higher than the picked number
 * 1 if num is lower than the picked number
 * otherwise return 0
 **/
var guess = function (num) {
  return 0;
};

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  const HIGHER = -1;
  const LOWER = 1;
  const EQUAL = 0;
  let min = 1;
  let max = n;
  let guessNum = min + Math.floor((max - min) / 2);
  while (true) {
    const guessResult = guess(guessNum);
    if (guessResult === HIGHER) {
      max = guessNum - 1;
    } else if (guessResult === LOWER) {
      min = guessNum + 1;
    } else {
      return guessNum;
    }
    guessNum = min + Math.floor((max - min) / 2);
  }
};
// @lc code=end
