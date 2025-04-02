/*
 * @lc app=leetcode id=2873 lang=cpp
 *
 * [2873] Maximum Value of an Ordered Triplet I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long maximumTripletValue(const std::vector<int>& nums) {
    long long result = 0;
    long long max_value_before_j = nums[0];
    for (int j = 1; j < nums.size(); j++) {
      max_value_before_j =
          std::max(max_value_before_j, static_cast<long long>(nums[j - 1]));
      for (int k = j + 1; k < nums.size(); k++) {
        result = std::max(
            result,
            static_cast<long long>(max_value_before_j - nums[j]) * nums[k]);
      }
    }

    return result;
  }
};
// @lc code=end
