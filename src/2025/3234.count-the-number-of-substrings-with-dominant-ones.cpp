/*
 * @lc app=leetcode id=3234 lang=cpp
 *
 * [3234] Count the Number of Substrings With Dominant Ones
 */

#include <cinttypes>
#include <cmath>
#include <string_view>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numberOfSubstrings(std::string_view s) {
    std::vector<std::uint32_t> prefix_zero_count(s.size() + 1, 0);
    for (size_t i = 0; i < s.size(); i++) {
      prefix_zero_count[i + 1] = prefix_zero_count[i] + (s[i] == '0');
    }

    int substring_count = 0;

    for (std::uint32_t i = 0; i < s.size(); i++) {
      for (std::uint32_t j = i; j < s.size(); j++) {
        const std::uint32_t window_size = j - i + 1;
        const std::uint32_t zero_count =
            prefix_zero_count[j + 1] - prefix_zero_count[i];
        const std::uint32_t one_count = window_size - zero_count;
        const std::uint64_t zero_count_square = zero_count * zero_count;

        if (one_count < zero_count_square) {
          // We can skip `zero_count_square - one_count` numbers even with
          // following numbers are all 1s.
          j += (zero_count_square - one_count - 1);
        } else if (one_count == zero_count_square) {
          substring_count++;
        } else {  // one_count > zero_count_square
          substring_count++;

          // We can skip `std::sqrt(one_count) - zero_count` numbers even with
          // following numbers are all 0s.
          const std::uint32_t diff =
              static_cast<std::uint32_t>(std::sqrtl(one_count)) - zero_count;
          const std::uint32_t next_j = j + diff;
          if (next_j >= s.size()) {
            substring_count += s.size() - j - 1;
          } else {
            substring_count += next_j - j;
          }
          // No minus 1 here because all substrings ends from j to next_j are
          // valid.
          j = next_j;
        }
      }
    }

    return substring_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numberOfSubstrings("000001111");
}