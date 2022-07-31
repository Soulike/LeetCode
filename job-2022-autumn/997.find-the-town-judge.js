/*
 * @lc app=leetcode id=997 lang=javascript
 *
 * [997] Find the Town Judge
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
    if (trust.length < n - 1) {
        return -1;
    }

    /** @type {number[]} */
    const inDegrees = new Array(n);
    inDegrees.fill(0);

    /** @type {number[]} */
    const outDegrees = new Array(n);
    outDegrees.fill(0);

    for (const [from, to] of trust) {
        outDegrees[from - 1]++;
        inDegrees[to - 1]++;
    }

    for (let i = 0; i < n; i++) {
        if (outDegrees[i] === 0 && inDegrees[i] === n - 1) {
            return i + 1;
        }
    }

    return -1;
};
// @lc code=end
