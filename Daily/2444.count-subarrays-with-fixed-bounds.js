/*
 * @lc app=leetcode id=2444 lang=javascript
 *
 * [2444] Count Subarrays With Fixed Bounds
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} minK
 * @param {number} maxK
 * @return {number}
 */
var countSubarrays = function (nums, minK, maxK) {
    let invalidIndex = -1;
    let minIndex = -1;
    let maxIndex = -1;
    let subarrayNumber = 0;

    // The subarray ends at i
    for (let i = 0; i < nums.length; i++) {
        // The next subarray must starts after i
        if (nums[i] > maxK || nums[i] < minK) {
            invalidIndex = i;
            // Need to find minIndex and maxIndex again
            minIndex = -1;
            maxIndex = -1;
        }
        if (nums[i] === maxK) maxIndex = i;
        if (nums[i] === minK) minIndex = i;

        // Ensure there are minK and maxK in [invalidIndex+1, i]
        if (minIndex !== -1 && maxIndex !== -1) {
            // We can choose startIndex in [invalidIndex+1, Math.min(minIndex, maxIndex)]
            subarrayNumber +=
                Math.min(minIndex, maxIndex) - (invalidIndex + 1) + 1;
        }
    }

    return subarrayNumber;
};
// @lc code=end
