/*
 * @lc app=leetcode id=1967 lang=cpp
 *
 * [1967] Number of Strings That Appear as Substrings in Word
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numOfStrings(std::vector<std::string>& patterns, std::string word) {
    int count = 0;
    for (const std::string& pattern : patterns) {
      count += word.find(pattern) != std::string::npos;
    }
    return count;
  }
};
// @lc code=end
