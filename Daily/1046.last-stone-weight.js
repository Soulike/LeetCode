/*
 * @lc app=leetcode id=1046 lang=javascript
 *
 * [1046] Last Stone Weight
 */

// @lc code=start

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
    stones.sort((a, b) => a - b);

    while (stones.length > 1) {
        const stoneA = stones.pop();
        const stoneB = stones.pop();
        if (stoneA !== stoneB) {
            stones.push(stoneA - stoneB);
        }

        stones.sort((a, b) => a - b);
    }

    return stones.length === 0 ? 0 : stones[0];
};
// @lc code=end
