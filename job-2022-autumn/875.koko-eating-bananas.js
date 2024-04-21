/*
 * @lc app=leetcode id=875 lang=javascript
 *
 * [875] Koko Eating Bananas
 */

// @lc code=start
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let leftSpeed = 1;
  let rightSpeed = 10 ** 4 * 10 ** 9;

  const cache = new Map();
  while (leftSpeed <= rightSpeed) {
    const midSpeed = leftSpeed + Math.floor((rightSpeed - leftSpeed) / 2);

    const midSpeedHours = getHoursByEatingSpeed(piles, midSpeed, cache);

    if (midSpeedHours > h) {
      leftSpeed = midSpeed + 1;
    } else if (midSpeedHours <= h) {
      if (
        midSpeed === 1 ||
        getHoursByEatingSpeed(piles, midSpeed - 1, cache) > h
      ) {
        return midSpeed;
      } else {
        rightSpeed = midSpeed - 1;
      }
    }
  }
};

/**
 * @param {number[]} piles
 * @param {number} eatingSpeed
 * @param {Map<number, number>} cache
 * @returns {number}
 */
function getHoursByEatingSpeed(piles, eatingSpeed, cache) {
  if (cache.has(eatingSpeed)) {
    return cache.get(eatingSpeed);
  }

  let hours = 0;

  for (const pile of piles) {
    const hour = pile / eatingSpeed;
    if (!Number.isInteger(hour)) {
      hours++;
    }
    hours += Math.floor(hour);
  }

  cache.set(eatingSpeed, hours);
  return hours;
}
// @lc code=end
