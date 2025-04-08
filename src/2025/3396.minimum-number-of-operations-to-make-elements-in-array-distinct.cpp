/*
 * @lc app=leetcode id=3396 lang=cpp
 *
 * [3396] Minimum Number of Operations to Make Elements in Array Distinct
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumOperations(const std::vector<int>& nums) {
    std::unordered_set<int> number_set;

    for (int i = static_cast<int>(nums.size() - 1); i >= 0; i--) {
      if (number_set.contains(nums[i])) {
        return std::ceil(static_cast<double>(i + 1) / 3);
      }
      number_set.insert(nums[i]);
    }

    return 0;
  }
};
// @lc code=end
