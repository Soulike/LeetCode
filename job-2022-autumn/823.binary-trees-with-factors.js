/*
 * @lc app=leetcode id=823 lang=javascript
 *
 * [823] Binary Trees With Factors
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var numFactoredBinaryTrees = function (arr) {
  const MOD = 10 ** 9 + 7;
  const numbers = new Set(arr);
  const cache = new Map();

  /**
   * @param {number} root
   * @returns {number}
   */
  const getTreeNumByRoot = (root) => {
    if (cache.has(root)) {
      return cache.get(root);
    }
    let count = 1;
    for (const num1 of numbers) {
      const num2 = root / num1;
      if (Number.isInteger(num2) && numbers.has(num2)) {
        count += getTreeNumByRoot(num1) * getTreeNumByRoot(num2);
        count %= MOD;
      }
    }
    cache.set(root, count);
    return count;
  };

  let count = 0;
  for (const num of arr) {
    count += getTreeNumByRoot(num);
    count %= MOD;
  }
  return count;
};
// @lc code=end

console.log(numFactoredBinaryTrees([2, 3, 4, 6, 7, 8]));
