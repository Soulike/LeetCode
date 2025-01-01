/*
 * @lc app=leetcode id=869 lang=javascript
 *
 * [869] Reordered Power of 2
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function (n) {
  /**
   * @param {string} number
   * @returns {ReadonlyMap<string, number>}
   */
  const countDigits = (number) => {
    /** @type {Map<string, number>} */
    const result = new Map();
    for (const digit of number) {
      result.set(digit, (result.get(digit) ?? 0) + 1);
    }

    return result;
  };

  /**
   * @param {ReadonlyMap<string, number>} map1
   * @param {ReadonlyMap<string, number>} map2
   */
  const mapEqual = (map1, map2) => {
    if (map1.size !== map2.size) {
      return false;
    }
    for (const [digit, count] of map1) {
      if (map2.get(digit) !== count) {
        return false;
      }
    }

    return true;
  };

  const nDigitsCount = countDigits(n.toString());

  for (let i = 1; ; i *= 2) {
    if (i.toString().length > n.toString().length) {
      return false;
    }

    const iDigitsCount = countDigits(i.toString());

    if (mapEqual(nDigitsCount, iDigitsCount)) {
      return true;
    }
  }
};
// @lc code=end
