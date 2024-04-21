/*
 * @lc app=leetcode id=496 lang=javascript
 *
 * [496] Next Greater Element I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  /*
    mono stack containing indexes, decrease from bottom to top
    get all nges in nums2, make a map num -> nge
    get nges of nums1
    */

  /** @type {number[]} */
  const monostack = [];
  /** @type {number[]} */
  const nextGreaterElementIndexes = new Array(nums2.length);
  nextGreaterElementIndexes.fill(-1);

  for (let i = 0; i < nums2.length; i++) {
    if (monostack.length === 0) {
      monostack.push(i);
    } else {
      let topIndex = monostack[monostack.length - 1];
      let topNum = nums2[topIndex];
      const currentNum = nums2[i];
      if (topNum > currentNum) {
        monostack.push(i);
      } else {
        while (monostack.length > 0 && topNum <= currentNum) {
          monostack.pop();
          nextGreaterElementIndexes[topIndex] = i;
          topIndex = monostack[monostack.length - 1];
          topNum = nums2[topIndex];
        }
        monostack.push(i);
      }
    }
  }

  /** @type {Map<number, number>} */
  const numToNextGreaterElementIndex = new Map();

  for (let i = 0; i < nextGreaterElementIndexes.length; i++) {
    numToNextGreaterElementIndex.set(nums2[i], nextGreaterElementIndexes[i]);
  }

  return nums1.map((element) => {
    const nums2Index = numToNextGreaterElementIndex.get(element);

    if (nums2Index === -1 || nums2Index === undefined) {
      return -1;
    } else {
      return nums2[nums2Index];
    }
  });
};
// @lc code=end

console.log(nextGreaterElement([1, 3, 5, 2, 4], [6, 5, 4, 3, 2, 1, 7]));
