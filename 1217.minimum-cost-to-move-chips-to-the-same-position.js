/*
 * @lc app=leetcode id=1217 lang=javascript
 *
 * [1217] Minimum Cost to Move Chips to The Same Position
 */

// @lc code=start
/**
 * @param {number[]} position
 * @return {number}
 */
const minCostToMoveChips = function (position)
{
    const positionToCoinCount = new Map();
    for (const coinPosition of position)
    {
        positionToCoinCount.set(coinPosition,
            (positionToCoinCount.get(coinPosition) ?? 0) + 1);
    }

    const positions = [...positionToCoinCount.keys()];

    let minCost = Number.POSITIVE_INFINITY;
    for (const moveToPosition of positions)
    {
        let currentMoveCost = 0;
        for (const moveFromPosition of positions)
        {
            currentMoveCost += Math.abs(moveFromPosition - moveToPosition) % 2 * positionToCoinCount.get(moveFromPosition);
        }
        minCost = Math.min(minCost, currentMoveCost);
    }

    return minCost;
};
// @lc code=end