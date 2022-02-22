/*
 * @lc app=leetcode id=1871 lang=javascript
 *
 * [1871] Jump Game VII
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function (s, minJump, maxJump)
{
    const n = s.length;
    if (s[s.length - 1] === '1')
    {
        return false;
    }

    /**
     * dp[i] s[i] 是否能到达终点？
     * 
     * base case
     * dp[n-1] = true
     * 
     * dp[i] = s[i] === '0  && any(dp[i+minJump...i+maxJump])
     */

    const dp = new Array(n);
    dp.fill(false);
    dp[n - 1] = true;

    for (let i = n - 2; i >= 0; i--)
    {
        if(s[i] === '0')
        {
            for (let j = minJump; j <= maxJump; j++)
            {
                if (i + j < n && dp[i + j])
                {
                    dp[i] = true;
                    break;
                }
            }
        }
    }

    return dp[0];
};
// @lc code=end