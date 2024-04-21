/*
 * @lc app=leetcode id=1287 lang=javascript
 *
 * [1287] Element Appearing More Than 25% In Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function (arr) {
  const rangeDiff = Math.floor(arr.length / 4);
  for (let i = 0; i < arr.length - rangeDiff; i++) {
    if (arr[i] === arr[i + rangeDiff]) return arr[i];
  }
};
// @lc code=end
