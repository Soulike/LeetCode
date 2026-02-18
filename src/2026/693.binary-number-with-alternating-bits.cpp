/*
 * @lc app=leetcode id=693 lang=cpp
 *
 * [693] Binary Number with Alternating Bits
 */

// @lc code=start
class Solution {
 public:
  bool hasAlternatingBits(int n) {
    int last_bit = n & 0x1;
    n >>= 1;
    while (n > 0) {
      const int expected_bit = 1 - last_bit;
      if ((n & 0x1) != expected_bit) {
        return false;
      }
      last_bit = expected_bit;
      n >>= 1;
    }

    return true;
  }
};
// @lc code=end
