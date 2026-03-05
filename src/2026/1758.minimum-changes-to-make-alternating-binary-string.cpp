/*
 * @lc app=leetcode id=1758 lang=cpp
 *
 * [1758] Minimum Changes To Make Alternating Binary String
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int minOperations(const std::string_view s) {
    int leading_zero_operation_count = 0;
    int leading_one_operation_count = 0;

    int leading_zero_num = 0;
    int leading_one_num = 1;

    for (const char c : s) {
      const int num = c - '0';
      leading_zero_operation_count += num != leading_zero_num;
      leading_zero_num = (leading_zero_num + 1) % 2;

      leading_one_operation_count += num != leading_one_num;
      leading_one_num = (leading_one_num + 1) % 2;
    }

    return std::min(leading_zero_operation_count, leading_one_operation_count);
  }
};
// @lc code=end
