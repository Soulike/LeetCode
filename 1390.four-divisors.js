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

        let divisorCount = 0;
        let divisorSum = num + 1;
        for (let i = 2; i < num; i++)
        {
            if (num % i === 0)
            {
                divisorCount++;
                divisorSum += i;
                if (divisorCount > 2)
                {
                    divisorSumCache.set(num, 0);
                    return 0;
                }
            }
        }

        const result = divisorCount === 2 ? divisorSum : 0;
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

