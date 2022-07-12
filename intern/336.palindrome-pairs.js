/*
 * @lc app=leetcode id=336 lang=javascript
 *
 * [336] Palindrome Pairs
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function (words) {
    const wordToIndex = new Map();

    for (let i = 0; i < words.length; i++) {
        wordToIndex.set(words[i], i);
    }

    /** @type {number[][]} */
    const result = [];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (word.length > 0) {
            // 查看自身的反转是否存在
            const reversedWord = getReversedWord(word);
            const reversedWordIndex = wordToIndex.get(reversedWord);

            if (reversedWordIndex !== undefined && reversedWordIndex !== i) {
                result.push([i, reversedWordIndex]);
            }

            for (let j = 1; j <= word.length - 1; j++) {
                // 后半段 [j:] 是回文，看看反转前半段 [0:j-1] 存不存在
                if (isPalindrome(word, j, word.length - 1)) {
                    const reversedPartialWord = reversedWord.slice(-j);
                    const reversedPartialWordIndex =
                        wordToIndex.get(reversedPartialWord);

                    if (reversedPartialWordIndex !== undefined) {
                        result.push([i, reversedPartialWordIndex]);
                    }
                }

                // 前半段 [0:j-1] 是回文，看看反转后半段 [j:] 存不存在
                if (isPalindrome(word, 0, j - 1)) {
                    const reversedPartialWord = reversedWord.slice(0, -j);

                    const reversedPartialWordIndex =
                        wordToIndex.get(reversedPartialWord);

                    if (reversedPartialWordIndex !== undefined) {
                        result.push([reversedPartialWordIndex, i]);
                    }
                }
            }
        }
        // 空串，和任何回文串可以
        else {
            for (let j = 0; j < words.length; j++) {
                if (i !== j && isPalindrome(words[j], 0, words[j].length - 1)) {
                    result.push([i, j]);
                    result.push([j, i]);
                }
            }
        }
    }

    return result;
};

/**
 *
 * @param {string} word
 * @returns {string}
 */
function getReversedWord(word) {
    const result = new Array(word.length);
    for (let i = word.length - 1; i >= 0; i--) {
        result[word.length - i - 1] = word[i];
    }
    return result.join('');
}

/**
 *
 * @param {string} word
 * @param {number} left
 * @param {number} right
 * @returns {boolean}
 */
function isPalindrome(word, left, right) {
    let l = left;
    let r = right;

    while (l < r) {
        if (word[l] !== word[r]) {
            return false;
        }
        l++;
        r--;
    }

    return true;
}
// @lc code=end

palindromePairs(['abcd', 'dcba', 'lls', 's', 'sssll']);
