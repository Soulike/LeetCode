/*
 * @lc app=leetcode id=503 lang=javascript
 *
 * [503] Next Greater Element II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const nextGreaterElements = function (nums) {
  const LENGTH = nums.length;
  nums = [...nums, ...nums];
  const result = new Array(LENGTH);
  result.fill(-1);

  // nums[i] 从栈底到栈顶，不严格递减
  const monostack = [];
  for (let i = 0; i < nums.length; i++) {
    if (monostack.length === 0) {
      monostack.push(i);
    } else {
      let topIndex = monostack[monostack.length - 1];
      let topElement = nums[topIndex];
      while (topElement < nums[i]) {
        result[topIndex % LENGTH] = nums[i];
        monostack.pop();
        if (monostack.length === 0) {
          break;
        }
        topIndex = monostack[monostack.length - 1];
        topElement = nums[topIndex];
      }
      monostack.push(i);
    }
  }
  return result;
};
// @lc code=end
