/*
 * @lc app=leetcode id=2401 lang=cpp
 *
 * [2401] Longest Nice Subarray
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  int longestNiceSubarray(const std::vector<int>& nums) {
    // Bitwise AND of every pair in a subarray is 0 means a bit should not be
    // set twice in the subarray.

    int left = 0;
    int right = 0;
    int longestSubarrayLength = 0;
    std::uint32_t currentWindowMask = 0;

    while (right < nums.size()) {
      const int num = nums[right];
      while ((currentWindowMask & num) > 0) {
        // A bit is used in current window. Shrink until the bit is unset.
        longestSubarrayLength = std::max(longestSubarrayLength, right - left);
        currentWindowMask &= ~nums[left];
        left++;
      }
      currentWindowMask |= num;
      right++;
    }

    longestSubarrayLength = std::max(longestSubarrayLength, right - left);

    return longestSubarrayLength;
  }
};
// @lc code=end
