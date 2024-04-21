/*
 * @lc app=leetcode id=739 lang=javascript
 *
 * [739] Daily Temperatures
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  /** @type {number[]} */
  const nonIncreaseIndexMonoStack = [0];
  /** @type {number[]} */
  const answer = new Array(temperatures.length);
  answer.fill(0);

  for (let i = 1; i < temperatures.length; i++) {
    const currentTemperature = temperatures[i];
    let stackTopIndex =
      nonIncreaseIndexMonoStack[nonIncreaseIndexMonoStack.length - 1];
    while (
      nonIncreaseIndexMonoStack.length > 0 &&
      currentTemperature > temperatures[stackTopIndex]
    ) {
      answer[stackTopIndex] = i - stackTopIndex;
      nonIncreaseIndexMonoStack.pop();
      stackTopIndex =
        nonIncreaseIndexMonoStack[nonIncreaseIndexMonoStack.length - 1];
    }

    nonIncreaseIndexMonoStack.push(i);
  }

  return answer;
};
// @lc code=end
