/*
 * @lc app=leetcode id=2016 lang=cpp
 *
 * [2016] Maximum Difference Between Increasing Elements
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumDifference(const std::vector<int>& nums) {
    int current_min = nums[0];
    int max_diff = -1;

    for (int i = 1; i < nums.size(); i++) {
      if (current_min < nums[i]) {
        max_diff = std::max(max_diff, nums[i] - current_min);
      } else {
        current_min = nums[i];
      }
    }

    return max_diff;
  }
};
// @lc code=end
