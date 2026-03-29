/*
 * @lc app=leetcode id=2839 lang=cpp
 *
 * [2839] Check if Strings Can be Made Equal With Operations I
 */

#include <string>

// @lc code=start
class Solution {
 public:
  bool canBeEqual(const std::string_view s1, const std::string_view s2) {
    const bool even_letters_match =
        s1[0] == s2[0] && s1[2] == s2[2] || s1[0] == s2[2] && s1[2] == s2[0];
    if (!even_letters_match) {
      return false;
    }
    const bool odd_letters_match =
        s1[1] == s2[1] && s1[3] == s2[3] || s1[1] == s2[3] && s1[3] == s2[1];
    return odd_letters_match;
  }
};
// @lc code=end
