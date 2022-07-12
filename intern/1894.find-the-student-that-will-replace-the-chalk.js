/*
 * @lc app=leetcode id=1894 lang=javascript
 *
 * [1894] Find the Student that Will Replace the Chalk
 */

// @lc code=start
/**
 * @param {number[]} chalk
 * @param {number} k
 * @return {number}
 */
const chalkReplacer = function (chalk, k) {
    const chalkSum = chalk.reduce((prev, current) => prev + current);
    k = k % chalkSum;

    const STUDENT_AMOUNT = chalk.length;
    for (let i = 0; i < STUDENT_AMOUNT; i++) {
        k -= chalk[i];
        if (k < 0) {
            return i;
        }
    }
};
// @lc code=end
