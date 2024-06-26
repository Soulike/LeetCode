/*
 * @lc app=leetcode id=1011 lang=javascript
 *
 * [1011] Capacity To Ship Packages Within D Days
 */

// @lc code=start
/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
  /**
   * @param {number} capacity
   * @returns {number}
   */
  const getDayNumber = (capacity) => {
    let dayNumber = 1;
    let leftCapacity = capacity;
    for (const weight of weights) {
      if (weight > capacity) return Infinity;

      if (leftCapacity < weight) {
        dayNumber++;
        leftCapacity = capacity;
      }
      leftCapacity -= weight;
    }

    return dayNumber;
  };

  const MAX_WEIGHT = 5 * 10 ** 4;
  let minCapacity = 1;
  let maxCapacity = MAX_WEIGHT * weights.length;

  while (minCapacity < maxCapacity) {
    const capacity = Math.floor((maxCapacity - minCapacity) / 2) + minCapacity;
    const dayNumber = getDayNumber(capacity);

    if (dayNumber > days) {
      minCapacity = capacity + 1;
    } else if (dayNumber <= days) {
      maxCapacity = capacity;
    }
  }

  return minCapacity;
};
// @lc code=end

shipWithinDays([1, 2, 3, 1, 1], 4);
