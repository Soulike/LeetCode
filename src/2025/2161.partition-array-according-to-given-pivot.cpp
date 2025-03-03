/*
 * @lc app=leetcode id=2161 lang=cpp
 *
 * [2161] Partition Array According to Given Pivot
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> pivotArray(const std::vector<int>& nums, const int pivot) {
    std::vector<int> result(nums.size(), pivot);
    int lessThanPivotIndex = 0;
    int moreThanPivotIndex = static_cast<int>(result.size()) - 1;

    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] < pivot) {
        result[lessThanPivotIndex] = nums[i];
        lessThanPivotIndex++;
      }

      if (nums[nums.size() - i - 1] > pivot) {
        result[moreThanPivotIndex] = nums[nums.size() - i - 1];
        moreThanPivotIndex--;
      }
    }

    return result;
  }
};
// @lc code=end
