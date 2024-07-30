/*
 * @lc app=leetcode id=1653 lang=cpp
 *
 * [1653] Minimum Deletions to Make String Balanced
 */

#include <stack>
#include <string>

// @lc code=start
class Solution {
 public:
  int minimumDeletions(const std::string& s) {
    const int n = s.length();
    std::stack<char> charStack;
    int deleteCount = 0;

    for (int i = 0; i < n; i++) {
      if (!charStack.empty() && charStack.top() == 'b' && s[i] == 'a') {
        charStack.pop();
        deleteCount++;
      } else {
        charStack.push(s[i]);
      }
    }

    return deleteCount;
  }
};
// @lc code=end
