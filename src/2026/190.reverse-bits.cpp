/*
 * @lc app=leetcode id=190 lang=cpp
 *
 * [190] Reverse Bits
 */

#include <bitset>

// @lc code=start
class Solution {
 public:
  int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
      result <<= 1;
      const int bit = n & 0x1;
      result += bit;
      n >>= 1;
    }
    return result;
  }
};
// @lc code=end
