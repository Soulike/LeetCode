/*
 * @lc app=leetcode id=87 lang=javascript
 *
 * [87] Scramble String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function (s1, s2) {
  /** @type {Map<string, boolean>} */
  const memo = new Map();

  /**
   * @param {[number, number]} s1Range
   * @param {[number, number]} s2Range
   * @returns {boolean}
   */
  const isScrambleHelper = ([s1Start, s1End], [s2Start, s2End]) => {
    const s1RangeLength = s1End - s1Start + 1;
    const s2RangeLength = s2End - s2Start + 1;
    if (s1RangeLength !== s2RangeLength) return false;
    if (s1RangeLength === 1) return s1[s1Start] === s2[s2Start];

    const memoKey = `${s1Start}-${s2Start}-${s2Start}-${s2End}`;

    if (memo.has(memoKey)) return memo.get(memoKey);

    /** @type {Map<string, number>} */
    const rangeLetterToNumber = new Map();

    for (let i = 0; i < s1RangeLength; i++) {
      const s1RangeLetter = s1[s1Start + i];
      rangeLetterToNumber.set(
        s1RangeLetter,
        (rangeLetterToNumber.get(s1RangeLetter) ?? 0) + 1,
      );

      const s2RangeLetter = s2[s2Start + i];
      rangeLetterToNumber.set(
        s2RangeLetter,
        (rangeLetterToNumber.get(s2RangeLetter) ?? 0) - 1,
      );

      if (rangeLetterToNumber.get(s1RangeLetter) === 0) {
        rangeLetterToNumber.delete(s1RangeLetter);
      }
      if (rangeLetterToNumber.get(s2RangeLetter) === 0) {
        rangeLetterToNumber.delete(s2RangeLetter);
      }
    }

    if (rangeLetterToNumber.size !== 0) return false;

    for (let i = 0; i < s1RangeLength - 1; i++) {
      if (
        isScrambleHelper([s1Start, s1Start + i], [s2Start, s2Start + i]) &&
        isScrambleHelper([s1Start + i + 1, s1End], [s2Start + i + 1, s2End])
      ) {
        memo.set(memoKey, true);
        return true;
      }

      if (
        isScrambleHelper([s1Start, s1Start + i], [s2End - i, s2End]) &&
        isScrambleHelper([s1Start + i + 1, s1End], [s2Start, s2End - i - 1])
      ) {
        memo.set(memoKey, true);
        return true;
      }
    }

    memo.set(memoKey, false);
    return false;
  };

  return isScrambleHelper([0, s1.length - 1], [0, s2.length - 1]);
};
// @lc code=end
