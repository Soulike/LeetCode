/*
 * @lc app=leetcode id=467 lang=javascript
 *
 * [467] Unique Substrings in Wraparound String
 */

// @lc code=start
/**
 * @param {string} p
 * @return {number}
 */
const findSubstringInWraproundString = function (p) {
    const aCharCode = 'a'.charCodeAt(0);
    function getLetterIndex(char) {
        return char.charCodeAt(0) - aCharCode;
    }

    const endsWithLetterLength = new Array(26);

    /** 当前连续合法子序列的长度 */
    let maxLength = 0;
    for (let i = 0; i < p.length; i++) {
        const charCodeDiff = p.charCodeAt(i - 1) - p.charCodeAt(i);
        if (i > 0 && (charCodeDiff === -1 || charCodeDiff === 25)) {
            maxLength++;
        } else {
            maxLength = 1;
        }

        const letterIndex = getLetterIndex(p[i]);
        endsWithLetterLength[letterIndex] = Math.max(
            endsWithLetterLength[letterIndex] ?? 0,
            maxLength,
        );
    }

    return endsWithLetterLength.reduce((prev, curr) => prev + curr);
};
// @lc code=end
