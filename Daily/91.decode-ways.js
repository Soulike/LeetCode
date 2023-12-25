/*
 * @lc app=leetcode id=91 lang=javascript
 *
 * [91] Decode Ways
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    /** @type {Map<number, number>} */
    const memo = new Map();
    /**
     * @param {number} startIndex
     * @returns {number}
     */
    const getDecodingNum = (startIndex) => {
        if (memo.has(startIndex)) return memo.get(startIndex);

        let decodeWays = 0;
        if (startIndex === s.length) {
            decodeWays++;
            memo.set(startIndex, decodeWays);
            return decodeWays;
        }

        const firstOneNumber = Number.parseInt(s[startIndex]);
        if (firstOneNumber === 0) {
            memo.set(startIndex, decodeWays);
            return decodeWays;
        }
        decodeWays += getDecodingNum(startIndex + 1);

        if (startIndex + 1 >= s.length) {
            memo.set(startIndex, decodeWays);
            return decodeWays;
        }
        const firstTwoNumbers = Number.parseInt(
            s.slice(startIndex, startIndex + 2),
        );
        if (firstTwoNumbers > 26) {
            memo.set(startIndex, decodeWays);
            return decodeWays;
        }
        decodeWays += getDecodingNum(startIndex + 2);

        memo.set(startIndex, decodeWays);
        return decodeWays;
    };

    const decodeWays = getDecodingNum(0);
    return decodeWays;
};
// @lc code=end

numDecodings('111111111111111111111111111111111111111111111');
