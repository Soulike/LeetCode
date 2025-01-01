/*
 * @lc app=leetcode id=424 lang=javascript
 *
 * [424] Longest Repeating Character Replacement
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const characterReplacement = function (s, k) {
  const LENGTH = s.length;
  /**@type {Map<string, number>} */
  const charToAmounts = new Map();

  let maxLength = 0;
  let right = 0;
  let maxCharAmount = 0;

  for (let left = 0; left < LENGTH; left++) {
    for (; right < LENGTH; right++) {
      charToAmounts.set(s[right], (charToAmounts.get(s[right]) ?? 0) + 1);
      maxCharAmount = Math.max(maxCharAmount, charToAmounts.get(s[right]));
      const currentLength = right - left + 1;
      if (currentLength - maxCharAmount <= k) {
        maxLength = Math.max(maxLength, currentLength);
      } else {
        break;
      }
    }
    charToAmounts.set(s[left], charToAmounts.get(s[left]) - 1);
    right++;
  }

  return maxLength;
};
// @lc code=end
