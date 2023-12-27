/*
 * @lc app=leetcode id=1578 lang=javascript
 *
 * [1578] Minimum Time to Make Rope Colorful
 */

// @lc code=start
/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
    let left = 0;
    let right = 0;
    let cost = 0;

    while (right < colors.length) {
        let sameColorRangeTimeSum = 0;
        let sameColorRangeMaxTime = -Infinity;
        while (right < colors.length && colors[left] === colors[right]) {
            sameColorRangeMaxTime = Math.max(
                sameColorRangeMaxTime,
                neededTime[right],
            );
            sameColorRangeTimeSum += neededTime[right];

            right++;
        }

        if (right > left + 1) {
            cost += sameColorRangeTimeSum - sameColorRangeMaxTime;
        }

        left = right;
    }

    return cost;
};
// @lc code=end

minCost('aabaa', [1, 2, 3, 4, 1]);
