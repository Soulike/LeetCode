/*
 * @lc app=leetcode id=2007 lang=javascript
 *
 * [2007] Find Original Array From Doubled Array
 */

// @lc code=start
/**
 * @param {number[]} changed
 * @return {number[]}
 */
var findOriginalArray = function (changed) {
    if (changed.length % 2 === 1) {
        return [];
    }

    /** @type {Map<number, number>} */
    const numToCount = new Map();

    for (const num of changed) {
        numToCount.set(num, (numToCount.get(num) ?? 0) + 1);
    }

    /** @type {number[]} */
    const originalArray = [];

    const nums = [...numToCount.keys()];
    nums.sort((a, b) => a - b);

    for (const num of nums) {
        const numCount = numToCount.get(num) ?? 0;
        if (numCount > 0) {
            if (num !== 0) {
                const doubledNumCount = numToCount.get(num * 2) ?? 0;
                if (doubledNumCount < numCount) {
                    return [];
                } else {
                    numToCount.set(num, 0);
                    numToCount.set(num * 2, doubledNumCount - numCount);
                    for (let i = 0; i < numCount; i++) {
                        originalArray.push(num);
                    }
                }
            } else {
                if (numCount % 2 === 0) {
                    for (let i = 0; i < numCount / 2; i++) {
                        originalArray.push(num);
                    }
                } else {
                    return [];
                }
            }
        }
    }

    return originalArray;
};
// @lc code=end
