/*
 * @lc app=leetcode id=696 lang=cpp
 *
 * [696] Count Binary Substrings
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int countBinarySubstrings(const std::string& s) {
    char prev_bit = 0;
    int prev_bit_count = 0;
    char current_bit = 0;
    int current_bit_count = 0;

    int binary_substring_count = 0;

    for (const char c : s) {
      if (c != current_bit) {
        binary_substring_count += std::min(prev_bit_count, current_bit_count);

        prev_bit = current_bit;
        current_bit = c;

        prev_bit_count = current_bit_count;
        current_bit_count = 1;
      } else {
        current_bit_count++;
      }
    }

    binary_substring_count += std::min(prev_bit_count, current_bit_count);

    return binary_substring_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countBinarySubstrings("00110011");
}