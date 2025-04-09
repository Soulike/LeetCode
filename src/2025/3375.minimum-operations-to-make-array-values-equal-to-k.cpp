/*
 * @lc app=leetcode id=3375 lang=cpp
 *
 * [3375] Minimum Operations to Make Array Values Equal to K
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minOperations(const std::vector<int>& nums, const int k) {
    if (nums.empty()) {
      return -1;
    }
    const std::unordered_set<int> nums_set(nums.cbegin(), nums.cend());
    const int min_num = *std::min_element(nums.cbegin(), nums.cend());
    if (min_num < k) {
      return -1;
    }
    return static_cast<int>(nums_set.size()) - (min_num == k);
  }
};
// @lc code=end
