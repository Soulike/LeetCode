/*
 * @lc app=leetcode id=2843 lang=cpp
 *
 * [2843]   Count Symmetric Integers
 */

#include <numeric>
#include <string>

// @lc code=start
class Solution {
 public:
  int countSymmetricIntegers(const int low, const int high) {
    int count = 0;
    for (int i = low; i <= high; i++) {
      count += static_cast<int>(IsSymmetric(i));
    }

    return count;
  }

 private:
  static bool IsSymmetric(const int num) {
    const std::string num_str = std::to_string(num);
    const std::string_view num_str_view(num_str);
    if (num_str.size() % 2 == 1) {
      return false;
    }

    const std::string_view num_str_first_half =
        num_str_view.substr(0, num_str.size() / 2);
    const std::string_view num_str_second_half =
        num_str_view.substr(num_str.size() / 2);

    constexpr auto accumulate_op = [](const int prev, const char curr) {
      return prev + (curr - '0');
    };

    const int first_half_sum =
        std::accumulate(num_str_first_half.cbegin(), num_str_first_half.cend(),
                        0, accumulate_op);
    const int second_half_sum =
        std::accumulate(num_str_second_half.cbegin(),
                        num_str_second_half.cend(), 0, accumulate_op);
    return first_half_sum == second_half_sum;
  }
};
// @lc code=end
