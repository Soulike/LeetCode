/*
 * @lc app=leetcode id=3689 lang=cpp
 *
 * [3689] Maximum Total Subarray Value I
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long maxTotalValue(const std::vector<int>& nums, int k) {
    const int min_num = *std::ranges::min_element(nums);
    const int max_num = *std::ranges::max_element(nums);
    return (max_num - min_num) * static_cast<long long>(k);
  }
};
// @lc code=end
