/*
 * @lc app=leetcode id=3330 lang=cpp
 *
 * [3330] Find the Original Typed String I
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int possibleStringCount(const std::string& word) {
    int letter_start = 0;
    int letter_end = 0;
    int possible_string_count = 1;

    while (letter_end < word.size()) {
      while (letter_end < word.size() &&
             word[letter_end] == word[letter_start]) {
        letter_end++;
      }

      const int letter_length = letter_end - letter_start;
      letter_start = letter_end;
      possible_string_count += letter_length - 1;
    }

    return possible_string_count;
  }
};
// @lc code=end
