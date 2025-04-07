/*
 * @lc app=leetcode id=416 lang=cpp
 *
 * [416] Partition Equal Subset Sum
 */

#include <algorithm>
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool canPartition(const std::vector<int>& nums) {
    const int sum = std::accumulate(
        nums.cbegin(), nums.cend(), 0,
        [](const int prev, const int curr) { return prev + curr; });
    if (sum % 2) {
      // is odd
      return false;
    }
    const int expected_target = sum / 2;

    // dp[i][j]: whether we can get a sum of j from nums[0] to nums[i-1]
    // base case: dp[0][...] = false, dp[0][0] = true, dp[...][0] = true
    // formula: dp[i][j] =
    //            dp[i-1][j]        // we don't pick the nums[i]
    //         || dp[i-1][j-nums[i]]  // we pick nums[i]
    // result: dp[nums.size()][expected_target]
    std::vector<std::vector<bool>> dp(
        2, std::vector<bool>(expected_target + 1, false));

    std::ranges::fill(dp[0], false);
    for (int i = 0; i <= 1; i++) {
      dp[i][0] = true;
    }

    for (int i = 1; i <= nums.size(); i++) {
      for (int j = 1; j <= expected_target; j++) {
        dp[i % 2][j] = dp[(i - 1) % 2][j];
        if (j - nums[i - 1] >= 0) {
          dp[i % 2][j] = dp[i % 2][j] || dp[(i - 1) % 2][j - nums[i - 1]];
        }
      }
    }

    return dp[nums.size() % 2][expected_target];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.canPartition({1, 2, 5});
}
