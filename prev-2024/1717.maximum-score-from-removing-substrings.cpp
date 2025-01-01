/*
 * @lc app=leetcode id=1717 lang=cpp
 *
 * [1717] Maximum Score From Removing Substrings
 */
#include <stack>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumGain(std::string s, int x, int y) {
    std::string xFind;
    std::string yFind;
    if (x > y) {
      xFind = "ab";
      yFind = "ba";
    } else {
      std::swap(x, y);
      xFind = "ba";
      yFind = "ab";
    }

    int score = 0;
    std::vector<char> firstRoundStack;

    for (const auto c : s) {
      if (firstRoundStack.empty()) {
        firstRoundStack.push_back(c);
        continue;
      }

      const auto stackTop = firstRoundStack.back();
      if (stackTop == xFind[0] && c == xFind[1]) {
        score += x;
        firstRoundStack.pop_back();
      } else {
        firstRoundStack.push_back(c);
      }
    }

    std::stack<char> secondRoundStack;
    for (const auto c : firstRoundStack) {
      if (secondRoundStack.empty()) {
        secondRoundStack.push(c);
        continue;
      }

      const auto stackTop = secondRoundStack.top();
      // xFind is the reverse of yFind
      if (stackTop == yFind[0] && c == yFind[1]) {
        score += y;
        secondRoundStack.pop();
      } else {
        secondRoundStack.push(c);
      }
    }

    return score;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maximumGain("cdbcbbaaabab", 4, 5);
}