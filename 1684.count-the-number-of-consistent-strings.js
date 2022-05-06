/*
 * @lc app=leetcode id=1684 lang=javascript
 *
 * [1684] Count the Number of Consistent Strings
 */

// @lc code=start
/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (allowed, words)
{
    const allowedSet = new Set(allowed);
    let count = 0;
    OUT:
    for (const word of words)
    {
        for (const letter of word)
        {
            if (!allowedSet.has(letter))
            {
                continue OUT;
            }
        }
        count++;
    }

    return count;
};
// @lc code=end

