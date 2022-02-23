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
     * dp[i][j] [i,j] 是否是回文
     * 
     * base case 
     * dp[i][i] = true
     * 
     * dp[i][j] = 
     * if j === i+1
     *  dp[i][j] = s[i] === s[j]
     * else if s[i] === s[j]
     *  dp[i][j] = dp[i+1][j-1]
     * else
     *  dp[i][j] = false
     *  
     */

    const n = s.length;
    const dp = new Array(n);
    for (let i = 0; i < n; i++)
    {
        dp[i] = new Array(n);
        dp[i].fill(false);
        dp[i][i] = true;
    }

    for (let i = n - 2; i >= 0; i--)
    {
        for (let j = i + 1; j < n; j++)
        {
            if (j === i + 1)
            {
                dp[i][j] = s[i] === s[j];
            }
            else if (s[i] === s[j])
            {
                dp[i][j] = dp[i + 1][j - 1]
            }
            else
            {
                dp[i][j] = false;
            }
        }
    }


    function isPalindrome(left, right)
    {
        return dp[left][right];
    }

    const result = [];
    let current = [];

    function backtrack(start)
    {
        if (start === s.length)
        {
            result.push([...current]);
        }
        else
        {
            for (let i = start + 1; i <= s.length; i++)
            {
                if (isPalindrome(start, i - 1))
                {
                    current.push(s.slice(start, i));
                    backtrack(i);
                    current.pop();
                }
            }
        }
    }
    backtrack(0);
    return result;
};
// @lc code=end

partition('cdd');