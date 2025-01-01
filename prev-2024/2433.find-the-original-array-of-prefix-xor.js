/*
 * @lc app=leetcode id=2433 lang=javascript
 *
 * [2433] Find The Original Array of Prefix Xor
 */

// @lc code=start
/**
 * @param {number[]} pref
 * @return {number[]}
 */
var findArray = function (pref) {
  /** pref[0] = arr[0]
   *  pref[i] = arr[i] ^ pref[i-1]
   *  =>
   *  arr[0] = pref[0]
   *  arr[i] = pref[i] ^ pref[i-1]
   */

  const N = pref.length;
  const arr = new Array(N);

  arr[0] = pref[0];
  for (let i = 1; i < N; i++) {
    arr[i] = pref[i] ^ pref[i - 1];
  }

  return arr;
};
// @lc code=end

findArray([5, 2, 0, 3, 1]);
