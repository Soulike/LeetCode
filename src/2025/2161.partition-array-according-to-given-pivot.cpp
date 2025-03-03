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
    std::vector<int> lessThanPivotNumbers;
    std::vector<int> moreThanPivotNumbers;
    int pivotCount = 0;

    for (const int num : nums) {
      if (num < pivot) {
        lessThanPivotNumbers.push_back(num);
      } else if (num > pivot) {
        moreThanPivotNumbers.push_back(num);
      } else {
        pivotCount++;
      }
    }

    std::vector<int> result;
    result.insert(result.end(), lessThanPivotNumbers.cbegin(),
                  lessThanPivotNumbers.cend());
    result.insert(result.end(), pivotCount, pivot);
    result.insert(result.end(), moreThanPivotNumbers.cbegin(),
                  moreThanPivotNumbers.cend());
    return result;
  }
};
// @lc code=end
