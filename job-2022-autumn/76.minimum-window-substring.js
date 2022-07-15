/*
 * @lc app=leetcode id=76 lang=javascript
 *
 * [76] Minimum Window Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    if (t.length > s.length) return '';

    const letterToLeftCount = {};
    for (const c of t) {
        letterToLeftCount[c] = (letterToLeftCount[c] ?? 0) + 1;
    }

    let minLength = Infinity;
    let minLengthRange = [0, 0];

    let leftLetterCount = t.length;

    let left = 0;
    let right = 1;

    if (letterToLeftCount[s[left]] !== undefined) {
        letterToLeftCount[s[left]]--;
        leftLetterCount--;
    }

    while (true) {
        if (leftLetterCount > 0) {
            if (right === s.length) break;

            if (letterToLeftCount[s[right]] !== undefined) {
                if (letterToLeftCount[s[right]] > 0) {
                    leftLetterCount--;
                }
                letterToLeftCount[s[right]]--;
            }
            right++;
        } else if (leftLetterCount < 0) {
            left++;
            if (letterToLeftCount[s[left - 1]] !== undefined) {
                if (letterToLeftCount[s[left - 1]] >= 0) {
                    leftLetterCount++;
                }
                letterToLeftCount[s[left - 1]]++;
            }
        } else {
            if (right - left < minLength) {
                minLength = right - left;
                minLengthRange = [left, right];
            }

            left++;
            if (letterToLeftCount[s[left - 1]] !== undefined) {
                if (letterToLeftCount[s[left - 1]] >= 0) {
                    leftLetterCount++;
                }
                letterToLeftCount[s[left - 1]]++;
            }
        }
    }

    return s.slice(...minLengthRange);
};
// @lc code=end
