/*
 * @lc app=leetcode id=77 lang=javascript
 *
 * [77] Combinations
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    /** @type {number[][]} */
    const combinations = [];
    /** @type {number[]} */
    const currentCombination = [];

    /**
     * @param {number} startNumber
     * @returns {void}
     */
    const backtrack = (startNumber) => {
        currentCombination.push(startNumber);

        if (currentCombination.length === k) {
            combinations.push(Array.from(currentCombination));
        } else {
            for (let i = startNumber + 1; i <= n; i++) {
                backtrack(i);
            }
        }

        currentCombination.pop();
    };

    for (let i = 1; i <= n; i++) {
        backtrack(i);
    }

    return combinations;
};
// @lc code=end
