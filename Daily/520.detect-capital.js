/*
 * @lc app=leetcode id=520 lang=javascript
 *
 * [520] Detect Capital
 */

// @lc code=start
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
    let capitalNum = 0;
    for (const c of word) {
        if (isCapital(c)) capitalNum++;
    }

    if (capitalNum === 1) {
        return isCapital(word[0]);
    } else {
        return capitalNum === 0 || capitalNum === word.length;
    }
};

/**
 * @param {string} letter
 * @returns {boolean}
 */
function isCapital(letter) {
    return letter.toUpperCase() === letter;
}
// @lc code=end
