/*
 * @lc app=leetcode id=393 lang=javascript
 *
 * [393] UTF-8 Validation
 */

// @lc code=start
/**
 * @param {number[]} data
 * @return {boolean}
 */
var validUtf8 = function (data) {
  let nextIndex = 0;
  const n = data.length;

  while (nextIndex < n) {
    const prefixSize = get1PrefixSize(data[nextIndex]);
    if (prefixSize === 0) {
      nextIndex++;
    } else if (prefixSize === 1 || prefixSize > 4) {
      return false;
    } else {
      if (nextIndex + prefixSize - 1 > n - 1) {
        return false;
      }
      for (let i = 1; i < prefixSize; i++) {
        if (get1PrefixSize(data[nextIndex + i]) !== 1) {
          return false;
        }
      }
      nextIndex += prefixSize;
    }
  }

  return true;
};

/**
 * @param {number} num
 * @returns {number}
 */
function get1PrefixSize(num) {
  let mask = 0b10000000;
  let size = 0;

  while ((mask & num) !== 0) {
    size++;
    mask >>>= 1;
  }

  return size;
}
// @lc code=end

console.log(validUtf8([250, 145, 145, 145, 145]));
