/*
 * @lc app=leetcode id=916 lang=javascript
 *
 * [916] Word Subsets
 */

// @lc code=start
/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
var wordSubsets = function (words1, words2) {
    const words2LetterMaxFreq = new Map();

    // 统计在 words2 中，每个字母需求的最大数量
    for (let i = 0; i < words2.length; i++) {
        const letterToFreq = wordToLetterFreq(words2[i]);
        for (const [letter, freq] of letterToFreq) {
            words2LetterMaxFreq.set(
                letter,
                Math.max(words2LetterMaxFreq.get(letter) ?? 0, freq),
            );
        }
    }

    const isSubsetCache = new Map();
    function isSubset(wordFreq) {
        if (isSubsetCache.has(wordFreq)) {
            return isSubsetCache.get(wordFreq);
        }
        for (const [c, freq] of words2LetterMaxFreq) {
            if ((wordFreq.get(c) ?? 0) < freq) {
                isSubsetCache.set(wordFreq, false);
                return false;
            }
        }
        isSubsetCache.set(wordFreq, true);
        return true;
    }

    const result = [];

    for (let i = 0; i < words1.length; i++) {
        const isUniversal = isSubset(wordToLetterFreq(words1[i]));
        if (isUniversal) {
            result.push(words1[i]);
        }
    }

    return result;
};

const cache = new Map();
/**
 *
 * @param {string} word
 * @returns {Map<string, number>}
 */
function wordToLetterFreq(word) {
    if (cache.has(word)) {
        return cache.get(word);
    }
    const result = new Map();
    for (const c of word) {
        result.set(c, (result.get(c) ?? 0) + 1);
    }

    cache.set(word, result);
    return result;
}
// @lc code=end
