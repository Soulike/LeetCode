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
var findAnagrams = function (s, p) {
    if (p.length > s.length) return [];

    /** @type {number[]} */
    const result = [];

    let leftLetterCount = p.length;
    const letterToLeftCount = {};
    for (const letter of p) {
        letterToLeftCount[letter] = (letterToLeftCount[letter] ?? 0) + 1;
    }

    let left = 0;
    let right = left + p.length - 1;

    for (let i = left; i <= right; i++) {
        if (letterToLeftCount[s[i]] !== undefined) {
            if (letterToLeftCount[s[i]] > 0) {
                leftLetterCount--;
            }
            letterToLeftCount[s[i]]--;
        }
    }

    if (leftLetterCount === 0) {
        result.push(left);
    }

    while (right < s.length) {
        left++;
        right++;

        if (letterToLeftCount[s[left - 1]] !== undefined) {
            if (letterToLeftCount[s[left - 1]] >= 0) {
                leftLetterCount++;
            }
            letterToLeftCount[s[left - 1]]++;
        }

        if (letterToLeftCount[s[right]] !== undefined) {
            if (letterToLeftCount[s[right]] > 0) {
                leftLetterCount--;
            }
            letterToLeftCount[s[right]]--;
        }

        if (leftLetterCount === 0) {
            result.push(left);
        }
    }

    return result;
};
// @lc code=end
