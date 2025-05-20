/*
 * @lc app=leetcode id=3355 lang=cpp
 *
 * [3355] Zero Array Transformation I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool isZeroArray(const std::vector<int>& nums,
                   const std::vector<std::vector<int>>& queries) {
    std::vector<int> prefix_diff(nums.size() + 1, 0);
    for (const std::vector<int>& query : queries) {
      prefix_diff[query[0]]--;
      prefix_diff[query[1] + 1]++;
    }

    int current_diff = 0;
    for (int i = 0; i < nums.size(); i++) {
      current_diff += prefix_diff[i];
      if (nums[i] + current_diff > 0) {
        return false;
      }
    }

    return true;
  }
};
// @lc code=end
