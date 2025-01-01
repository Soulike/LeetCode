/*
 * @lc app=leetcode id=1347 lang=javascript
 *
 * [1347] Minimum Number of Steps to Make Two Strings Anagram
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var minSteps = function (s, t) {
  /** @type {Map<string, number>} */
  const letterToFrequencyInT = new Map();

  for (const c of t) {
    letterToFrequencyInT.set(c, (letterToFrequencyInT.get(c) ?? 0) + 1);
  }

  for (const c of s) {
    letterToFrequencyInT.set(c, (letterToFrequencyInT.get(c) ?? 0) - 1);
  }

  let steps = 0;

  for (const [_, value] of letterToFrequencyInT) {
    if (value < 0) steps += -value;
  }

  return steps;
};
// @lc code=end
