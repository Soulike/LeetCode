/*
 * @lc app=leetcode id=2460 lang=cpp
 *
 * [2460] Apply Operations to an Array
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> applyOperations(std::vector<int>& nums) {
    for (int i = 0; i < nums.size() - 1; i++) {
      if (nums[i] == nums[i + 1]) {
        nums[i] *= 2;
        nums[i + 1] = 0;
      }
    }

    int firstZeroIndex = 0;
    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] != 0) {
        nums[firstZeroIndex] = nums[i];
        firstZeroIndex++;
      }
    }
    std::fill(nums.begin() + firstZeroIndex, nums.end(), 0);
    return nums;
  }
};
// @lc code=end
