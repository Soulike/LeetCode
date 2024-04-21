/*
 * @lc app=leetcode id=1297 lang=javascript
 *
 * [1297] Maximum Number of Occurrences of a Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} maxLetters
 * @param {number} minSize
 * @param {number} maxSize
 * @return {number}
 */
const maxFreq = function (s, maxLetters, minSize, maxSize) {
  /** @type {Map<string, number>} */
  const subStringToAmount = new Map();
  /** @type {Map<string, number>} */
  const subStringToLetterAmount = new Map();

  let left = 0;
  let right = minSize - 1;

  for (let i = left; i <= right; i++) {
    subStringToLetterAmount.set(
      s[i],
      (subStringToLetterAmount.get(s[i]) ?? 0) + 1,
    );
  }
  if (subStringToLetterAmount.size <= maxLetters) {
    const subString = s.slice(left, right + 1);
    subStringToAmount.set(
      subString,
      (subStringToAmount.get(subString) ?? 0) + 1,
    );
  }

  while (right < s.length - 1) {
    left++;
    right++;
    const letterRemoved = s[left - 1];
    const letterAdded = s[right];
    subStringToLetterAmount.set(
      letterRemoved,
      (subStringToLetterAmount.get(letterRemoved) ?? 1) - 1,
    );
    if (subStringToLetterAmount.get(letterRemoved) === 0) {
      subStringToLetterAmount.delete(letterRemoved);
    }
    subStringToLetterAmount.set(
      letterAdded,
      (subStringToLetterAmount.get(letterAdded) ?? 0) + 1,
    );

    if (subStringToLetterAmount.size <= maxLetters) {
      const subString = s.slice(left, right + 1);
      subStringToAmount.set(
        subString,
        (subStringToAmount.get(subString) ?? 0) + 1,
      );
    }
  }

  if (subStringToAmount.size === 0) {
    return 0;
  }

  const subStringAmounts = Array.from(subStringToAmount.values());
  subStringAmounts.sort((a, b) => b - a);

  return subStringAmounts[0];
};
// @lc code=end
