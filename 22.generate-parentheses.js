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
    let openLeftCount = 0;

    let results = [];
    let current = [];
    function backtrack()
    {
        if (current.length > 2 * n)
        {
            return;
        }

        if (current.length === 2 * n && openLeftCount === 0)
        {
            results.push(current.join(''));
        }
        else
        {
            if (openLeftCount === 0)    // 只能放左括号
            {
                current.push('(');
                openLeftCount++;
                backtrack();
                current.pop();
                openLeftCount--;
            }
            else
            {
                if (openLeftCount < n)  // 还可以继续放左括号
                {
                    current.push('(');
                    openLeftCount++;
                    backtrack();
                    current.pop();
                    openLeftCount--;
                }

                current.push(')');
                openLeftCount--;
                backtrack();
                current.pop();
                openLeftCount++;
            }
        }
    }

    backtrack();

    return results;
};
// @lc code=end
