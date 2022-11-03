/*
 * @lc app=leetcode id=2131 lang=javascript
 *
 * [2131] Longest Palindrome by Concatenating Two Letter Words
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
var longestPalindrome = function (words) {
    let length = 0;
    /** @type {Map<string, number>} */
    const wordToCount = new Map();
    for (const word of words) {
        wordToCount.set(word, (wordToCount.get(word) ?? 0) + 1);
    }

    const wordSet = new Set(words);

    for (const word of wordSet) {
        const wordCount = wordToCount.get(word) ?? 0;
        if (word[0] === word[1]) {
            const pairCount = Math.floor(wordCount / 2);
            length += pairCount * 4;
            wordToCount.set(word, wordCount - pairCount * 2);
        } else if (wordCount > 0) {
            const reversedWord = `${word[1]}${word[0]}`;
            const reversedWordCount = wordToCount.get(reversedWord) ?? 0;

            const reducedWordCount = Math.min(wordCount, reversedWordCount);
            length += 4 * reducedWordCount;
            wordToCount.set(word, wordCount - reducedWordCount);
            wordToCount.set(reversedWord, reversedWordCount - reducedWordCount);
        }
        if (wordToCount.get(word) === 0) {
            wordToCount.delete(word);
        }
    }

    for (const [word, count] of wordToCount) {
        if (word[0] === word[1] && count > 0) {
            length += 2;
            break;
        }
    }

    return length;
};
// @lc code=end
