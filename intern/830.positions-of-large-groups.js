/*
 * @lc app=leetcode id=830 lang=javascript
 *
 * [830] Positions of Large Groups
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[][]}
 */
const largeGroupPositions = function (s) {
  /**@type {number[][]} */
  const groups = [];
  const LENGTH = s.length;

  let leftIndex = 0;
  let rightIndex = 0;

  while (rightIndex < LENGTH) {
    if (s.charAt(leftIndex) !== s.charAt(rightIndex)) {
      if (rightIndex - leftIndex >= 3) {
        groups.push([leftIndex, rightIndex - 1]);
      }
      leftIndex = rightIndex;
    }
    rightIndex++;
  }
  if (rightIndex - leftIndex >= 3) {
    groups.push([leftIndex, rightIndex - 1]);
  }

  return groups;
};
// @lc code=end
