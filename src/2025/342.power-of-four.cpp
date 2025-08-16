/*
 * @lc app=leetcode id=342 lang=cpp
 *
 * [342] Power of Four
 */

#include <cinttypes>

// @lc code=start
class Solution {
 public:
  constexpr bool isPowerOfFour(const int n) {
    if (!IsPowerOfTwo(n)) {
      return false;
    }
    return (n & mask_) == 0;
  }

 private:
  static constexpr std::uint32_t mask_ = 0xAAAAAAAA;
  static constexpr bool IsPowerOfTwo(const int n) {
    return n > 0 && (n & (n - 1)) == 0;
  }
};
// @lc code=end
