/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * TLE
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const LENGTH = height.length;
  if (LENGTH < 3) {
    return 0;
  }

  let water = 0;

  let left = 0;
  let right = LENGTH - 1;
  let maxLeft = 0;
  let maxRight = LENGTH - 1;

  while (left <= right) {
    if (height[left] <= height[right]) {
      if (height[left] > height[maxLeft]) {
        maxLeft = left;
      } else {
        water += height[maxLeft] - height[left];
      }
      left++;
    } else {
      if (height[right] > height[maxRight]) {
        maxRight = right;
      } else {
        water += height[maxRight] - height[right];
      }
      right--;
    }
  }

  return water;
};
// @lc code=end
