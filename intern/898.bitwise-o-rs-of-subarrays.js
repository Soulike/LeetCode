/*
 * @lc app=leetcode id=898 lang=javascript
 *
 * [898] Bitwise ORs of Subarrays
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var subarrayBitwiseORs = function (arr) {
  /** 所有的不重复数字 */
  const result = new Set();
  /** [0,j][1,j]...[j-1,j][j,j] 的所有不重复数字 */
  let prev = new Set();

  for (const num of arr) {
    const current = new Set([num]);
    for (const prevNum of prev) {
      current.add(prevNum | num);
    }
    prev = current;
    for (const prevNum of prev) {
      result.add(prevNum);
    }
  }

  return result.size;
};
// @lc code=end

subarrayBitwiseORs([1, 1, 2]);
