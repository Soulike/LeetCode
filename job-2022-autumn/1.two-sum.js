/*
 * @lc app=leetcode id=1 lang=javascript
 *
 * [1] Two Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    /** @type [num: number, index: number][] */
    const numToIndex = nums.map((num, i) => [num, i]);
    numToIndex.sort((a, b) => a[0] - b[0]);

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const sum = numToIndex[left][0] + numToIndex[right][0];
        if (sum > target) {
            right--;
            while (
                (right === nums.length - 1 ||
                    numToIndex[right][0] === numToIndex[right + 1][0]) &&
                left < right
            ) {
                right--;
            }
        } else if (sum < target) {
            left++;
            while (
                (left === 0 ||
                    numToIndex[left][0] === numToIndex[left - 1][0]) &&
                left < right
            ) {
                left++;
            }
        } else {
            return [numToIndex[left][1], numToIndex[right][1]];
        }
    }
};
// @lc code=end
