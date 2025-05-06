/*
 * @lc app=leetcode id=1920 lang=cpp
 *
 * [1920] Build Array from Permutation
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> buildArray(const std::vector<int>& nums) {
    std::vector<int> result(nums.size());
    for (int i = 0; i < nums.size(); i++) {
      result[i] = nums[nums[i]];
    }
    return result;
  }
};
// @lc code=end
