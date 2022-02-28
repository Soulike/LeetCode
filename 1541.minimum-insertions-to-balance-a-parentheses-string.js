/*
 * @lc app=leetcode id=1541 lang=javascript
 *
 * [1541] Minimum Insertions to Balance a Parentheses String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s)
{
    let addCount = 0;
    let rightNeeded = 0;

    for (let i = 0; i < s.length; i++)
    {
        if (s[i] === '(')
        {
            // 之前有左括号没配对完，补一个右括号
            if (rightNeeded % 2 === 1)
            {
                addCount++;
                rightNeeded--;
            }
            rightNeeded += 2;
        }
        else
        {
            // 之前没有未配对完成的左括号，补一个左括号
            if (rightNeeded === 0)
            {
                addCount++;
                rightNeeded = 1;
            }
            else
            {
                rightNeeded--;
            }
        }
    }

    return addCount + rightNeeded;
};
// @lc code=end