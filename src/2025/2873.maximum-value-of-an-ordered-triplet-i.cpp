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
    // Maximum nums[i] before k
    long long i_max_value = 0;
    // Maximum nums[i] - nums[j] before k
    long long i_j_max_delta = 0;

    for (int k = 0; k < nums.size(); k++) {
      result = std::max(result, i_j_max_delta * nums[k]);

      // Treat k as j, get maximum nums[i] - nums[j] so far.
      i_j_max_delta = std::max(i_j_max_delta, i_max_value - nums[k]);
      // Treat k as i, get maximum nums[i] so far.
      i_max_value = std::max(i_max_value, static_cast<long long>(nums[k]));
    }

    return result;
  }
};
// @lc code=end
