/*
 * @lc app=leetcode id=127 lang=javascript
 *
 * [127] Word Ladder
 */

// @lc code=start
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList)
{
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord))
    {
        return 0;
    }
    let step = 0;
    let lastWordQueue = [beginWord];
    let wordQueue = [];
    while (lastWordQueue.length > 0)
    {
        step++;
        for (const currentWord of lastWordQueue)
        {
            for (const nextWord of wordList)
            {
                if (wordSet.has(nextWord)
                    && diffByOneLetter(nextWord, currentWord))
                {
                    if (nextWord === endWord)
                    {
                        return step + 1;
                    }
                    wordQueue.push(nextWord);
                    wordSet.delete(nextWord);
                }
            }
        }
        lastWordQueue = wordQueue;
        wordQueue = [];
    }
    return 0;
};

function diffByOneLetter(word1, word2)
{
    let diffCount = 0;
    for (let i = 0; i < word1.length; i++)
    {
        if (word1[i] !== word2[i])
        {
            diffCount++;
            if (diffCount > 1)
            {
                return false;
            }
        }
    }
    return diffCount === 1;
}
// @lc code=end