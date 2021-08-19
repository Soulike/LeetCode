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
        letterToNumber.set(char, letterToNumber.get(char) ? letterToNumber.get(char) + 1 : 1);
    }

    let left = 0;
    let right = p.length;
    const letterToNumberCopy = new Map(letterToNumber);
    for (let i = left; i < right; i++)
    {
        const letterNumber = letterToNumberCopy.get(s.charAt(i));
        if (letterNumber !== undefined)
        {
            letterToNumberCopy.set(s.charAt(i), letterNumber - 1);
        }
    }
    let found = true;
    for (const letterNumber of letterToNumberCopy.values())
    {
        if (letterNumber !== 0)
        {
            found = false;
            break;
        }
    }
    if (found)
    {
        result.push(left);
    }
    left++;
    right++;

    for (; right <= s.length; left++, right++)
    {
        if (letterToNumberCopy.has(s.charAt(left - 1)))
        {
            letterToNumberCopy.set(s.charAt(left - 1), letterToNumberCopy.get(s.charAt(left - 1)) + 1);
        }

        if (letterToNumberCopy.has(s.charAt(right - 1)))
        {
            letterToNumberCopy.set(s.charAt(right - 1), letterToNumberCopy.get(s.charAt(right - 1)) - 1);
        }
        else
        {
            continue;
        }

        let found = true;
        for (const letterNumber of letterToNumberCopy.values())
        {
            if (letterNumber !== 0)
            {
                found = false;
                break;
            }
        }
        if (found)
        {
            result.push(left);
        }
    }
    return result;
};
// @lc code=end

console.log(findAnagrams('ababababa', 'ab'));