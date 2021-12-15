/*
 * @lc app=leetcode id=1780 lang=javascript
 *
 * [1780] Check if Number is a Sum of Powers of Three
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
const checkPowersOfThree = function (n)
{
    let nLeft = n;
    while (nLeft > 0)
    {
        if (nLeft % 3 === 2)
        {
            return false;
        }
        if (nLeft % 3 === 0)
        {
            nLeft /= 3;
        }
        else
        {
            nLeft--;
        }
    }
    return true;
};
// @lc code=end