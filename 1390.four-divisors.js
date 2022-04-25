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

        const sumSqrt = Math.sqrt(num);
        if (Number.isInteger(sumSqrt))
        {
            divisorSumCache.set(num, 0);
            return 0;
        }

        let found = false;
        let divisorSum = num + 1;
        // 只需要找到一对因子即可
        for (let i = 2; i < sumSqrt; i++)
        {
            const divisor2 = num / i;
            if (Number.isInteger(divisor2))
            {
                if (found)
                {
                    divisorSumCache.set(num, 0);
                    return 0;
                }

                found = true;
                divisorSum += i;
                divisorSum += divisor2;
            }
        }

        const result = found ? divisorSum : 0;
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

sumFourDivisors([21, 4, 7]);