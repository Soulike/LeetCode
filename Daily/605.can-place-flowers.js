/*
 * @lc app=leetcode id=605 lang=javascript
 *
 * [605] Can Place Flowers
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  const UNPLANTED = 0;
  const PLANTED = 1;

  let prevFloweredIndex = -2;
  let plantNumber = 0;

  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === PLANTED) {
      const canPlantRangeSize = Math.ceil(
        Math.max(i - 1 - (prevFloweredIndex + 1) - 1, 0) / 2,
      );
      plantNumber += canPlantRangeSize;

      if (plantNumber >= n) return true;

      prevFloweredIndex = i;
    }
  }

  const lastCanPlantRangeSize = Math.ceil(
    Math.max(flowerbed.length + 1 - 1 - (prevFloweredIndex + 1) - 1, 0) / 2,
  );
  plantNumber += lastCanPlantRangeSize;

  return plantNumber >= n;
};
// @lc code=end
