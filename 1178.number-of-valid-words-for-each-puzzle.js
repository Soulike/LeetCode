/*
 * @lc app=leetcode id=1178 lang=javascript
 *
 * [1178] Number of Valid Words for Each Puzzle
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
const findNumOfValidWords = function (words, puzzles)
{
    const letterToMask = new Map();
    const aCharCode = 'a'.charCodeAt(0);
    for (let i = 0; i < 26; i++)
    {
        letterToMask.set(String.fromCharCode(aCharCode + i), 1 << i);
    }
    const wordsMask = words.map(word =>
    {
        let mask = 0;
        for (const letter of word)
        {
            mask |= letterToMask.get(letter);
        }
        return mask;
    });
    const puzzlesMaskInfo = puzzles.map(puzzle =>
    {
        let mask = 0;
        for (const letter of puzzle)
        {
            mask |= letterToMask.get(letter);
        }
        return {
            mask,
            requiredMask: letterToMask.get(puzzle[0])
        };
    });

    return puzzlesMaskInfo.map(({mask, requiredMask}) =>
    {
        let count = 0;
        for (const wordMask of wordsMask)
        {
            if ((requiredMask & wordMask) !== 0 && (wordMask & mask) === wordMask)
            {
                count++;
            }
        }
        return count;
    });
};
// @lc code=end