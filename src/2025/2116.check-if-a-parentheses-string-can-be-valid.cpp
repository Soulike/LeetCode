/*
 * @lc app=leetcode id=2116 lang=cpp
 *
 * [2116] Check if a Parentheses String Can Be Valid
 */

#include <stack>
#include <string>

// @lc code=start
class Solution {
 public:
  bool canBeValid(const std::string& s, const std::string& locked) {
    if (s.size() % 2 == 1) {
      return false;
    }

    std::stack<int> leftParenthesisIndexStack;
    std::stack<int> universalParenthesisIndexStack;
    for (int i = 0; i < s.size(); i++) {
      if (locked[i] == '0') {
        universalParenthesisIndexStack.push(i);
        continue;
      }

      if (s[i] == '(') {
        leftParenthesisIndexStack.push(i);
      } else {
        if (!leftParenthesisIndexStack.empty()) {
          leftParenthesisIndexStack.pop();
        } else if (!universalParenthesisIndexStack.empty()) {
          universalParenthesisIndexStack.pop();
        } else {
          return false;
        }
      }
    }

    while (!leftParenthesisIndexStack.empty() &&
           !universalParenthesisIndexStack.empty()) {
      const int leftParenthesisIndex = leftParenthesisIndexStack.top();
      leftParenthesisIndexStack.pop();
      const int universalParenthesisIndex =
          universalParenthesisIndexStack.top();
      universalParenthesisIndexStack.pop();

      if (leftParenthesisIndex > universalParenthesisIndex) {
        return false;
      }
    }

    return leftParenthesisIndexStack.empty() &&
           universalParenthesisIndexStack.size() % 2 == 0;
  }
};
// @lc code=end
