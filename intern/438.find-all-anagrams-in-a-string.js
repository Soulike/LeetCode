/*
 * @lc app=leetcode id=438 lang=javascript
 *
 * [438] Find All Anagrams in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = function (s, p) {
    const letterToAmount = new Map();

    for (const letter of p) {
        letterToAmount.set(letter, (letterToAmount.get(letter) ?? 0) + 1);
    }

    let result = [];

    let usedLetterCount = 0;

    let left = 0;
    for (let right = 0; right < s.length; right++) {
        const rightLetter = s[right];
        const rightLetterAmount = letterToAmount.get(rightLetter);
        if (rightLetterAmount !== undefined) {
            letterToAmount.set(rightLetter, rightLetterAmount - 1);
            if (rightLetterAmount - 1 >= 0) {
                usedLetterCount++;
            }
        }

        while (usedLetterCount === p.length) {
            if (right - left + 1 === p.length) {
                result.push(left);
            }
            const leftLetter = s[left];
            const leftLetterAmount = letterToAmount.get(leftLetter);
            if (leftLetterAmount !== undefined) {
                letterToAmount.set(leftLetter, leftLetterAmount + 1);
                if (leftLetterAmount + 1 > 0) {
                    usedLetterCount--;
                }
            }
            left++;
        }
    }

    return result;
};
// @lc code=end
