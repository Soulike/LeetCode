/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 */

// @lc code=start

/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) 
{
    if (n === 0)
    {
        return [];
    }
    if (n === 1)
    {
        return ['()'];
    }
    /**@type {{parentheses: string, sum: number}[]} */
    let parenthesesToNumber = [
        { parentheses: '(', sum: -1 }
    ];
    const length = n * 2;
    let newParenthesesToNumber = [];
    for (let i = 1; i < length; i++)
    {
        /**@type {{parentheses: string, sum: number}[]} */
        newParenthesesToNumber = [];
        for (const { parentheses, sum } of parenthesesToNumber)
        {
            if (-sum < n)
            {
                newParenthesesToNumber.push({
                    parentheses: parentheses + '(',
                    sum: sum - 1
                });
            }
            if (sum + 1 <= 0)
            {
                newParenthesesToNumber.push({
                    parentheses: parentheses + ')',
                    sum: sum + 1
                });
            }
        }
        parenthesesToNumber = newParenthesesToNumber;
    }

    /**@type Array<string> */
    const result = [];

    for (const { parentheses, sum } of parenthesesToNumber)
    {
        if (sum === 0)
        {
            result.push(parentheses);
        }
    }

    return result;
};
// @lc code=end

