/*
 * @lc app=leetcode id=1438 lang=javascript
 *
 * [1438] Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function (nums, limit) {
  /**
   * 维持两个单调队列
   * decreaseQueue 从头到尾递减，头保存窗口的最大值
   * increaseQueue 从头到尾递增，头保存窗口的最小值
   *
   * 每次窗口 right + 1 加入一个数字，查看最大值与最小值的差值
   *
   * 如果 <= limit，记录长度
   * 如果 > limit，left + 1 并调整两个队列
   */

  /** @type {number[]} */
  const decreaseQueue = [];
  /** @type {number[]} */
  const increaseQueue = [];

  let left = 0;
  let right = 0;

  let maxLength = 0;

  while (right < nums.length) {
    while (
      decreaseQueue.length > 0 &&
      decreaseQueue[decreaseQueue.length - 1] < nums[right]
    ) {
      decreaseQueue.pop();
    }
    decreaseQueue.push(nums[right]);

    while (
      increaseQueue.length > 0 &&
      increaseQueue[increaseQueue.length - 1] > nums[right]
    ) {
      increaseQueue.pop();
    }
    increaseQueue.push(nums[right]);

    while (Math.abs(increaseQueue[0] - decreaseQueue[0]) > limit) {
      if (increaseQueue[0] === nums[left]) {
        increaseQueue.shift();
      }
      if (decreaseQueue[0] === nums[left]) {
        decreaseQueue.shift();
      }
      left++;
    }
    maxLength = Math.max(right - left + 1, maxLength);
    right++;
  }

  return maxLength;
};
// @lc code=end
