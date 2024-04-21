/*
 * @lc app=leetcode id=1356 lang=javascript
 *
 * [1356] Sort Integers by The Number of 1 Bits
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function (arr) {
  return arr.sort((a, b) => {
    const a1BitCount = get1BitCount(a);
    const b1BitCount = get1BitCount(b);
    if (a1BitCount !== b1BitCount) {
      return a1BitCount - b1BitCount;
    } else {
      return a - b;
    }
  });
};

/** @type {number[]} */
const oneBitCountMemo = [];

/**
 * @param {number} num
 * @returns {number}
 */
function get1BitCount(num) {
  const memoKey = num;
  if (oneBitCountMemo[memoKey] !== undefined) return oneBitCountMemo[memoKey];

  let oneBitCount = 0;
  while (num > 0) {
    while (num > 0 && (num & 0b1) === 0) {
      num >>= 1;
    }
    if (num > 0) {
      oneBitCount += 1;
      num >>= 1;
    }
  }
  oneBitCountMemo[memoKey] = oneBitCount;
  return oneBitCount;
}
// @lc code=end

get1BitCount(1);
