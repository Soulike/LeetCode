/*
 * @lc app=leetcode id=476 lang=javascript
 *
 * [476] Number Complement
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
const findComplement = function (num)
{
    let mask = 1;
    for (let i = 0; i < 32; i++)
    {
        if (num >= mask)
        {
            mask *= 2;
        }
        else
        {
            mask--;
            break;
        }
    }
    return (~num) & mask;
};
// @lc code=end