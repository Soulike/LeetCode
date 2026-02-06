/*
 * @lc app=leetcode id=3634 lang=cpp
 *
 * [3634] Minimum Removals to Balance Array
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minRemoval(std::vector<int>& nums, const int k) {
    std::ranges::sort(nums);
    int max_window_size = 1;

    int right = 0;
    for (int left = 0; left < nums.size(); left++) {
      while (right < nums.size() &&
             static_cast<std::int64_t>(nums[left]) * k >= nums[right]) {
        right++;
      }
      max_window_size = std::max(max_window_size, right - left);
    }

    return nums.size() - max_window_size;
  }
};
// @lc code=end
