/*
 * @lc app=leetcode id=3174 lang=cpp
 *
 * [3174] Clear Digits
 */

#include <string>

// @lc code=start
class Solution {
 public:
  std::string clearDigits(std::string s) {
    std::string result;
    for (const char c : s) {
      if (c >= '0' && c <= '9') {
        result.pop_back();
      } else {
        result.push_back(c);
      }
    }

    return result;
  }
};
// @lc code=end
