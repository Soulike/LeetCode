/*
 * @lc app=leetcode id=1190 lang=cpp
 *
 * [1190] Reverse Substrings Between Each Pair of Parentheses
 */
#include <algorithm>
#include <stack>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string reverseParentheses(std::string s) {
    int n = s.length();
    std::stack<int> openParenthesesIndices;
    std::vector<int> pair(n);

    for (int i = 0; i < n; ++i) {
      if (s[i] == '(') {
        openParenthesesIndices.push(i);
      }
      if (s[i] == ')') {
        int j = openParenthesesIndices.top();
        openParenthesesIndices.pop();
        pair[i] = j;
        pair[j] = i;
      }
    }

    std::string result;
    int direction = 1;
    for (int currIndex = 0; currIndex < n; currIndex += direction) {
      if (s[currIndex] == '(' || s[currIndex] == ')') {
        currIndex = pair[currIndex];
        direction = -direction;
      } else {
        result += s[currIndex];
      }
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.reverseParentheses("(ed(et(oc))el)");
}