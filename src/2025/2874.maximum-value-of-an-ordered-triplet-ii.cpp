/*
 * @lc app=leetcode id=2874 lang=cpp
 *
 * [2874] Maximum Value of an Ordered Triplet II
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long maximumTripletValue(const std::vector<int>& nums) {
    long long max_i_value = 0;
    long long max_i_j_diff_value = 0;
    long long max_result = 0;

    for (int k = 0; k < nums.size(); k++) {
      max_result = std::max(max_result, max_i_j_diff_value * nums[k]);
      max_i_j_diff_value = std::max(max_i_j_diff_value, max_i_value - nums[k]);
      max_i_value = std::max(max_i_value, static_cast<long long>(nums[k]));
    }

    return max_result;
  }
};
// @lc code=end
