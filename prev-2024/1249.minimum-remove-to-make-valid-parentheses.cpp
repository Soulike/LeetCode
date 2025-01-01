/*
 * @lc app=leetcode id=1249 lang=cpp
 *
 * [1249] Minimum Remove to Make Valid Parentheses
 */
#include <stack>
#include <string>
#include <unordered_set>

using std::stack;
using std::string;
using std::unordered_set;

// @lc code=start
class Solution {
 public:
  string minRemoveToMakeValid(string s) {
    stack<int> leftParenthesesIndexes;

    for (int i = 0; i < s.size(); i++) {
      if (s[i] == '(') {
        leftParenthesesIndexes.push(i);
      } else if (s[i] == ')') {
        if (!leftParenthesesIndexes.empty()) {
          leftParenthesesIndexes.pop();
        } else {
          s[i] = '*';
        }
      }
    }

    while (!leftParenthesesIndexes.empty()) {
      s[leftParenthesesIndexes.top()] = '*';
      leftParenthesesIndexes.pop();
    }

    string validString;
    for (char& c : s) {
      if (c != '*') {
        validString.push_back(c);
      }
    }

    return validString;
  }
};
// @lc code=end
