/*
 * @lc app=leetcode id=75 lang=cpp
 *
 * [75] Sort Colors
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  void sortColors(std::vector<int>& nums) {
    std::array<int, 3> num_counts = {0, 0, 0};
    for (const int num : nums) {
      num_counts[num]++;
    }

    int current_index = 0;
    for (int num = 0; num < 3; num++) {
      while (num_counts[num] > 0) {
        nums[current_index] = num;
        current_index++;
        num_counts[num]--;
      }
    }
  }
};
// @lc code=end
