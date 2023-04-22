/*
 * @lc app=leetcode id=1312 lang=javascript
 *
 * [1312] Minimum Insertion Steps to Make a String Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
    /** @type {Map<string, number>} */
    const memo = new Map();
    /**
     * @param {number} left
     * @param {number} right
     * @returns {number}
     */
    const getMinInsertions = (left, right) => {
        while (left < right && s[left] === s[right]) {
            left++;
            right--;
        }

        if (left >= right) return 0;

        const memoKey = `${left}-${right}`;
        if (memo.has(memoKey)) return memo.get(memoKey);

        const minSteps =
            1 +
            Math.min(
                getMinInsertions(left + 1, right),
                getMinInsertions(left, right - 1),
            );

        memo.set(memoKey, minSteps);

        return minSteps;
    };

    const result = getMinInsertions(0, s.length - 1);
    return result;
};
// @lc code=end

minInsertions('leetcode');
