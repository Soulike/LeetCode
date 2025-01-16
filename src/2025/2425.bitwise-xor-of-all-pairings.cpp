/*
 * @lc app=leetcode id=2425 lang=cpp
 *
 * [2425] Bitwise XOR of All Pairings
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int xorAllNums(const std::vector<int>& nums1, const std::vector<int>& nums2) {
    const int nums1XorTime = static_cast<int>(nums2.size()) % 2;
    const int nums2XorTime = static_cast<int>(nums1.size()) % 2;

    int xorResult = 0;

    const auto xorOp = [](const int a, const int b) { return a ^ b; };

    if (nums1XorTime == 1) {
      xorResult =
          std::accumulate(nums1.cbegin(), nums1.cend(), xorResult, xorOp);
    }

    if (nums2XorTime == 1) {
      xorResult =
          std::accumulate(nums2.cbegin(), nums2.cend(), xorResult, xorOp);
    }

    return xorResult;
  }
};
// @lc code=end
