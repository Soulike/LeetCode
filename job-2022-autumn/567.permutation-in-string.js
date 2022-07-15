/*
 * @lc app=leetcode id=567 lang=javascript
 *
 * [567] Permutation in String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    if (s1.length > s2.length) return false;

    let leftLetterCount = s1.length;
    const letterToLeftCount = {};
    for (const letter of s1) {
        letterToLeftCount[letter] = (letterToLeftCount[letter] ?? 0) + 1;
    }

    let left = 0;
    let right = left + s1.length - 1;

    for (let i = left; i <= right; i++) {
        if (letterToLeftCount[s2[i]] !== undefined) {
            if (letterToLeftCount[s2[i]] > 0) {
                leftLetterCount--;
            }
            letterToLeftCount[s2[i]]--;
        }
    }

    if (leftLetterCount === 0) {
        return true;
    }

    while (right < s2.length) {
        left++;
        right++;

        if (letterToLeftCount[s2[left - 1]] !== undefined) {
            if (letterToLeftCount[s2[left - 1]] >= 0) {
                leftLetterCount++;
            }
            letterToLeftCount[s2[left - 1]]++;
        }

        if (letterToLeftCount[s2[right]] !== undefined) {
            if (letterToLeftCount[s2[right]] > 0) {
                leftLetterCount--;
            }
            letterToLeftCount[s2[right]]--;
        }

        if (leftLetterCount === 0) {
            return true;
        }
    }

    return false;
};
// @lc code=end
