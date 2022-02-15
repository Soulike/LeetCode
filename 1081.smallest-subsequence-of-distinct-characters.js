/*
 * @lc app=leetcode id=1081 lang=javascript
 *
 * [1081] Smallest Subsequence of Distinct Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function (s) 
{
    const monostack = [];

    const inStackLetters = new Set();
    const letterLeftCount = new Map();

    for (const letter of s)
    {
        letterLeftCount.set(letter, (letterLeftCount.get(letter) ?? 0) + 1);
    }

    for (const letter of s)
    {
        if (!inStackLetters.has(letter))
        {
            if (monostack.length !== 0)
            {
                let topLetter = monostack[monostack.length - 1];
                while (topLetter.charCodeAt(0) >= letter.charCodeAt(0))
                {
                    if (letterLeftCount.get(topLetter) > 0)
                    {
                        monostack.pop();
                        inStackLetters.delete(topLetter);
                        if (monostack.length === 0)
                        {
                            break;
                        }
                        topLetter = monostack[monostack.length - 1];
                    }
                    else
                    {
                        break;
                    }
                }

            }
            monostack.push(letter);
            inStackLetters.add(letter);
        }
        letterLeftCount.set(letter, letterLeftCount.get(letter) - 1);
    }

    return monostack.join('');
};
// @lc code=end