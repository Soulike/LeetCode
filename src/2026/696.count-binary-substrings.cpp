/*
 * @lc app=leetcode id=696 lang=cpp
 *
 * [696] Count Binary Substrings
 */

#include <memory>
#include <stack>
#include <string>

// @lc code=start
class Solution {
 public:
  int countBinarySubstrings(const std::string& s) {
    const int zero_leading_substring_count =
        CountZeroLeadingBinarySubstrings(s);
    const int one_leading_substring_count = CountOneLeadingBinarySubstrings(s);
    return zero_leading_substring_count + one_leading_substring_count;
  }

 private:
  // Count 000...111
  static int CountZeroLeadingBinarySubstrings(const std::string& s) {
    auto stack = std::make_unique<std::stack<char>>();
    int current_substring_count = 0;
    int total_substring_count = 0;

    for (const char c : s) {
      if (c == '0') {
        if (current_substring_count > 0) {
          // Substrings are formed. Starting new substrings.
          stack = std::make_unique<std::stack<char>>();
          total_substring_count += current_substring_count;
          current_substring_count = 0;
        }
        stack->push(c);
      } else {
        // c == '1'
        if (stack->empty()) {
          continue;
        }
        stack->pop();
        current_substring_count++;
      }
    }

    total_substring_count += current_substring_count;
    return total_substring_count;
  }

  // Count 111...000
  static int CountOneLeadingBinarySubstrings(const std::string& s) {
    auto stack = std::make_unique<std::stack<char>>();
    int current_substring_count = 0;
    int total_substring_count = 0;

    for (const char c : s) {
      if (c == '1') {
        if (current_substring_count > 0) {
          // Substrings are formed. Starting new substrings.
          stack = std::make_unique<std::stack<char>>();
          total_substring_count += current_substring_count;
          current_substring_count = 0;
        }
        stack->push(c);
      } else {
        // c == '0'
        if (stack->empty()) {
          continue;
        }
        stack->pop();
        current_substring_count++;
      }
    }

    total_substring_count += current_substring_count;
    return total_substring_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countBinarySubstrings("00110011");
}