/*
 * @lc app=leetcode id=1910 lang=cpp
 *
 * [1910] Remove All Occurrences of a Substring
 */

#include <string>

// @lc code=start
class Solution {
 public:
  std::string removeOccurrences(std::string s, std::string part) {
    std::string stack;
    int nextPartMatchIndex = 0;

    for (const char c : s) {
      stack.push_back(c);
      while (stack.ends_with(part)) {
        stack.resize(stack.size() - part.size());
      }
    }

    return stack;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.removeOccurrences("daabcbaabcbc", "abc");
}
