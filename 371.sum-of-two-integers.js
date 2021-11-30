/*
 * @lc app=leetcode id=371 lang=javascript
 *
 * [371] Sum of Two Integers
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const getSum = function (a, b)
{
    let result = 0;
    let processNextBit = 0b0;   // 进位
    for (let i = 0; i < 32; i++)
    {
        const currentMask = 0b1 << i;

        const aMasked = (a & currentMask);
        const bMasked = (b & currentMask);

        if (((aMasked & bMasked) & (0b1 << i)) !== 0)
        {
            if (processNextBit === 0b1) // a b 进位 都是 1
            {
                processNextBit = 0b1;
                result = result | (0b1 << i);
            }
            else    // a b 都是 1，进位是 0
            {
                processNextBit = 0b1;
            }
        }
        else if (((aMasked | bMasked) & (0b1 << i)) !== 0)
        {
            if (processNextBit === 0b1) // a b 有一个 1，进位是 1
            {
                processNextBit = 0b1;
            }
            else    // a b 有一个 1，进位是 0
            {
                result = result | (0b1 << i);
                processNextBit = 0b0;
            }
        }
        else    // a 和 b 都是 0
        {
            result = result | (processNextBit << i);
            processNextBit = 0b0;
        }
    }
    return result;
};
// @lc code=end