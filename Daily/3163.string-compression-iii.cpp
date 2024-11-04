/*
 * @lc app=leetcode id=3163 lang=cpp
 *
 * [3163] String Compression III
 */

#include <string>

// @lc code=start
class Solution {
 public:
  std::string compressedString(std::string word) {
    int currentCharNumber = 1;
    char currentChar = word[0];

    std::string result;
    result.reserve(word.size());

    for (int i = 1; i < word.size(); i++) {
      if (word[i] == currentChar && currentCharNumber < 9) {
        currentCharNumber++;
      } else {
        result += std::to_string(currentCharNumber);
        result += currentChar;

        currentCharNumber = 1;
        currentChar = word[i];
      }
    }

    result += std::to_string(currentCharNumber);
    result += currentChar;

    return result;
  }
};
// @lc code=end
