/*
 * @lc app=leetcode id=2999 lang=cpp
 *
 * [2999] Count the Number of Powerful Integers
 */

#include <cmath>
#include <string>

// @lc code=start
// Ref:
// https://leetcode.com/problems/count-the-number-of-powerful-integers/solutions/6622412/count-the-number-of-powerful-integers/comments/2940213/
class Solution {
 public:
  long long numberOfPowerfulInt(const long long start,
                                const long long finish,
                                const int limit,
                                const std::string& s) {
    return GetNumberOfPowerfulIntLessOrEqualValue(finish, limit, s) -
           GetNumberOfPowerfulIntLessOrEqualValue(start - 1, limit, s);
  }

 private:
  static long long GetNumberOfPowerfulIntLessOrEqualValue(
      const long long value,
      const int digit_limit,
      const std::string& suffix) {
    const std::string value_string = std::to_string(value);
    const std::string_view value_string_view(value_string);
    if (value_string.size() < suffix.size()) {
      return 0;
    }
    if (value_string.size() == suffix.size()) {
      return value_string >= suffix;
    }

    const size_t prefix_length = value_string.size() - suffix.size();
    const std::string_view value_prefix =
        value_string_view.substr(0, prefix_length);
    long long number_of_powerful_int = 0;

    for (size_t i = 0; i < prefix_length; i++) {
      const size_t remaining_prefix_length = prefix_length - i;
      const int prefix_current_digit = value_prefix[i] - '0';
      if (prefix_current_digit > digit_limit) {
        number_of_powerful_int += static_cast<long long>(
            std::pow(digit_limit + 1, remaining_prefix_length));
        return number_of_powerful_int;
      }

      number_of_powerful_int += static_cast<long long>(
          prefix_current_digit *
          std::pow(digit_limit + 1, remaining_prefix_length - 1));
    }

    const std::string_view value_suffix =
        value_string_view.substr(prefix_length);
    number_of_powerful_int += (value_suffix >= suffix);

    return number_of_powerful_int;
  }
};
// @lc code=end
