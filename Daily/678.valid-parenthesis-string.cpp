/*
 * @lc app=leetcode id=678 lang=cpp
 *
 * [678] Valid Parenthesis String
 */
#include <cmath>
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  bool checkValidString(string s) {
    int minOpenParenthesis = 0;  // try to treat all '*'s as ')'s
    int maxOpenParenthesis = 0;  // try to treat all '*'s as '('s

    for (auto& c : s) {
      if (c == '(') {
        minOpenParenthesis++;
        maxOpenParenthesis++;
      } else if (c == ')') {
        // At this point, if minOpenParenthesis < 0,
        // then we treat too many '*'s as ')'s,
        // so set one of them to '',
        // as we can't use future '('s to match it.
        minOpenParenthesis = std::max(minOpenParenthesis - 1, 0);
        maxOpenParenthesis--;
      } else {
        // Try to try to treat the '*' as ')'.
        // But if minOpenParenthesis < 0,
        // then we treat too many '*'s as ')'s,
        // so set one of them to '',
        // as we can't use future '('s to match it.
        minOpenParenthesis = std::max(minOpenParenthesis - 1, 0);
        maxOpenParenthesis++;
      }

      // Too many ')'s. Treating all '*'s as '('s is still not enough
      if (maxOpenParenthesis < 0) {
        return false;
      }
    }

    // If minOpenParenthesis > 0,
    // then there are too many '('s,
    // and treating all '*'s as ')'s is still not enough
    return minOpenParenthesis == 0;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.checkValidString("()");
}