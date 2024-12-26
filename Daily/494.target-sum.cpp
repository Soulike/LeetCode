/*
 * @lc app=leetcode id=494 lang=cpp
 *
 * [494] Target Sum
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int findTargetSumWays(const std::vector<int>& nums, const int target) {
    currentSum = 0;
    foundWays = 0;

    backtrack(nums, 0, target);
    return foundWays;
  }

 private:
  void backtrack(const std::vector<int>& nums,
                 const int numsIndex,
                 const int target) {
    if (numsIndex == nums.size()) {
      if (currentSum == target) {
        foundWays++;
      }
      return;
    }

    currentSum += nums[numsIndex];
    backtrack(nums, numsIndex + 1, target);
    currentSum -= nums[numsIndex];

    currentSum -= nums[numsIndex];
    backtrack(nums, numsIndex + 1, target);
    currentSum += nums[numsIndex];
  }

 private:
  int currentSum;
  int foundWays;
};
// @lc code=end
