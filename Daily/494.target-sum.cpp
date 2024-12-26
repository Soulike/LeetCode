/*
 * @lc app=leetcode id=494 lang=cpp
 *
 * [494] Target Sum
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findTargetSumWays(const std::vector<int>& nums, const int target) {
    std::unordered_map<std::string, int> memo;
    return dp(nums, 0, target, memo);
  }

 private:
  /**
   * Starts from `index`, how many ways we can get `target`.
   * If not possible, returns `0`.
   */
  int dp(const std::vector<int>& nums,
         const int index,
         const int target,
         std::unordered_map<std::string, int>& memo) {
    if (index == nums.size()) {
      return target == 0;
    }
    const std::string memoKey =
        std::to_string(index) + '-' + std::to_string(target);
    if (memo.contains(memoKey)) {
      return memo[memoKey];
    }
    const int result = dp(nums, index + 1, target + nums[index], memo) +
                       dp(nums, index + 1, target - nums[index], memo);
    memo[memoKey] = result;
    return result;
  }
};
// @lc code=end
