/*
 * @lc app=leetcode id=372 lang=javascript
 *
 * [372] Super Pow
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
var superPow = function (a, b)
{
    if (a === 1)
    {
        return 1;
    }

    function helper(bLeft, bRight)
    {
        if (bRight - bLeft + 1 === 1)
        {
            return pow(a, b[bLeft]);
        }

        return (pow(helper(bLeft, bRight - 1), 10) * pow(a, b[bRight])) % 1337;
    }

    return helper(0, b.length - 1);
};

/**
 * 计算 (a**n)%1337
 * @param {number} a 
 * @param {number} n 
 */
function pow(a, n)
{
    if (n === 0)
    {
        return 1;
    }
    a %= 1337;

    if (n === 1)
    {
        return a;
    }

    if (n % 2)
    {
        return (a * pow(a, n - 1)) % 1337;
    }
    else
    {
        return (pow(a, n / 2) ** 2) % 1337;
    }
}
// @lc code=end

console.log(superPow(2, [1, 0, 0]));