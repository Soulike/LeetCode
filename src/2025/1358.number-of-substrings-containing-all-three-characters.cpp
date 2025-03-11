/*
 * @lc app=leetcode id=1358 lang=cpp
 *
 * [1358] Number of Substrings Containing All Three Characters
 */

#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  int numberOfSubstrings(const std::string& s) {
    int substringNumber = 0;
    std::array<int, 3> lastIndexOfChar = {-1, -1, -1};

    for (int i = 0; i < s.size(); i++) {
      lastIndexOfChar[s[i] - 'a'] = i;

      const int leftMostCharIndex = std::min(
          {lastIndexOfChar[0], lastIndexOfChar[1], lastIndexOfChar[2]});
      substringNumber += leftMostCharIndex + 1;
    }

    return substringNumber;
  }
};
// @lc code=end
