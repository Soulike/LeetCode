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
    let xorResult = (x ^ y);
    while (xorResult > 0)
    {
        distance += (xorResult & 0b1);
        xorResult = xorResult >>> 1;
    }
    return distance;
};
// @lc code=end

