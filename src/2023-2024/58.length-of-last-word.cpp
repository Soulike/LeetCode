/*
 * @lc app=leetcode id=58 lang=cpp
 *
 * [58] Length of Last Word
 */
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  int lengthOfLastWord(string s) {
    int index = s.length() - 1;
    while (index >= 0 && s[index] == ' ') {
      index--;
    }

    int wordLength = 0;
    while (index >= 0 && s[index] != ' ') {
      wordLength++;
      index--;
    }

    return wordLength;
  }
};
// @lc code=end
