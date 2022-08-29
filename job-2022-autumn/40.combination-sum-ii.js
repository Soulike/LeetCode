/*
 * @lc app=leetcode id=40 lang=javascript
 *
 * [40] Combination Sum II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    candidates.sort((a, b) => a - b);

    /** @type {number[][]} */
    const results = [];
    /** @type {number[]} */
    const currentResult = [];
    let currentSum = 0;

    /**
     * @param {number} startIndex
     */
    const backtrack = (startIndex) => {
        if (currentSum === target) {
            results.push([...currentResult]);
        } else if (currentSum + candidates[startIndex] > target) {
            return;
        } else {
            for (let i = startIndex; i < candidates.length; i++) {
                if (i === startIndex || candidates[i] !== candidates[i - 1]) {
                    currentResult.push(candidates[i]);
                    currentSum += candidates[i];
                    backtrack(i + 1);
                    currentSum -= candidates[i];
                    currentResult.pop();
                }
            }
        }
    };

    backtrack(0);

    return results;
};
// @lc code=end
