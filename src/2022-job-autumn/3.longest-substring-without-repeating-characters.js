/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) return 0;

  let left = 0;
  let right = 1;
  let charSet = new Set(s[0]);

  let maxLength = 1;

  while (true) {
    while (right < s.length && !charSet.has(s[right])) {
      charSet.add(s[right]);
      right++;
    }

    maxLength = Math.max(maxLength, right - left);

    if (right === s.length) {
      return maxLength;
    }

    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
  }
};
// @lc code=end
