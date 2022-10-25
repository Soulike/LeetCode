/*
 * @lc app=leetcode id=1662 lang=javascript
 *
 * [1662] Check If Two String Arrays are Equivalent
 */

// @lc code=start
/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function (word1, word2) {
    let word1Index = 0;
    let word1LetterIndex = 0;

    let word2Index = 0;
    let word2LetterIndex = 0;

    while (word1Index < word1.length && word2Index < word2.length) {
        if (
            word1[word1Index][word1LetterIndex] !==
            word2[word2Index][word2LetterIndex]
        ) {
            return false;
        } else {
            if (word1LetterIndex === word1[word1Index].length - 1) {
                word1Index++;
                word1LetterIndex = 0;
            } else {
                word1LetterIndex++;
            }

            if (word2LetterIndex === word2[word2Index].length - 1) {
                word2Index++;
                word2LetterIndex = 0;
            } else {
                word2LetterIndex++;
            }
        }
    }

    return word1Index === word1.length && word2Index === word2.length;
};
// @lc code=end
