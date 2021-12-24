/*
 * @lc app=leetcode id=76 lang=javascript
 *
 * [76] Minimum Window Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t)
{
    if (t.length > s.length)
    {
        return '';
    }
    if (t.length === 1)
    {
        return s.includes(t) ? t : '';
    }
    if (s.length === 1)
    {
        return s === t ? s : '';
    }

    const letterToAmount = new Map();
    for (const letter of t)
    {
        letterToAmount.set(letter,
            (letterToAmount.get(letter) ?? 0) + 1);
    }

    let usedLetterCount = 0;
    let left = 0;
    let minLength = Number.POSITIVE_INFINITY;
    let result = '';
    for (let right = 0; right < s.length; right++)
    {
        const letter = s[right];
        const letterAmount = letterToAmount.get(letter);
        if (letterAmount !== undefined)
        {
            letterToAmount.set(letter, letterAmount - 1);
            if (letterAmount - 1 >= 0)
            {
                usedLetterCount++;
            }
        }
        while (usedLetterCount === t.length)
        {
            if (right - left + 1 < minLength)
            {
                minLength = right - left + 1;
                result = s.slice(left, right + 1);
            }
            const leftLetter = s[left];
            const leftLetterAmount = letterToAmount.get(leftLetter);
            if (leftLetterAmount !== undefined)
            {
                letterToAmount.set(leftLetter, leftLetterAmount + 1);
                if (leftLetterAmount + 1 > 0)
                {
                    usedLetterCount--;
                }
            }
            left++;
        }
    }
    return result;
};
// @lc code=end