/*
 * @lc app=leetcode id=1363 lang=javascript
 *
 * [1363] Largest Multiple of Three
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {string}
 */
var largestMultipleOfThree = function (digits)
{
    const remain1Digits = [];
    const remain2Digits = [];
    const remain0Digits = [];

    digits.sort((a, b) => b - a);

    const sum = digits.reduce((prev, curr) => prev + curr);

    for (const digit of digits)
    {
        if (digit % 3 === 2)
        {
            remain2Digits.push(digit);
        }
        else if (digit % 3 === 1)
        {
            remain1Digits.push(digit);
        }
        else
        {
            remain0Digits.push(digit);
        }
    }

    if (sum % 3 === 2)
    {
        if (remain2Digits.length >= 1)
        {
            remain2Digits.pop();
        }
        else if (remain1Digits.length >= 2)
        {
            remain1Digits.pop();
            remain1Digits.pop();
        }
        else
        {
            return '';
        }
    }
    else if (sum % 3 === 1)
    {
        if (remain1Digits.length >= 1)
        {
            remain1Digits.pop();
        }
        else if (remain2Digits.length >= 2)
        {
            remain2Digits.pop();
            remain2Digits.pop();
        }
        else
        {
            return '';
        }
    }
    else
    {
        if (digits[0] === 0)
        {
            return '0';
        }
        else
        {
            return digits.join('');
        }
    }

    const result = [...remain0Digits, ...remain1Digits, ...remain2Digits].sort((a, b) => b - a);
    if (result[0] === 0)
    {
        return '0';
    }
    else
    {
        return result.join('');
    }
};
// @lc code=end