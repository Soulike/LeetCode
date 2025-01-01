/*
 * @lc app=leetcode id=2279 lang=javascript
 *
 * [2279] Maximum Bags With Full Capacity of Rocks
 */

// @lc code=start
/**
 * @param {number[]} capacity
 * @param {number[]} rocks
 * @param {number} additionalRocks
 * @return {number}
 */
var maximumBags = function (capacity, rocks, additionalRocks) {
  const N = capacity.length;
  const leftCapacities = new Array(N);
  for (let i = 0; i < N; i++) {
    leftCapacities[i] = capacity[i] - rocks[i];
  }

  leftCapacities.sort((a, b) => a - b);
  let filledBagNumber = 0;
  for (const leftCapacity of leftCapacities) {
    if (additionalRocks < leftCapacity) break;
    additionalRocks -= leftCapacity;
    filledBagNumber += 1;
  }

  return filledBagNumber;
};
// @lc code=end
