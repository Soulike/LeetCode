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
const twoSum = function (nums, target) {
    const map = new Map();
    nums.forEach((value, index) => {
        map.set(value, index);
    });
    for (let i = 0; i < nums.length; i++) {
        const otherIndex = map.get(target - nums[i]);
        if (otherIndex !== undefined && otherIndex !== i) {
            return [i, otherIndex];
        }
    }
};
// @lc code=end
