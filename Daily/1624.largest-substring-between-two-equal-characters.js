/*
 * @lc app=leetcode id=1624 lang=javascript
 *
 * [1624] Largest Substring Between Two Equal Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function (s) {
    /** @type {Map<string, number>} */
    const letterMins = new Map();
    let maxLength = -1;

    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        let letterMin = letterMins.get(letter);
        if (letterMin === undefined) {
            letterMin = i;
            letterMins.set(letter, letterMin);
        }

        maxLength = Math.max(maxLength, i - letterMin - 1);
    }

    return maxLength;
};
// @lc code=end
