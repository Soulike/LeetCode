/*
 * @lc app=leetcode id=55 lang=javascript
 *
 * [55] Jump Game
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = function (nums) {
  const destIndex = nums.length - 1;

  /**
   * 贪心策略，每次选择下一个地点时，选可以跳得最远的
   */

  let currIndex = 0;
  while (true) {
    if (currIndex + nums[currIndex] >= destIndex) {
      return true;
    } else if (nums[currIndex] === 0) {
      return false;
    } else {
      let max = 0;
      let maxIndex = 0;
      for (let i = currIndex + 1; i <= currIndex + nums[currIndex]; i++) {
        if (i + nums[i] > max) {
          max = i + nums[i];
          maxIndex = i;
        }
      }
      currIndex = maxIndex;
    }
  }
};
// @lc code=end

console.log(canJump([0, 1]));
