/*
 * @lc app=leetcode id=1930 lang=cpp
 *
 * [1930] Unique Length-3 Palindromic Subsequences
 */

#include <array>
#include <string>
#include <unordered_set>

// @lc code=start
class Solution {
 public:
  int countPalindromicSubsequence(const std::string& s) {
    std::array<int, 26> letterToFirstIndex;
    letterToFirstIndex.fill(-1);
    std::array<int, 26> letterToLastIndex;
    letterToLastIndex.fill(-1);

    for (int i = 0; i < s.size(); i++) {
      const char letter = s[i];
      const int letterIndex = letter - 'a';
      if (letterToFirstIndex[letterIndex] == -1) {
        letterToFirstIndex[letterIndex] = i;
      } else {
        letterToLastIndex[letterIndex] = i;
      }
    }

    int palindromicSubsequenceCount = 0;
    for (int i = 0; i < 26; i++) {
      if (letterToFirstIndex[i] == -1 || letterToLastIndex[i] == -1) {
        continue;
      }

      const int firstIndex = letterToFirstIndex[i];
      const int lastIndex = letterToLastIndex[i];
      std::unordered_set<char> lettersInBetween;

      for (int j = firstIndex + 1; j <= lastIndex - 1; j++) {
        lettersInBetween.insert(s[j]);
      }

      palindromicSubsequenceCount += static_cast<int>(lettersInBetween.size());
    }

    return palindromicSubsequenceCount;
  }
};
// @lc code=end
