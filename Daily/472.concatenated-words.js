/*
 * @lc app=leetcode id=472 lang=javascript
 *
 * [472] Concatenated Words
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
    const dictionary = new Set(words);

    /** @type {Map<string, boolean>} */
    const memo = new Map();

    /**
     * @param {string} word
     * @returns {boolean}
     */
    const isConcatenatedWord = (word) => {
        /**
         * @param {number} start
         * @param {number} end
         * @returns {boolean}
         */
        const isConcatenatedWordPart = (start, end) => {
            const wordPart = word.slice(start, end + 1);
            if (memo.has(wordPart)) {
                return memo.get(wordPart);
            }

            if (dictionary.has(wordPart)) {
                memo.set(wordPart, true);
                return true;
            }

            for (let i = start; i < end; i++) {
                if (
                    isConcatenatedWordPart(start, i) &&
                    isConcatenatedWordPart(i + 1, end)
                ) {
                    memo.set(wordPart, true);
                    return true;
                }
            }

            memo.set(wordPart, false);
            return false;
        };

        for (let i = 0; i < word.length - 1; i++) {
            if (
                isConcatenatedWordPart(0, i) &&
                isConcatenatedWordPart(i + 1, word.length - 1)
            ) {
                return true;
            }
        }
    };

    /** @type {string[]} */
    const concatenatedWords = [];
    for (const word of words) {
        if (isConcatenatedWord(word)) {
            concatenatedWords.push(word);
        }
    }

    return concatenatedWords;
};
// @lc code=end

findAllConcatenatedWordsInADict([
    'cat',
    'cats',
    'catsdogcats',
    'dog',
    'dogcatsdog',
    'hippopotamuses',
    'rat',
    'ratcatdogcat',
]);
