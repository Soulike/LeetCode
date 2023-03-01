/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    mergeSort(nums);
    return nums;
};

/**
 * @param {number[]} nums
 * @return {void}
 */
function mergeSort(nums) {
    /**
     * @param {number} start1
     * @param {number} end1
     * @param {number} start2
     * @param {number} end2
     * @return {number[]}
     */
    const merge = (start1, end1, start2, end2) => {
        /** @type {number[]} */
        const mergedNums = [];

        let nums1Index = start1;
        let nums2Index = start2;

        while (nums1Index <= end1 && nums2Index <= end2) {
            if (nums[nums1Index] < nums[nums2Index]) {
                mergedNums.push(nums[nums1Index]);
                nums1Index++;
            } else {
                mergedNums.push(nums[nums2Index]);
                nums2Index++;
            }
        }

        while (nums1Index <= end1) {
            mergedNums.push(nums[nums1Index]);
            nums1Index++;
        }

        while (nums2Index <= end2) {
            mergedNums.push(nums[nums2Index]);
            nums2Index++;
        }

        return mergedNums;
    };

    /**
     * @param {number} leftBorder
     * @param {number} rightBorder
     * @returns {void}
     */
    const recursive = (leftBorder, rightBorder) => {
        if (leftBorder === rightBorder) return;

        const mid = leftBorder + Math.floor((rightBorder - leftBorder) / 2);

        recursive(leftBorder, mid);
        recursive(mid + 1, rightBorder);

        const merged = merge(leftBorder, mid, mid + 1, rightBorder);

        for (let i = leftBorder; i <= rightBorder; i++) {
            nums[i] = merged[i - leftBorder];
        }
    };

    recursive(0, nums.length - 1);
}
// @lc code=end

sortArray([5, 2, 3, 1]);
