/*
 * @lc app=leetcode id=438 lang=javascript
 *
 * [438] Find All Anagrams in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = function (s, p) 
{
    const result = [];
    const letterToNumber = new Map();
    for (const char of p)
    {
        letterToNumber.set(char,
            letterToNumber.get(char)
                ? letterToNumber.get(char) + 1
                : 1);
    }

    let left = 0;
    let right = p.length;
    for (let i = left; i < right; i++)
    {
        const letterNumber = letterToNumber.get(s.charAt(i));
        if (letterNumber !== undefined)
        {
            letterToNumber.set(s.charAt(i), letterNumber - 1);
        }
    }
    if (isAllZeros(letterToNumber.values()))
    {
        result.push(left);
    }
    left++;
    right++;

    let beforeLeftChar = '';
    let newRightChar = '';

    for (; right <= s.length; left++, right++)
    {
        beforeLeftChar = s.charAt(left - 1);
        newRightChar = s.charAt(right - 1);
        if (letterToNumber.has(beforeLeftChar))
        {
            letterToNumber.set(beforeLeftChar, letterToNumber.get(beforeLeftChar) + 1);
        }

        if (letterToNumber.has(newRightChar))
        {
            letterToNumber.set(newRightChar, letterToNumber.get(newRightChar) - 1);
        }
        else
        {
            continue;
        }

        if (isAllZeros(letterToNumber.values()))
        {
            result.push(left);
        }
    }
    return result;
};

/**
 * @param {Iterable} iterable 
 */
function isAllZeros(iterable)
{
    for (const element of iterable)
    {
        if (element !== 0)
        {
            return false;
        }
    }
    return true;
}
// @lc code=end