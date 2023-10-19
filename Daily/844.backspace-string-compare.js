/*
 * @lc app=leetcode id=844 lang=javascript
 *
 * [844] Backspace String Compare
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
    const BACKSPACE = '#';

    let sSkip = 0;
    let tSkip = 0;

    let sIndex = s.length - 1;
    let tIndex = t.length - 1;

    while (sIndex >= 0 || tIndex >= 0) {
        if (s[sIndex] === BACKSPACE || t[tIndex] === BACKSPACE) {
            while (s[sIndex] === BACKSPACE) {
                sSkip++;
                sIndex--;
            }
            while (t[tIndex] === BACKSPACE) {
                tSkip++;
                tIndex--;
            }
        } else if (sSkip > 0 || tSkip > 0) {
            if (sSkip > 0) {
                sIndex--;
                sSkip--;
            }
            if (tSkip > 0) {
                tIndex--;
                tSkip--;
            }
        } else {
            if (s[sIndex] !== t[tIndex]) return false;
            else {
                sIndex--;
                tIndex--;
            }
        }
    }

    return true;
};
// @lc code=end

backspaceCompare('a##c', '#a#c');
