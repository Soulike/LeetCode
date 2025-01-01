/*
 * @lc app=leetcode id=2414 lang=cpp
 *
 * [2414] Length of the Longest Alphabetical Continuous Substring
 */

#include <cmath>
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  int longestContinuousSubstring(const string& s) {
    int left = 0;
    int right = 1;
    int maxLength = 1;

    while (right < s.size()) {
      if (s[right] == s[right - 1] + 1) {
        maxLength = std::max(right - left + 1, maxLength);
      } else {
        left = right;
      }
      right++;
    }

    return maxLength;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestContinuousSubstring("abcde");
}