/*
 * @lc app=leetcode id=190 lang=cpp
 *
 * [190] Reverse Bits
 */

#include <bitset>

// @lc code=start
class Solution {
 public:
  int reverseBits(const int n) {
    std::bitset<32> original(n);
    std::bitset<32> reversed;

    for (int i = 0; i < original.size(); i++) {
      reversed[original.size() - i - 1] = original[i];
    }
    return static_cast<int>(reversed.to_ulong());
  }
};
// @lc code=end
