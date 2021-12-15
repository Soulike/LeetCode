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
    const cache = new Map();
    return helper(n, 0, cache);
};

function helper(n, minExp, cache)
{
    const cached = cache.get(`${n}-${minExp}`);
    if (cached !== undefined)
    {
        return cached;
    }

    let result = false;
    for (let i = minExp; ; i++)
    {
        const threePower = 3 ** i;
        if (threePower === n)
        {
            result = true;
        }
        else if (threePower > n)
        {
            break;
        }
        else
        {
            result = helper(n - threePower, i + 1, cache);
            if (result)
            {
                break;
            }
        }
    }

    cache.set(`${n}-${minExp}`, result);
    return result;
}
// @lc code=end