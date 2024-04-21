/*
 * @lc app=leetcode id=907 lang=javascript
 *
 * [907] Sum of Subarray Minimums
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function (arr) {
  const MOD = 10 ** 9 + 7;
  let sum = 0;
  arr.unshift(-Infinity);
  arr.push(-Infinity);

  /**
   * non-decreasing stack
   * @type {number[]}
   * */
  const monostack = [];

  for (let i = 0; i < arr.length; i++) {
    while (
      monostack.length > 0 &&
      arr[monostack[monostack.length - 1]] > arr[i]
    ) {
      const stackTop = monostack.pop();
      const leftBoundary = monostack[monostack.length - 1];
      const rightBoundary = i;
      sum +=
        (stackTop - leftBoundary) * (rightBoundary - stackTop) * arr[stackTop];
    }
    monostack.push(i);
  }

  return sum % MOD;
};
// @lc code=end

sumSubarrayMins([1, 6, 8, 7, 4, 5, 9, 6, 5, 4, 7, 8, 5]);
