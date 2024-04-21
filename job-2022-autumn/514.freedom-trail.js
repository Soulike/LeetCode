/*
 * @lc app=leetcode id=514 lang=javascript
 *
 * [514] Freedom Trail
 */

// @lc code=start
/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
var findRotateSteps = function (ring, key) {
  /** @type {Map<string, number[]>} */
  const letterToIndexes = new Map();

  for (let i = 0; i < ring.length; i++) {
    const letter = ring[i];
    const indexes = letterToIndexes.get(letter) ?? [];
    indexes.push(i);
    letterToIndexes.set(ring[i], indexes);
  }

  /** @type {Map<string, number>} */
  const memo = new Map();
  /**
   * 从 ring[ringIndex:] 得到 key[keyIndex:] 最少需要多少步
   * @param {number} ringIndex
   * @param {number} keyIndex
   * @returns {number}
   */
  const dp = (ringIndex, keyIndex) => {
    if (keyIndex === key.length) {
      return 0;
    }
    const memoKey = `${ringIndex}-${keyIndex}`;
    if (memo.has(memoKey)) {
      return memo.get(memoKey);
    }
    const letter = key[keyIndex];

    const indexes = letterToIndexes.get(letter) ?? [];

    let result = Infinity;

    for (const index of indexes) {
      const rotateSteps = Math.min(
        Math.abs(ringIndex - index),
        ring.length - Math.abs(ringIndex - index),
      );
      result = Math.min(result, 1 + rotateSteps + dp(index, keyIndex + 1));
    }

    memo.set(memoKey, result);
    return result;
  };

  const result = dp(0, 0);
  return result;
};
// @lc code=end
