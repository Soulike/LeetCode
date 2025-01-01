/*
 * @lc app=leetcode id=1095 lang=javascript
 *
 * [1095] Find in Mountain Array
 */

// This is the MountainArray's API interface.
// You should not implement it, or speculate about its implementation
class MountainArray {
  /** @type {number[]} */
  #arr;

  /**
   * @param {number[]} arr
   */
  constructor(arr) {
    this.#arr = arr;
  }

  /**
   * @param {number} index
   * @return {number}
   * */
  get(index) {
    return this.#arr[index];
  }

  /**
   * @returns {number}
   * */
  length() {
    return this.#arr.length;
  }
}

// @lc code=start

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
var findInMountainArray = function (target, mountainArr) {
  const peak = peakIndexInMountainArray(mountainArr);
  let result = mountainArrayBinarySearch(mountainArr, 0, peak, target, true);
  if (result === -1) {
    result = mountainArrayBinarySearch(
      mountainArr,
      peak + 1,
      mountainArr.length() - 1,
      target,
      false,
    );
  }

  return result;
};

/**
 * @param {MountainArray} arr
 * @returns {number}
 */
function peakIndexInMountainArray(arr) {
  let left = 0;
  let right = arr.length() - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr.get(mid) < arr.get(mid + 1)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

/**
 * @param {MountainArray} mountainArr
 * @param {number} startIndex
 * @param {number} endIndex
 * @param {number} target
 * @param {boolean} isIncrease
 * @returns {number} -1 if not found
 */
function mountainArrayBinarySearch(
  mountainArr,
  startIndex,
  endIndex,
  target,
  isIncrease,
) {
  let left = startIndex;
  let right = endIndex;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midNum = mountainArr.get(mid);
    if (isIncrease) {
      if (midNum < target) left = mid + 1;
      else if (midNum > target) right = mid - 1;
      else return mid;
    } else {
      if (midNum < target) right = mid - 1;
      else if (midNum > target) left = mid + 1;
      else return mid;
    }
  }

  return -1;
}
// @lc code=end

const arr = new MountainArray([0, 5, 3, 1]);

findInMountainArray(1, arr);
