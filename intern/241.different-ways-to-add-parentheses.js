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
    const nums = [];
    const operators = [];

    /**
     * 解析算式。
     * 2*3-4*5将被解析为
     * nums = [2,3,4,5]
     * operators = [*,-,*,null]
     */
    function parse() {
        let currentNum = 0;
        for (const char of expression) {
            if (char === '+' || char === '-' || char === '*') {
                nums.push(currentNum);
                currentNum = 0;
                operators.push(char);
            } else {
                currentNum *= 10;
                currentNum += Number.parseInt(char);
            }
        }
        nums.push(currentNum);
        operators.push(null);
    }

    const cache = new Map();
    /**
     * 返回在范围内算式的所有优先级计算结果
     * @param {number} left
     * @param {number} right
     * @returns {number[]}
     */
    function helper(left, right) {
        const cacheKey = `${left}-${right}`;
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        if (left === right) {
            return [nums[left]];
        }
        if (left === right - 1) {
            return [calculate(nums[left], nums[right], operators[left])];
        }

        const results = [];
        // left < right - 1
        for (let i = left; i < right; i++) {
            const leftResults = helper(left, i);
            const rightResults = helper(i + 1, right);
            const operator = operators[i];
            for (const leftResult of leftResults) {
                for (const rightResult of rightResults) {
                    results.push(calculate(leftResult, rightResult, operator));
                }
            }
        }

        cache.set(cacheKey, results);
        return results;
    }

    parse();
    const result = helper(0, nums.length - 1);
    return result;
};

function calculate(num1, num2, operator) {
    switch (operator) {
        case '+': {
            return num1 + num2;
        }
        case '-': {
            return num1 - num2;
        }
        case '*': {
            return num1 * num2;
        }
    }
}
// @lc code=end
