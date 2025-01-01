/*
 * @lc app=leetcode id=214 lang=cpp
 *
 * [214] Shortest Palindrome
 */
#include <algorithm>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string shortestPalindrome(const std::string& s) {
    if (s.size() <= 1) {
      return s;
    }

    int left = 0;

    for (int right = s.size() - 1; right >= 0; right--) {
      if (s[right] == s[left]) {
        left++;
      }
    }

    if (left == s.size()) {
      return s;
    }

    const std::string suffix = s.substr(left);
    const std::string prefix(suffix.crbegin(), suffix.crend());

    return prefix + shortestPalindrome(s.substr(0, left)) + suffix;
  }
};
// @lc code=end
