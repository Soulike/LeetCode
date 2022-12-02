/*
 * @lc app=leetcode id=1657 lang=javascript
 *
 * [1657] Determine if Two Strings Are Close
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
    if (word1.length !== word2.length) return false;

    /** @type {Map<string, number>} */
    const word1LetterFreq = new Map();
    /** @type {Map<string, number>} */
    const word2LetterFreq = new Map();

    for (const c of word1) {
        word1LetterFreq.set(c, (word1LetterFreq.get(c) ?? 0) + 1);
    }

    for (const c of word2) {
        if (!word1LetterFreq.has(c)) return false;

        word2LetterFreq.set(c, (word2LetterFreq.get(c) ?? 0) + 1);
    }

    for (const [c] of word1LetterFreq) {
        if (!word2LetterFreq.has(c)) return false;
    }

    const word1Freqs = [...word1LetterFreq.values()];
    const word2Freqs = [...word2LetterFreq.values()];

    if (word1Freqs.length !== word2Freqs.length) return false;

    word1Freqs.sort((a, b) => a - b);
    word2Freqs.sort((a, b) => a - b);

    for (let i = 0; i < word1Freqs.length; i++) {
        if (word1Freqs[i] !== word2Freqs[i]) return false;
    }

    return true;
};
// @lc code=end
