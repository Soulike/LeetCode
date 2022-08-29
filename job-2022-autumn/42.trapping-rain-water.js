/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    const n = height.length;
    const maxLeft = new Array(n);
    const maxRight = new Array(n);

    maxLeft[0] = height[0];
    maxRight[height.length - 1] = height[height.length - 1];

    for (let i = 1; i < height.length; i++) {
        maxLeft[i] = Math.max(height[i], maxLeft[i - 1]);
        maxRight[n - 1 - i] = Math.max(
            height[n - 1 - i],
            maxRight[n - 1 - i + 1],
        );
    }

    let water = 0;

    for (let i = 0; i < n; i++) {
        water += Math.min(maxLeft[i], maxRight[i]) - height[i];
    }

    return water;
};
// @lc code=end
