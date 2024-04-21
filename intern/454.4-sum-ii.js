/*
 * @lc app=leetcode id=454 lang=javascript
 *
 * [454] 4Sum II
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
const fourSumCount = function (nums1, nums2, nums3, nums4) {
  const N = nums1.length;
  let count = 0;

  /** @type {Map<number, number>} */
  const sumToCount1 = new Map();

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const sum = nums1[i] + nums2[j];
      sumToCount1.set(sum, (sumToCount1.get(sum) ?? 0) + 1);
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const sum = nums3[i] + nums4[j];
      count += sumToCount1.get(-sum) ?? 0;
    }
  }

  return count;
};
// @lc code=end
