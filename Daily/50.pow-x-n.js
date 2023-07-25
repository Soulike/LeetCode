/*
 * @lc app=leetcode id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    /** @type {{[key: string]: number}} */
    const memo = {};
    /**
     * @param {number} x
     * @param {number} n
     * @returns {number}
     */
    const helper = (x, n) => {
        if (n === 0) return 1;
        if (n === 1) return x;
        if (n === -1) return 1 / x;

        const memoKey = `${x}-${n}`;
        if (memo[memoKey] !== undefined) {
            return memo[memoKey];
        }

        const halfN = Math.floor(n / 2);

        const result = helper(x, halfN) * helper(x, n - halfN);
        memo[memoKey] = result;
        return result;
    };

    return helper(x, n);
};
// @lc code=end

console.log(myPow(2.1, 3));
