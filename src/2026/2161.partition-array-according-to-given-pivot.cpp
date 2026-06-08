/*
 * @lc app=leetcode id=2161 lang=cpp
 *
 * [2161] Partition Array According to Given Pivot
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> pivotArray(std::vector<int>& nums, int pivot) {
    std::vector<int> less_nums;
    std::vector<int> equal_nums;
    std::vector<int> greater_nums;
    for (const int num : nums) {
      if (num < pivot) {
        less_nums.push_back(num);
      } else if (num > pivot) {
        greater_nums.push_back(num);
      } else {
        equal_nums.push_back(num);
      }
    }

    std::vector<int> result;
    result.reserve(nums.size());
    for (const int num : less_nums) {
      result.push_back(num);
    }
    for (const int num : equal_nums) {
      result.push_back(num);
    }
    for (const int num : greater_nums) {
      result.push_back(num);
    }
    return result;
  }
};
// @lc code=end
