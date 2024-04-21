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
  let capacityLeft = 1;
  // capacity of shipping cargo in maximum weight in 1 day
  let capacityRight = 5 * 1000 * 500;

  const cache = new Map();

  while (capacityLeft <= capacityRight) {
    const capacityMid =
      capacityLeft + Math.floor((capacityRight - capacityLeft) / 2);
    const currentDays = getSpiltNumberBySum(capacityMid, weights, cache);

    // Find the upper bound
    if (currentDays > days) {
      capacityLeft = capacityMid + 1;
    } else if (currentDays <= days) {
      if (getSpiltNumberBySum(capacityMid - 1, weights, cache) > days) {
        return capacityMid;
      } else {
        capacityRight = capacityMid - 1;
      }
    }
  }
};

/**
 * When the capacity is set, how many days are needed to ship all cargos
 * @param {number} capacity
 * @param {number[]} weights
 * @param {Map<number, number>} cache
 * @returns {number}
 */
function getSpiltNumberBySum(capacity, weights, cache) {
  if (cache.has(capacity)) {
    return cache.get(capacity);
  }
  let days = 0;
  let leftCapacity = capacity;
  for (let i = 0; i < weights.length; i++) {
    if (capacity < weights[i]) {
      return Infinity;
    }
    if (leftCapacity < weights[i]) {
      days++;
      leftCapacity = capacity;
      i--;
    } else if (leftCapacity >= weights[i]) {
      leftCapacity -= weights[i];
    }
  }

  if (leftCapacity !== capacity) days++;

  cache.set(capacity, days);
  return days;
}
// @lc code=end

console.log(shipWithinDays([1, 2, 3, 1, 1], 4));
