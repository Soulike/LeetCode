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
const dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length);
  result.fill(0);

  const monostack = []; // 递增栈，存储索引
  for (let i = 0; i < temperatures.length; i++) {
    if (monostack.length === 0) {
      monostack.push(i);
    } else {
      let top = monostack[monostack.length - 1];
      while (monostack.length > 0 && temperatures[top] < temperatures[i]) {
        result[top] = i - top;
        monostack.pop();
        top = monostack[monostack.length - 1];
      }
      monostack.push(i);
    }
  }
  return result;
};
// @lc code=end
