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
    /**
     * @param {number} startIndex
     * @param {number} endIndex
     * @returns {number} -1 if not found
     */
    const helper = (startIndex, endIndex) => {
        if (startIndex > endIndex) return -1;

        const isIncreaseOrdered =
            startIndex === endIndex ||
            (mountainArr.get(startIndex) < mountainArr.get(startIndex + 1) &&
                mountainArr.get(endIndex - 1) < mountainArr.get(endIndex));
        if (isIncreaseOrdered) {
            return mountainArrayBinarySearch(
                mountainArr,
                startIndex,
                endIndex,
                target,
                true,
            );
        }
        const isDecreaseOrdered =
            mountainArr.get(startIndex) > mountainArr.get(startIndex + 1) &&
            mountainArr.get(endIndex - 1) > mountainArr.get(endIndex);
        if (isDecreaseOrdered) {
            return mountainArrayBinarySearch(
                mountainArr,
                startIndex,
                endIndex,
                target,
                false,
            );
        }

        const midIndex = Math.floor((startIndex + endIndex) / 2);
        let result = helper(startIndex, midIndex);
        if (result === -1) {
            result = helper(midIndex + 1, endIndex);
        }
        return result;
    };

    const result = helper(0, mountainArr.length() - 1);
    return result;
};

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
