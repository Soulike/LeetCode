/*
 * @lc app=leetcode id=3702 lang=cpp
 *
 * [3702] Longest Subsequence With Non-Zero Bitwise XOR
 */

#include <numeric>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int longestSubsequence(const std::vector<int>& nums) {
    const int nums_xor = std::accumulate(
        nums.cbegin(), nums.cend(), 0,
        [&](const int prev, const int curr) { return prev ^ curr; });
    if (nums_xor != 0) {
      return nums.size();
    }

    bool has_non_zero_num = false;
    for (const int num : nums) {
      if (num != 0) {
        has_non_zero_num = true;
        break;
      }
    }

    if (!has_non_zero_num) {
      return 0;
    }

    return nums.size() - 1;
  }
};
// @lc code=end
