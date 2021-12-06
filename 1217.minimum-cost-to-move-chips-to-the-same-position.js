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
    let oddCoinCount = 0;
    let evenCoinCount = 0;
    for (const pos of position)
    {
        if (pos % 2)
        {
            oddCoinCount++;
        }
        else
        {
            evenCoinCount++;
        }
    }
    return Math.min(oddCoinCount, evenCoinCount);
};
// @lc code=end