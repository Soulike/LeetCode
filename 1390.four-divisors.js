/*
 * @lc app=leetcode id=1390 lang=javascript
 *
 * [1390] Four Divisors
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumFourDivisors = function (nums)
{
    /** @type {Map<number, number>} */
    const divisorSumCache = new Map();
    /**
     * @param {number} num 
     * @returns {number} - 如果不是正好有 4 个因子，返回 0
     */
    function getDivisorSum(num)
    {
        if (divisorSumCache.has(num))
        {
            return divisorSumCache.get(num);
        }

        const sumSqrt = Math.floor(Math.sqrt(num));
        let divisorCount = 0;
        let divisorSum = 0;
        for (let i = 1; i <= sumSqrt; i++)
        {
            const divisor2 = num / i;
            if (Number.isInteger(divisor2))
            {
                divisorCount++;
                divisorSum += i;

                if (divisor2 !== i)
                {
                    divisorCount++;
                    divisorSum += divisor2;
                }

                if (divisorCount > 4)
                {
                    divisorSumCache.set(num, 0);
                    return 0;
                }
            }
        }

        const result = divisorCount === 4 ? divisorSum : 0;
        divisorSumCache.set(num, result);
        return result;
    }

    let sum = 0;

    for (const num of nums)
    {
        sum += getDivisorSum(num);
    }

    return sum;
};
// @lc code=end