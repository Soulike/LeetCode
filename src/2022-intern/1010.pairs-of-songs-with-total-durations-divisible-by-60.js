/*
 * @lc app=leetcode id=1010 lang=javascript
 *
 * [1010] Pairs of Songs With Total Durations Divisible by 60
 */

// @lc code=start
/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function (time) {
  /**
   * 首先 time 全部 mod 60，之后统计 time -> index[] 的映射 map
   * 遍历 time，t=time[i]，如果 60-t 存在于 map 中，取 index[] 当中大于 i 的下标个数加入总数（二分上界）
   */
  const timeToIndexes = new Map();
  for (let i = 0; i < time.length; i++) {
    time[i] %= 60;

    const indexes = timeToIndexes.get(time[i]) ?? [];
    indexes.push(i);
    timeToIndexes.set(time[i], indexes);
  }

  let count = 0;

  for (let i = 0; i < time.length; i++) {
    const restTime = (60 - time[i]) % 60;
    if (timeToIndexes.has(restTime)) {
      const restTimeIndexes = timeToIndexes.get(restTime);
      let largerBoundaryIndex = binarySearchLargerBoundary(restTimeIndexes, i);
      if (largerBoundaryIndex !== -1) {
        if (restTimeIndexes[largerBoundaryIndex] === i) {
          largerBoundaryIndex++;
        }
        count += restTimeIndexes.length - largerBoundaryIndex;
      }
    }
  }

  return count;
};

/**
 *
 * @param {number[]} nums
 * @param {number} target
 */
function binarySearchLargerBoundary(nums, target) {
  if (target <= nums[0]) {
    return 0;
  }

  const n = nums.length;

  if (target >= nums[n - 1]) {
    return -1;
  }

  let left = 0;
  let right = n - 1;

  while (true) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      if (nums[mid - 1] < target) {
        return mid;
      } else {
        right = mid - 1;
      }
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
}
// @lc code=end
