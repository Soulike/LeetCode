/*
 * @lc app=leetcode id=633 lang=cpp
 *
 * [633] Sum of Square Numbers
 */

#include <cinttypes>
#include <cmath>

// @lc code=start
class Solution {
 public:
  bool judgeSquareSum(int32_t c) {
    std::int32_t left = 0;
    std::int32_t right = static_cast<std::int32_t>(std::sqrt(c));

    while (left <= right) {
      std::int64_t mid = static_cast<std::int64_t>(left * left) +
                         static_cast<std::int64_t>(right * right);
      if (mid < c) {
        left++;
      } else if (mid > c) {
        right--;
      } else {
        return true;
      }
    }

    return false;
  }
};
// @lc code=end
