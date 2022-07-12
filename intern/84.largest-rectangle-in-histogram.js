/*
 * @lc app=leetcode id=84 lang=javascript
 *
 * [84] Largest Rectangle in Histogram
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
    heights.push(0);

    let maxArea = 0;

    /**
     * 存储高度下标，按照高度递增
     * @type {number[]}
     */
    const monostack = [];
    for (let i = 0; i < heights.length; i++) {
        if (monostack.length === 0) {
            monostack.push(i);
        } else {
            const topIndex = monostack[monostack.length - 1];
            if (heights[topIndex] < heights[i]) {
                monostack.push(i);
            } // topHeight >= heights[i]
            else {
                monostack.pop();
                const poppedTopIndex = monostack[monostack.length - 1];

                maxArea = Math.max(
                    maxArea,
                    heights[topIndex] *
                        (monostack.length === 0 ? i : i - poppedTopIndex - 1),
                );
                i--;
            }
        }
    }

    return maxArea;
};
// @lc code=end
