/*
 * @lc app=leetcode id=494 lang=cpp
 *
 * [494] Target Sum
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findTargetSumWays(const std::vector<int>& nums, const int target) {
    const int numsSum = std::accumulate(nums.cbegin(), nums.cend(), 0);

    if (!isTargetPossible(target, numsSum)) {
      return 0;
    }

    /*
     * dp[i][numsSum+t] - How many ways can `nums[0]`~`nums[i]` get target `t`
     *
     * base case
     * dp[0][numsSum+nums[0]] = 1
     * dp[0][numsSum-nums[0]] += 1
     *
     * dp[i][numsSum+t] = dp[i-1][numsSum+t+nums[i]] +
     * dp[i-1][numsSum+t-nums[i]]
     */

    // `2 * numsSum + 1`: Possible target range is `[-numsSum, numsSum]`. To
    // keep the index positive, we add `numsSum` and get range `[0, 2 *
    // numsSum]`.
    std::vector<std::vector<int>> dp(nums.size(),
                                     std::vector<int>(2 * numsSum + 1, 0));
    dp[0][numsSum + nums[0]] = 1;
    // It is possible that `nums[0] == 0`, in which case we have 2 ways to get
    // `t == 0`.
    dp[0][numsSum - nums[0]] += 1;

    for (int i = 1; i < nums.size(); i++) {
      for (int t = -numsSum; t <= numsSum; t++) {
        dp[i][numsSum + t] = (isTargetPossible(t + nums[i], numsSum)
                                  ? dp[i - 1][numsSum + t + nums[i]]
                                  : 0) +
                             (isTargetPossible(t - nums[i], numsSum)
                                  ? dp[i - 1][numsSum + t - nums[i]]
                                  : 0);
      }
    }

    return dp[nums.size() - 1][numsSum + target];
  }

 private:
  static bool isTargetPossible(const int target, const int numsSum) {
    // It is impossible to get target outside [-numsSum, numsSum];
    return -numsSum <= target && target <= numsSum;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.findTargetSumWays({1}, 2);
}
