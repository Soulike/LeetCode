/*
 * @lc app=leetcode id=383 lang=javascript
 *
 * [383] Ransom Note
 */

// @lc code=start
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    if (magazine.length < ransomNote.length) {
        return false;
    }

    /** @type {Map<string, number>} */
    const letterToCount = new Map();

    for (const c of magazine) {
        letterToCount.set(c, (letterToCount.get(c) ?? 0) + 1);
    }

    for (const c of ransomNote) {
        const count = letterToCount.get(c) ?? 0;

        if (count === 0) {
            return false;
        } else {
            letterToCount.set(c, count - 1);
        }
    }

    return true;
};
// @lc code=end
