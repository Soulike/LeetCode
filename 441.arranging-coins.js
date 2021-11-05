/*
 * @lc app=leetcode id=441 lang=javascript
 *
 * [441] Arranging Coins
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const arrangeCoins = function (n)
{
    let stairCount = 0;
    let coinsLeftCount = n;
    for (let i = 1; ; i++)
    {
        coinsLeftCount -= i;
        if (coinsLeftCount >= 0)
        {
            stairCount++;
        }
        else
        {
            break;
        }
    }
    return stairCount;
};
// @lc code=end

