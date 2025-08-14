/*
 * @lc app=leetcode id=2264 lang=cpp
 *
 * [2264] Largest 3-Same-Digit Number in String
 */

#include <algorithm>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string largestGoodInteger(const std::string& num) {
    char current_digit = -1;
    int current_digit_substring_length = 0;
    std::string good_integer;

    for (const char digit : num) {
      if (digit != current_digit) {
        current_digit = digit;
        current_digit_substring_length = 1;
      } else {
        current_digit_substring_length++;
        if (current_digit_substring_length == 3 &&
            (good_integer.empty() || current_digit > good_integer[0])) {
          good_integer.resize(3);
          std::ranges::fill(good_integer, current_digit);
        }
      }
    }

    return good_integer;
  }
};
// @lc code=end
