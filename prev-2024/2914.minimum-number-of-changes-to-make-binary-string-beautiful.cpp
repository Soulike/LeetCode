/*
 * @lc app=leetcode id=2914 lang=cpp
 *
 * [2914] Minimum Number of Changes to Make Binary String Beautiful
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int minChanges(std::string s) {
    int result = 0;
    for (int i = 0; i < s.size(); i += 2) {
      if (s[i] != s[i + 1]) {
        result++;
      }
    }

    return result;
  }
};
// @lc code=end
