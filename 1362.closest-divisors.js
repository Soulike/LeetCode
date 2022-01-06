/*
 * @lc app=leetcode id=1362 lang=javascript
 *
 * [1362] Closest Divisors
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number[]}
 */
var closestDivisors = function (num)
{

    const num1 = num + 1;
    const num2 = num + 2;

    let num1Result = helper(num1);
    if (num1Result[0] === num1Result[1])
    {
        return num1Result;
    }
    let num2Result = helper(num2);
    return num1Result[1] - num1Result[0] < num2Result[1] - num2Result[0]
        ? num1Result
        : num2Result;
};

/** 
 * @param {number} num
 * @returns {[number, number]}
*/
function helper(num)
{
    let numSqrt = Math.floor(Math.sqrt(num));
    for (let i = numSqrt; i >= 1; i--)
    {
        if (num % i === 0)
        {
            return [i, num / i];
        }
    }
}
// @lc code=end

