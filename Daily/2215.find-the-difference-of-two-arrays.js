/*
 * @lc app=leetcode id=2215 lang=javascript
 *
 * [2215] Find the Difference of Two Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums1 = nums1.filter(
    (value, index, arr) => index === 0 || value !== arr[index - 1],
  );

  nums2.sort((a, b) => a - b);
  nums2 = nums2.filter(
    (value, index, arr) => index === 0 || value !== arr[index - 1],
  );

  let nums1Index = 0;
  let nums2Index = 0;

  /** @type {[number[], number[]]} */
  const answer = [[], []];

  while (nums1Index < nums1.length && nums2Index < nums2.length) {
    if (nums1[nums1Index] < nums2[nums2Index]) {
      answer[0].push(nums1[nums1Index]);
      nums1Index++;
    } else if (nums1[nums1Index] > nums2[nums2Index]) {
      answer[1].push(nums2[nums2Index]);
      nums2Index++;
    } else {
      nums1Index++;
      nums2Index++;
    }
  }

  while (nums1Index < nums1.length) {
    answer[0].push(nums1[nums1Index]);
    nums1Index++;
  }

  while (nums2Index < nums2.length) {
    answer[1].push(nums2[nums2Index]);
    nums2Index++;
  }

  return answer;
};
// @lc code=end

findDifference([1, 2, 3, 3], [1, 1, 2, 2]);
