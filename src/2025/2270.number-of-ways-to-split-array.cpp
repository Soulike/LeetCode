/*
 * @lc app=leetcode id=2270 lang=cpp
 *
 * [2270] Number of Ways to Split Array
 */
#include <cinttypes>
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int waysToSplitArray(const std::vector<int>& nums) {
    if (nums.size() < 2) {
      return 0;
    }

    std::int64_t leftSum = 0;
    std::int64_t rightSum = std::accumulate(nums.cbegin(), nums.cend(),
                                            static_cast<std::int64_t>(0));

    int ways = 0;
    for (int i = 0; i < nums.size() - 1; i++) {
      leftSum += nums[i];
      rightSum -= nums[i];

      if (leftSum >= rightSum) {
        ways++;
      }
    }

    return ways;
  }
};
// @lc code=end
