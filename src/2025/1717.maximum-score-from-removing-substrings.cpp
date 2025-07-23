/*
 * @lc app=leetcode id=1717 lang=cpp
 *
 * [1717] Maximum Score From Removing Substrings
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int maximumGain(std::string s, int x, int y) {
    const char char1 = x > y ? 'a' : 'b';
    const char char2 = x > y ? 'b' : 'a';
    if (x < y) {
      const int temp = x;
      x = y;
      y = temp;
    }

    int char1_count = 0;
    int char2_count = 0;
    int score = 0;

    for (const char c : s) {
      if (c == char1) {
        char1_count++;
      } else if (c == char2) {
        if (char1_count > 0) {
          char1_count--;
          score += x;
        } else {
          char2_count++;
        }
      } else {
        score += std::min(char1_count, char2_count) * y;
        char1_count = 0;
        char2_count = 0;
      }
    }

    score += std::min(char1_count, char2_count) * y;
    char1_count = 0;
    char2_count = 0;

    return score;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maximumGain("cdbcbbaaabab", 4, 5);
}
