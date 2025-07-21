/*
 * @lc app=leetcode id=1957 lang=cpp
 *
 * [1957] Delete Characters to Make Fancy String
 */

#include <string>

// @lc code=start
class Solution {
 public:
  std::string makeFancyString(std::string s) {
    int new_string_index = 0;

    for (const char c : s) {
      if (new_string_index < 2) {
        s[new_string_index] = c;
        new_string_index++;
      } else if (s[new_string_index - 1] != s[new_string_index - 2]) {
        s[new_string_index] = c;
        new_string_index++;
      } else if (c != s[new_string_index - 1]) {
        s[new_string_index] = c;
        new_string_index++;
      }
    }

    s.resize(new_string_index);
    return s;
  }
};
// @lc code=end
