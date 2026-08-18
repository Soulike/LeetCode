/*
 * @lc app=leetcode id=3471 lang=cpp
 *
 * [3471] Find the Largest Almost Missing Integer
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int largestInteger(const std::vector<int>& nums, const int k) {
    std::array<int, 51> num_freqs;
    for (const int num : nums) {
      num_freqs[num]++;
    }

    if (k == 1) {
      for (int num = 50; num >= 0; num--) {
        if (num_freqs[num] == 1) {
          return num;
        }
      }
    }

    if (k == nums.size()) {
      return *std::max_element(nums.cbegin(), nums.cend());
    }

    if (num_freqs[nums.front()] == 1 && num_freqs[nums.back()] == 1) {
      return std::max(nums.front(), nums.back());
    }

    if (num_freqs[nums.back()] == 1) {
      return nums.back();
    }

    if (num_freqs[nums.front()] == 1) {
      return nums.front();
    }

    return -1;
  }
};
// @lc code=end
