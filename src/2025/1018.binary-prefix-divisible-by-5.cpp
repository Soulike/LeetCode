/*
 * @lc app=leetcode id=1018 lang=cpp
 *
 * [1018] Binary Prefix Divisible By 5
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<bool> prefixesDivBy5(const std::vector<int>& nums) {
    int current_number = 0;
    std::vector<bool> results(nums.size());
    for (size_t i = 0; i < nums.size(); i++) {
      current_number <<= 1;
      current_number += nums[i];
      results[i] = current_number % 5 == 0;
      current_number %= 5;
    }
    return results;
  }
};
// @lc code=end
