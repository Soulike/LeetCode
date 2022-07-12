/*
 * @lc app=leetcode id=128 lang=javascript
 *
 * [128] Longest Consecutive Sequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
    const numSet = new Set(nums);
    let result = 0;
    for (const num of nums) {
        if (numSet.has(num)) {
            let left = num;
            let right = num;
            numSet.delete(num);
            for (let i = 1; ; i++) {
                if (numSet.has(num + i)) {
                    right = num + i;
                    numSet.delete(num + i);
                } else {
                    break;
                }
            }
            for (let i = 1; ; i++) {
                if (numSet.has(num - i)) {
                    left = num - i;
                    numSet.delete(num - i);
                } else {
                    break;
                }
            }
            result = Math.max(result, right - left + 1);
        }
    }
    return result;
};
// @lc code=end

longestConsecutive([9, 1, -3, 2, 4, 8, 3, -1, 6, -2, -4, 7]);
