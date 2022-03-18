/*
 * @lc app=leetcode id=1417 lang=javascript
 *
 * [1417] Reformat The String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reformat = function (s)
{
    const letters = [];
    const numbers = [];
    for (const c of s)
    {
        if (isDigitChar(c))
        {
            numbers.push(c);
        }
        else
        {
            letters.push(c);
        }
    }

    if (Math.abs(letters.length - numbers.length) > 1)
    {
        return '';
    }

    const result = [];
    const longer = letters.length > numbers.length ? letters : numbers;
    const shorter = letters.length <= numbers.length ? letters : numbers;
    let longerIndex = 0;
    let shorterIndex = 0;
    for (let i = 0; i < s.length; i++)
    {
        if (i % 2 === 0)
        {
            result.push(longer[longerIndex]);
            longerIndex++;
        }
        else
        {
            result.push(shorter[shorterIndex]);
            shorterIndex++;
        }
    }

    return result.join('');
};

function isDigitChar(c)
{
    return c.charCodeAt(0) >= '0'.charCodeAt(0)
        && c.charCodeAt(0) <= '9'.charCodeAt(0);
}
// @lc code=end