/*
 * @lc app=leetcode id=870 lang=javascript
 *
 * [870] Advantage Shuffle
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);

  const num2ToIndex = nums2.map((value, i) => [value, i]);

  num2ToIndex.sort(([val1], [val2]) => val2 - val1);

  const result = new Array(nums1.length);

  let num1Left = 0;
  let num1Right = nums1.length - 1;

  for (let i = 0; i < num2ToIndex.length; i++) {
    const [num2, num2Index] = num2ToIndex[i];
    // the largest one in nums1 is not greater than the largest one in nums2, choose the smallest one
    if (nums1[num1Right] <= num2) {
      result[num2Index] = nums1[num1Left];
      num1Left++;
    } else {
      // otherwise, obtain advantage
      result[num2Index] = nums1[num1Right];
      num1Right--;
    }
  }

  return result;
};
// @lc code=end
