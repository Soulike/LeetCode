/*
 * @lc app=leetcode id=8 lang=javascript
 *
 * [8] String to Integer (atoi)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s)
{
    s = s.trimStart();
    if (s.length === 0 ||
        s[0] !== '+' && s[0] !== '-' && !isIntegerChar(s[0]))
    {
        return 0;
    }

    const maxPositive = 2 ** 31 - 1;
    const maxNegative = 2 ** 31;

    let isPositive = false;
    let startIndex = 0;

    if (isIntegerChar(s[0]))
    {
        isPositive = true;
        startIndex = 0;
    }
    else
    {
        isPositive = s[0] === '+' ? true : false;
        startIndex = 1;
    }

    let result = 0;
    for (let i = startIndex; i < s.length; i++)
    {
        if (isIntegerChar(s[i]))
        {
            result *= 10;
            const num = charToInteger(s[i])
            if (isPositive)
            {
                if (maxPositive - result > num)
                {
                    result += charToInteger(s[i]);
                }
                else
                {
                    result = maxPositive;
                    break;
                }
            }
            else
            {
                if (maxNegative - result > num)
                {
                    result += charToInteger(s[i]);
                }
                else
                {
                    result = maxNegative;
                    break;
                }
            }
            
        }
        else
        {
            break;
        }
    }

    return isPositive ? result : -result;
};

function isIntegerChar(c)
{
    return c.charCodeAt(0) >= '0'.charCodeAt(0)
        && c.charCodeAt(0) <= '9'.charCodeAt(0);
}

function charToInteger(c)
{
    return c.charCodeAt(0) - '0'.charCodeAt(0);
}
// @lc code=end