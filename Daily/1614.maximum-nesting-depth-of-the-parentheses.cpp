/*
 * @lc app=leetcode id=1614 lang=cpp
 *
 * [1614] Maximum Nesting Depth of the Parentheses
 */
#include <cmath>
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  int maxDepth(string& s) {
    int leftBrackets = 0;
    int rightBrackets = 0;
    int maxDepth = 0;

    for (auto& c : s) {
      if (c == '(') {
        leftBrackets++;
      } else if (c == ')') {
        rightBrackets++;
      }

      maxDepth = std::max(maxDepth, leftBrackets - rightBrackets);
    }

    return maxDepth;
  }
};
// @lc code=end
