/*
 * @lc app=leetcode id=239 lang=javascript
 *
 * [239] Sliding Window Maximum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  /**
   * non-increasing queue
   * @type {number[]}
   * */
  const monoQueue = [];

  /**
   * @param {number} newElement
   */
  const pushMonoQueue = (newElement) => {
    if (monoQueue.length > 0) {
      let backNumber = monoQueue[monoQueue.length - 1];
      while (monoQueue.length > 0 && backNumber < newElement) {
        monoQueue.pop();
        backNumber = monoQueue[monoQueue.length - 1];
      }
    }
    monoQueue.push(newElement);
  };

  /** @type {number[]} */
  const result = [];

  let left = 0;
  let right = k - 1;

  for (let i = 0; i < k; i++) {
    pushMonoQueue(nums[i]);
  }

  while (true) {
    result.push(monoQueue[0]);

    if (right === nums.length - 1) {
      break;
    }

    if (monoQueue[0] === nums[left]) {
      monoQueue.shift();
    }
    left++;
    right++;

    pushMonoQueue(nums[right]);
  }

  return result;
};
// @lc code=end
