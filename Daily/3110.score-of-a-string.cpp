/*
 * @lc app=leetcode id=3110 lang=cpp
 *
 * [3110] Score of a String
 */
#include <cmath>
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  int scoreOfString(string s) {
    int score = 0;
    for (int i = 0; i < s.size() - 1; i++) {
      score += std::abs(s[i + 1] - s[i]);
    }

    return score;
  }
};
// @lc code=end
