/*
 * @lc app=leetcode id=3461 lang=cpp
 *
 * [3461] Check If Digits Are Equal in String After Operations I
 */

#include <string>
#include <string_view>

// @lc code=start
class Solution {
 public:
  bool hasSameDigits(const std::string& s) {
    std::string digits = GetNextDigits(s);
    while (digits.size() > 2) {
      digits = GetNextDigits(digits);
    }
    return digits[0] == digits[1];
  }

 private:
  static std::string GetNextDigits(std::string_view digits) {
    std::string next_digits;
    for (size_t i = 0; i < digits.size() - 1; i++) {
      next_digits.push_back(((digits[i] - '0') + (digits[i + 1] - '0')) % 10 +
                            '0');
    }
    return next_digits;
  }
};
// @lc code=end
