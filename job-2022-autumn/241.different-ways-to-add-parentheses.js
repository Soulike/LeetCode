/*
 * @lc app=leetcode id=241 lang=javascript
 *
 * [241] Different Ways to Add Parentheses
 */

// @lc code=start
/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
    const memo = {};

    /**
     * @param {string} expression
     * @return {number[]}
     */
    const helper = (expression) => {
        if (expression.length <= 2) {
            return [Number.parseInt(expression)];
        }

        if (memo[expression] !== undefined) return memo[expression];

        /** @type {Array<number>} */
        const results = [];

        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === '+') {
                const leftResults = diffWaysToCompute(expression.slice(0, i));
                const rightResults = diffWaysToCompute(expression.slice(i + 1));

                for (const leftResult of leftResults) {
                    for (const rightResult of rightResults) {
                        results.push(leftResult + rightResult);
                    }
                }
            } else if (expression[i] === '-') {
                const leftResults = diffWaysToCompute(expression.slice(0, i));
                const rightResults = diffWaysToCompute(expression.slice(i + 1));

                for (const leftResult of leftResults) {
                    for (const rightResult of rightResults) {
                        results.push(leftResult - rightResult);
                    }
                }
            } else if (expression[i] === '*') {
                const leftResults = diffWaysToCompute(expression.slice(0, i));
                const rightResults = diffWaysToCompute(expression.slice(i + 1));

                for (const leftResult of leftResults) {
                    for (const rightResult of rightResults) {
                        results.push(leftResult * rightResult);
                    }
                }
            }
        }

        memo[expression] = results;

        return results;
    };

    return helper(expression);
};
// @lc code=end
