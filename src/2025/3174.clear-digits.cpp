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
    int stackTop = 0;
    for (int i = 0; i < s.size(); i++) {
      if (s[i] >= '0' && s[i] <= '9') {
        stackTop--;
      } else {
        s[stackTop] = s[i];
        stackTop++;
      }
    }

    s.resize(stackTop);
    return s;
  }
};
// @lc code=end
