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
  const dayCountCache = new Map();
  function getDayCountByCapacity(capacity) {
    if (dayCountCache.has(capacity)) {
      return dayCountCache.get(capacity);
    }
    let dayCount = 0;
    const capacityCopy = capacity;
    for (let i = 0; i < weights.length; i++) {
      // 包裹比最大容量还大，不可能运走
      if (weights[i] > capacityCopy) {
        dayCountCache.set(capacity, Infinity);
        return Infinity;
      }
      if (weights[i] > capacity) {
        // 装不下了
        dayCount++; // 运走
        capacity = capacityCopy; // 新船
      }
      capacity -= weights[i];
    }
    if (capacity < capacityCopy) {
      // 最后一船
      dayCount++;
    }
    dayCountCache.set(capacityCopy, dayCount);
    return dayCount;
  }

  let minCapacity = 1;
  let maxCapacity = 5 * 10 ** 4 * 500;

  while (true) {
    const midCapacity = Math.floor((minCapacity + maxCapacity) / 2);
    const midDayCount = getDayCountByCapacity(midCapacity);
    if (midDayCount > days) {
      minCapacity = midCapacity + 1;
    } else {
      if (getDayCountByCapacity(midCapacity - 1) > days) {
        return midCapacity;
      } else {
        maxCapacity = midCapacity - 1;
      }
    }
  }
};
// @lc code=end
