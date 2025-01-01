/*
 * @lc app=leetcode id=904 lang=javascript
 *
 * [904] Fruit Into Baskets
 */

// @lc code=start
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  // find the longest subarray having <=2 types of fruits
  const N = fruits.length;

  let left = 0;
  let right = 0;

  let maxLen = 0;

  /** @type {Map<number, number>} */
  const fruitTypesToNumber = new Map();

  // slide window. maintain fruitTypesToNumber.size <= 2
  while (right < N) {
    fruitTypesToNumber.set(
      fruits[right],
      (fruitTypesToNumber.get(fruits[right]) ?? 0) + 1,
    );

    if (fruitTypesToNumber.size > 2) {
      maxLen = Math.max(maxLen, right - left);

      while (fruitTypesToNumber.size > 2) {
        // move left
        fruitTypesToNumber.set(
          fruits[left],
          (fruitTypesToNumber.get(fruits[left]) ?? 0) - 1,
        );

        if (fruitTypesToNumber.get(fruits[left]) === 0) {
          fruitTypesToNumber.delete(fruits[left]);
        }

        left++;
      }
    }

    right++;
  }

  maxLen = Math.max(maxLen, right - left);

  return maxLen;
};
// @lc code=end

totalFruit([1, 2, 3, 4, 5]);
