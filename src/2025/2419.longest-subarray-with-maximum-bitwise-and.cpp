/*
 * @lc app=leetcode id=2419 lang=cpp
 *
 * [2419] Longest Subarray With Maximum Bitwise AND
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int longestSubarray(const std::vector<int>& nums) {
    const int max_num = *std::max_element(nums.cbegin(), nums.cend());
    int max_size = 0;
    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] != max_num) {
        continue;
      }
      int max_j = i;
      for (int j = i; j < nums.size(); j++) {
        if (nums[j] != max_num) {
          break;
        }
        max_j = j;
      }
      max_size = std::max(max_size, max_j - i + 1);
      i = max_j + 1;
    }

    return max_size;
  }
};
// @lc code=end
