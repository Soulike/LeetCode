/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let maxLength = 1;
  let maxLengthRange = [0, 0];

  for (let i = 0; i < s.length - 1; i++) {
    const oddLengthPalindromeRange = getPalindromeRange(s, i, i);
    const evenLengthPalindromeRange = getPalindromeRange(s, i, i + 1);

    const largerPalindromeRange =
      oddLengthPalindromeRange[1] - oddLengthPalindromeRange[0] >
      evenLengthPalindromeRange[1] - evenLengthPalindromeRange[0]
        ? oddLengthPalindromeRange
        : evenLengthPalindromeRange;

    if (largerPalindromeRange[1] - largerPalindromeRange[0] + 1 > maxLength) {
      maxLengthRange = largerPalindromeRange;
      maxLength = largerPalindromeRange[1] - largerPalindromeRange[0] + 1;
    }
  }

  return s.slice(maxLengthRange[0], maxLengthRange[1] + 1);
};

/**
 * @param {string} s
 * @param {number} centerLeftIndex
 * @param {number} centerRightIndex
 * @returns {[number, number]}
 */
function getPalindromeRange(s, centerLeftIndex, centerRightIndex) {
  let left = centerLeftIndex;
  let right = centerRightIndex;

  if (right === left + 1 && s[left] !== s[right]) {
    return [left, left];
  }

  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  return [left + 1, right - 1];
}
// @lc code=end
