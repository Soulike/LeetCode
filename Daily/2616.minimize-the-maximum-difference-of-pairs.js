/*
 * @lc app=leetcode id=2616 lang=javascript
 *
 * [2616] Minimize the Maximum Difference of Pairs
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minimizeMax = function (nums, p) {
    nums.sort((a, b) => a - b);

    /**
     * @param {number} diff
     * @returns {number}
     */
    const getPairNumBelowDiff = (diff) => {
        let count = 0;
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i + 1] - nums[i] <= diff) {
                count++;
                i++;
            }
        }
        return count;
    };

    let leftDiff = 0;
    let rightDiff = nums[nums.length - 1] - nums[0];

    while (leftDiff <= rightDiff) {
        const midDiff = Math.floor((rightDiff - leftDiff) / 2) + leftDiff;

        const pairNumBelowDiff = getPairNumBelowDiff(midDiff);
        if (pairNumBelowDiff < p) {
            leftDiff = midDiff + 1;
        } else if (pairNumBelowDiff >= p) {
            if (midDiff === 0 || getPairNumBelowDiff(midDiff - 1) < p) {
                return midDiff;
            } else {
                rightDiff = midDiff - 1;
            }
        }
    }
};
// @lc code=end

minimizeMax([10, 1, 2, 7, 1, 3], 3);
