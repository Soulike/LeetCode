/*
 * @lc app=leetcode id=712 lang=javascript
 *
 * [712] Minimum ASCII Delete Sum for Two Strings
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
    /**
     * @type {Map<string, number>}
     */
    const memo = new Map();
    /**
     * lowest ASCII deletion sum of s1[i:] and s2[j:]
     * @param {number} i
     * @param {number} j
     * @return {number}
     */
    const dp = (i, j) => {
        /**
         * @param {string} str
         * @param {number} start
         * @param {number} end
         * @returns {number}
         */
        const asciiSum = (str, start, end) => {
            let sum = 0;
            for (let i = start; i <= end; i++) {
                const c = str[i];
                sum += c.charCodeAt(0);
            }
            return sum;
        };

        if (i === s1.length) {
            return asciiSum(s2, j, s2.length - 1);
        }
        if (j === s2.length) {
            return asciiSum(s1, i, s1.length - 1);
        }

        const memoKey = `${i}-${j}`;

        if (memo.has(memoKey)) {
            return memo.get(memoKey);
        }

        let result;

        if (s1[i] === s2[j]) {
            result = dp(i + 1, j + 1);
        } else {
            result = Math.min(
                s1.charCodeAt(i) + dp(i + 1, j),
                s2.charCodeAt(j) + dp(i, j + 1),
            );
        }

        memo.set(memoKey, result);
        return result;
    };

    return dp(0, 0);
};
// @lc code=end
