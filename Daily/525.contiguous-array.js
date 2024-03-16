/*
 * @lc app=leetcode id=525 lang=javascript
 *
 * [525] Contiguous Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
    /** @type {Map<number, number>} */
    const valueToFirstIndex = new Map();
    let currentValue = 0;
    valueToFirstIndex.set(0, 0);

    let maxLength = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) currentValue--;
        else currentValue++;

        const firstIndex = valueToFirstIndex.get(currentValue);
        if (firstIndex === undefined) {
            valueToFirstIndex.set(currentValue, i + 1);
        } else {
            maxLength = Math.max(maxLength, i - firstIndex + 1);
        }
    }

    return maxLength;
};
// @lc code=end

findMaxLength([0, 1]);
