/*
 * @lc app=leetcode id=279 lang=cpp
 *
 * [279] Perfect Squares
 */
#include <cmath>
#include <cstdint>
#include <algorithm>
// @lc code=start
class Solution
{
public:
    int numSquares(int n)
    {
        /*
        dp[i] the least number of perfect square numbers sum to i

        base case
        dp[0] = 0

        for i from 1 to n
            for j^2 from 1 to i
                dp[i] = min(dp[i], dp[i-j^2] + 1)
        */

        int dp[n+1];
        std::fill(dp, dp + n + 1, INT32_MAX);
        dp[0] = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j * j <= i; j++)
            {
                dp[i] = std::min(dp[i], dp[i - j * j] + 1);
            }
        }

        return dp[n];
    }
};
// @lc code=end
