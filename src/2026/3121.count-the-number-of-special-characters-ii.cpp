/*
 * @lc app=leetcode id=3121 lang=cpp
 *
 * [3121] Count the Number of Special Characters II
 */

#include <array>
#include <cctype>
#include <string>

// @lc code=start
class Solution {
 public:
  int numberOfSpecialChars(std::string word) {
    std::array<int, 26> lowercase_letter_to_last_index = {};
    lowercase_letter_to_last_index.fill(-1);
    std::array<int, 26> uppercase_letter_to_first_index = {};
    uppercase_letter_to_first_index.fill(-1);

    for (int i = 0; i < word.size(); i++) {
      const char c = word[i];
      if (std::isupper(c)) {
        const int letter = c - 'A';
        if (uppercase_letter_to_first_index[letter] != -1) {
          continue;
        }
        uppercase_letter_to_first_index[letter] = i;
      } else {
        // is lower
        const int letter = c - 'a';
        lowercase_letter_to_last_index[letter] = i;
      }
    }

    int special_char_count = 0;
    for (int i = 0; i < 26; i++) {
      if (lowercase_letter_to_last_index[i] == -1 ||
          uppercase_letter_to_first_index[i] == -1) {
        continue;
      }
      if (lowercase_letter_to_last_index[i] >
          uppercase_letter_to_first_index[i]) {
        continue;
      }
      special_char_count++;
    }

    return special_char_count;
  }
};
// @lc code=end
