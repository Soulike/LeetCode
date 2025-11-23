/*
 * @lc app=leetcode id=1262 lang=cpp
 *
 * [1262] Greatest Sum Divisible by Three
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxSumDivThree(const std::vector<int>& nums) {
    /**
     * dp[i][r] - ends with nums[i], the largest sum with remainder r mod 3
     */
    std::array<std::array<int, 3>, 2> dp = {};
    dp[0][nums[0] % 3] = nums[0];

    for (size_t i = 1; i < nums.size(); i++) {
      const int remainder = nums[i] % 3;
      for (size_t r = 0; r < 3; r++) {
        if (
            // If the prev value is 0, then it is an invalid value
            dp[(i - 1) % 2][(3 + r - remainder) % 3] > 0 ||
            // If the prev value is invalid, only when nums[i] % 3 == r we can
            // set it in dp.
            nums[i] % 3 == r) {
          dp[i % 2][r] = dp[(i - 1) % 2][(3 + r - remainder) % 3] + nums[i];
        }
        dp[i % 2][r] = std::max(dp[i % 2][r], dp[(i - 1) % 2][r]);
      }
    }

    return dp[(nums.size() - 1) % 2][0];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxSumDivThree({1, 2, 3, 4, 4});
}