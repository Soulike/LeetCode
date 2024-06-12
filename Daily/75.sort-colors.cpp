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
    const int N = nums.size();
    std::array<int, 3> colorToFreqs;
    for (int i = 0; i < N; i++) {
      colorToFreqs[nums[i]]++;
    }

    int numsIndex = 0;
    for (int i = 0; i < 3; i++) {
      std::fill_n(nums.begin() + numsIndex, colorToFreqs[i], i);
      numsIndex += colorToFreqs[i];
    }
  }
};
// @lc code=end
