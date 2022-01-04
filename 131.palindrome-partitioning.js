/*
 * @lc app=leetcode id=131 lang=javascript
 *
 * [131] Palindrome Partitioning
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = function (s)
{
    /**
     * base case 
     * dp[i][i] = true
     * dp[i][i+1] = true
     * 
     * 如果 s[i] === s[j-1]
     * dp[i][j] = dp[i+1][j-1]
     * 
     * 如果 s[i] !== s[j-1]
     * dp[i][j] = false
     */

    /**
     * dp[i][j] 从 i 到 j-1 的字符串是不是回文
     */
    const dp = new Array(s.length);
    for (let i = 0; i < s.length; i++)
    {
        dp[i] = new Array(s.length + 1);
        dp[i][i] = true;
        dp[i][i + 1] = true;
    }

    for (let i = s.length - 2; i >= 0; i--)
    {
        for (let j = i + 2; j <= s.length; j++)
        {
            if (s[i] === s[j - 1])
            {
                dp[i][j] = dp[i + 1][j - 1];
            }
            else
            {
                dp[i][j] = false;
            }
        }
    }

    // 以下转化成为图可达问题，找到所有从 0 开始到 s.length 结束的可达路径

    /**
     * @returns {[number,number][][]} - 从 startIndex 开始，能到达 s.length 的路径
     */
    function getRoutes(startIndex)
    {
        /** @type {[number,number][][]} */
        const result = [];
        for (let j = startIndex + 1; j <= s.length; j++)
        {
            if (dp[startIndex][j])
            {
                if (j < s.length)
                {
                    const restRoutes = getRoutes(j);
                    for (const restRoute of restRoutes)
                    {
                        result.push([[startIndex, j], ...restRoute]);
                    }
                }
                else
                {
                    result.push([[startIndex, j]]);
                }
            }
        }
        return result;
    }

    const routes = getRoutes(0);
    const result = [];
    for (const route of routes)
    {
        const substrings = [];
        for (const [start, end] of route)
        {
            substrings.push(s.slice(start, end));
        }
        result.push(substrings);
    }

    return result;
};
// @lc code=end