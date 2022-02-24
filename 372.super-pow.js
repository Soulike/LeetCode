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

    if (b.length === 1)
    {
        return pow(a, b[0]);
    }
    else
    {
        const n = b.pop();
        return (pow(a, n)
            * pow(
                superPow(a, b),
                10)) % 1337;
    }
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