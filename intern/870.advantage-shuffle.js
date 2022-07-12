/*
 * @lc app=leetcode id=870 lang=javascript
 *
 * [870] Advantage Shuffle
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function (nums1, nums2) {
    const nums2NumAndIndex = new Array(nums2.length);
    for (let i = 0; i < nums2.length; i++) {
        nums2NumAndIndex[i] = [nums2[i], i];
    }

    // 从小到大
    nums2NumAndIndex.sort((a, b) => a[0] - b[0]);

    nums1.sort((a, b) => a - b);

    const result = new Array(nums1.length);

    const numCount = nums1.length;

    let nums1Left = 0;
    let nums1Right = nums1.length - 1;

    let nums2Right = nums2.length - 1;

    for (let i = 0; i < numCount; i++) {
        const maxNum1 = nums1[nums1Right];
        const [maxNum2, maxNum2Index] = nums2NumAndIndex[nums2Right];
        if (maxNum1 > maxNum2) {
            result[maxNum2Index] = maxNum1;
            nums1Right--;
        } else {
            result[maxNum2Index] = nums1[nums1Left];
            nums1Left++;
        }
        nums2Right--;
    }

    return result;
};
// @lc code=end
