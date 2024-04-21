/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;

  let maxArea = 0;

  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right]);
    maxArea = Math.max(area, maxArea);

    if (height[left] < height[right]) {
      let nextLeft = left + 1;
      while (height[nextLeft] <= height[left] && nextLeft < right) {
        nextLeft++;
      }
      left = nextLeft;
    } else {
      let nextRight = right - 1;
      while (height[nextRight] <= height[right] && nextRight > left) {
        nextRight--;
      }
      right = nextRight;
    }
  }

  return maxArea;
};
// @lc code=end
