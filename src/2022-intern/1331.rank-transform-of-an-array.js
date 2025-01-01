/*
 * @lc app=leetcode id=1331 lang=javascript
 *
 * [1331] Rank Transform of an Array
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
  const nums = [...new Set(arr)];
  nums.sort((a, b) => a - b);
  const numToRank = new Map(nums.map((val, index) => [val, index + 1]));

  const result = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = numToRank.get(arr[i]);
  }

  return result;
};
// @lc code=end
