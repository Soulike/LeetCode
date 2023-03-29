/*
 * @lc app=leetcode id=1402 lang=javascript
 *
 * [1402] Reducing Dishes
 */

// @lc code=start
/**
 * @param {number[]} satisfaction
 * @return {number}
 */
var maxSatisfaction = function (satisfaction) {
    satisfaction.sort((a, b) => a - b);
    if (satisfaction[satisfaction.length - 1] <= 0) return 0;

    /**
     * @type {number[]}
     * sum of satisfaction[i] to satisfaction[satisfaction.length - 1]
     */
    const postfixSum = new Array(satisfaction.length - 1);
    postfixSum[satisfaction.length - 1] = satisfaction[satisfaction.length - 1];

    for (let i = satisfaction.length - 2; i >= 0; i--) {
        postfixSum[i] = postfixSum[i + 1] + satisfaction[i];
    }

    let currentCoefficient = satisfaction[satisfaction.length - 1];
    let maxCoefficient = currentCoefficient;

    for (let i = satisfaction.length - 2; i >= 0; i--) {
        currentCoefficient =
            currentCoefficient + postfixSum[i + 1] + satisfaction[i];
        maxCoefficient = Math.max(currentCoefficient, maxCoefficient);
    }

    return maxCoefficient;
};
// @lc code=end
