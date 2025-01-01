/*
 * @lc app=leetcode id=567 lang=javascript
 *
 * [567] Permutation in String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = function (s1, s2) {
  const s1LetterToAmount = new Map();
  for (const letter of s1) {
    s1LetterToAmount.set(letter, (s1LetterToAmount.get(letter) ?? 0) + 1);
  }

  let left = 0;
  let usedLetterCount = 0;
  for (let right = 0; right < s2.length; right++) {
    const rightLetter = s2[right];
    const rightLetterAmount = s1LetterToAmount.get(rightLetter);
    if (rightLetterAmount !== undefined) {
      s1LetterToAmount.set(rightLetter, rightLetterAmount - 1);
      if (rightLetterAmount - 1 >= 0) {
        usedLetterCount++;
      }
    }

    while (usedLetterCount === s1.length) {
      if (right - left + 1 === s1.length) {
        return true;
      }
      const leftLetter = s2[left];
      const leftLetterAmount = s1LetterToAmount.get(leftLetter);
      if (leftLetterAmount !== undefined) {
        s1LetterToAmount.set(leftLetter, leftLetterAmount + 1);
        if (leftLetterAmount + 1 > 0) {
          usedLetterCount--;
        }
      }
      left++;
    }
  }
  return false;
};
// @lc code=end
