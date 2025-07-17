/*
 * @lc app=leetcode id=3202 lang=cpp
 *
 * [3202] Find the Maximum Length of Valid Subsequence II
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumLength(const std::vector<int>& nums, const int k) {
    /*
     * To satisfy the condition, if we convert the subsequence into remainders
     * of modulo `k`, it must be:
     * `[a, b, a, b, ..., a, b, a, b]`.
     *
     * dp[a][b] the longest subsequence length which ends with ...,a,b.
     * 0 < (a + b) % k < k
     */
    std::vector<std::vector<int>> dp(k, std::vector<int>(k, 0));
    int max_length = 0;

    for (const int num : nums) {
      const int a = num % k;
      for (int abSumRemainder = 0; abSumRemainder < k; abSumRemainder++) {
        // (a + b) % k = abSumRemainder, a < k and b < k,
        // => a + b = k + abSumRemainder or abSumRemainder
        // => b = k + abSumRemainder - a or abSumRemainder - a
        // => b = (k + abSumRemainder - a) % k
        const int b = (abSumRemainder - a + k) % k;
        dp[a][b] = std::max(dp[a][b], dp[b][a] + 1);
        max_length = std::max(max_length, dp[a][b]);
      }
    }

    return max_length;
  }
};
// @lc code=end
