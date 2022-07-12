/*
 * @lc app=leetcode id=496 lang=javascript
 *
 * [496] Next Greater Element I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const nextGreaterElement = function (nums1, nums2) {
    const numToIndexOfNums2 = new Map();

    for (let i = 0; i < nums2.length; i++) {
        numToIndexOfNums2.set(nums2[i], i);
    }

    const nextGreaterElementOfNums2 = new Array(nums2.length);
    nextGreaterElementOfNums2.fill(-1);

    const monostackOfElementIndexInNums2 = []; // 栈底到栈顶，单调递减
    for (let i = 0; i < nums2.length; i++) {
        if (monostackOfElementIndexInNums2.length === 0) {
            monostackOfElementIndexInNums2.push(i);
        } else {
            let topIndex =
                monostackOfElementIndexInNums2[
                    monostackOfElementIndexInNums2.length - 1
                ];
            let topTemp = nums2[topIndex];
            while (topTemp < nums2[i]) {
                // 遇到了一个上升的温度
                nextGreaterElementOfNums2[topIndex] = nums2[i];
                monostackOfElementIndexInNums2.pop();
                if (monostackOfElementIndexInNums2.length === 0) {
                    break;
                }

                topIndex =
                    monostackOfElementIndexInNums2[
                        monostackOfElementIndexInNums2.length - 1
                    ];
                topTemp = nums2[topIndex];
            }
            monostackOfElementIndexInNums2.push(i);
        }
    }

    const result = [];
    for (const num of nums1) {
        const numIndexInNums2 = numToIndexOfNums2.get(num);
        result.push(nextGreaterElementOfNums2[numIndexInNums2]);
    }

    return result;
};
// @lc code=end
