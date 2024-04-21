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
var canJump = function (nums) {
  const N = nums.length;
  let currentIndex = 0;

  while (true) {
    const steps = nums[currentIndex];
    const maxReachableIndex = currentIndex + steps;
    if (maxReachableIndex >= N - 1) return true;

    let nextIndex = currentIndex;
    let maxNextIndexReachableIndex = currentIndex;
    for (let i = currentIndex; i <= maxReachableIndex; i++) {
      if (nums[i] + i > maxNextIndexReachableIndex) {
        maxNextIndexReachableIndex = nums[i] + i;
        nextIndex = i;
      }
    }
    if (currentIndex === nextIndex) return false;
    currentIndex = nextIndex;
  }
};
// @lc code=end

canJump([1, 2, 3]);
