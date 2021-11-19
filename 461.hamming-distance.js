/*
 * @lc app=leetcode id=461 lang=javascript
 *
 * [461] Hamming Distance
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const hammingDistance = function (x, y)
{
    let distance = 0;
    const xorResult = (x ^ y).toString(2);
    for (const bit of xorResult)
    {
        if (bit === '1')
        {
            distance++;
        }
    }
    return distance;
};
// @lc code=end

