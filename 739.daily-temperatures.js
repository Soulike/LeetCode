/*
 * @lc app=leetcode id=739 lang=javascript
 *
 * [739] Daily Temperatures
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
const dailyTemperatures = function (temperatures) 
{
    const LENGTH = temperatures.length;
    /** @type {number[]} */
    const stack = [];
    const output = new Array(LENGTH);
    output.fill(0);
    for (let i = 0; i < LENGTH; i++)
    {
        if (stack.length === 0)
        {
            stack.push(i);
        }
        else
        {
            while (stack.length > 0)
            {
                const top = stack[stack.length - 1];
                if (temperatures[top] < temperatures[i])
                {
                    stack.pop();
                    output[top] = i - top;
                }
                else
                {
                    break;
                }
            }
            stack.push(i);
        }
    }
    return output;
};
// @lc code=end

