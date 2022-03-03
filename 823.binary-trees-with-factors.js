/*
 * @lc app=leetcode id=823 lang=javascript
 *
 * [823] Binary Trees With Factors
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
const numFactoredBinaryTrees = function (arr)
{
    const MOD = 10 ** 9 + 7;
    const set = new Set(arr);

    const cache = new Map();
    /**
     * 以 rootNum 为根，能组成多少要求的二叉树
     * @param {number} rootNum 
     */
    function helper(rootNum)
    {
        if (cache.has(rootNum))
        {
            return cache.get(rootNum);
        }
        let result = 1;
        for (const num of arr)
        {
            const num2 = rootNum / num;
            if (Number.isInteger(num2)
                && set.has(num2))
            {
                result += helper(num) * helper(num2);
            }
        }

        cache.set(rootNum, result);
        return result;
    }

    let result = 0;
    for (const num of arr)
    {
        result += helper(num);
    }
    return result % MOD;
};
// @lc code=end