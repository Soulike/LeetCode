/*
 * @lc app=leetcode id=1323 lang=cpp
 *
 * [1323] Maximum 69 Number
 */

#include <array>

// @lc code=start
class Solution {
 public:
  int maximum69Number(const int num) {
    for (const int mask : masks_) {
      if ((num / mask) % 10 == 6) {
        return num + 3 * mask;
      }
    }
    return num;
  }

 private:
  static constexpr std::array<int, 4> masks_ = {1000, 100, 10, 1};
};
// @lc code=end
