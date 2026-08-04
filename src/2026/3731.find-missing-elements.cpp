/*
 * @lc app=leetcode id=3731 lang=cpp
 *
 * [3731] Find Missing Elements
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> findMissingElements(std::vector<int>& nums) {
    std::unordered_set<int> nums_set(nums.cbegin(), nums.cend());
    const int min_num = *std::min_element(nums.cbegin(), nums.cend());
    const int max_num = *std::max_element(nums.cbegin(), nums.cend());

    std::vector<int> missing_nums;
    for (int i = min_num; i <= max_num; i++) {
      if (!nums_set.contains(i)) {
        missing_nums.push_back(i);
      }
    }

    return missing_nums;
  }
};
// @lc code=end
