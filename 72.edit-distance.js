/*
 * @lc app=leetcode id=72 lang=javascript
 *
 * [72] Edit Distance
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = function (word1, word2)
{
    /** 
     * cache[word1Index][word2Index] = 最小编辑距离
     * @type {number[][]} */
    const cache = new Array(word1.length);
    for (let i = 0; i < word1.length; i++)
    {
        cache[i] = new Array(word2.length);
    }

    function dp(word1Index, word2Index)
    {
        if (word1Index === -1)
        {
            return word2Index + 1;
        }
        if (word2Index === -1)
        {
            return word1Index + 1;
        }
        if (cache[word1Index][word2Index] !== undefined)
        {
            return cache[word1Index][word2Index];
        }

        if (word1[word1Index] === word2[word2Index])
        {
            const result = dp(word1Index - 1, word2Index - 1);
            cache[word1Index][word2Index] = result;
            return result;
        }
        else
        {
            const result = 1 + Math.min(
                dp(word1Index, word2Index - 1), // 插入
                dp(word1Index - 1, word2Index), // 删除
                dp(word1Index - 1, word2Index - 1), // 修改
            );
            cache[word1Index][word2Index] = result;
            return result;
        }
    }

    return dp(word1.length - 1, word2.length - 1);
};
// @lc code=end

