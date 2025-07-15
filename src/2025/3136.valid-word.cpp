/*
 * @lc app=leetcode id=3136 lang=cpp
 *
 * [3136] Valid Word
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool isValid(std::string word) {
    if (word.size() < 3) {
      return false;
    }
    bool has_vowel = false;
    bool has_consonant = false;

    for (const char c : word) {
      if (!IsLetterChar(c) && !IsDigitChar(c)) {
        return false;
      }
      has_vowel = has_vowel || IsVowelLetterChar(c);
      has_consonant = has_consonant || IsConsonantLetterChar(c);
    }

    return has_vowel && has_consonant;
  }

 private:
  static bool IsVowelLetterChar(const char c) {
    static const std::unordered_set<char> vowel_letters = {'a', 'e', 'i', 'o',
                                                           'u'};
    return vowel_letters.contains(std::tolower(c));
  }

  static bool IsConsonantLetterChar(const char c) {
    return IsLetterChar(c) && !IsVowelLetterChar(c);
  }

  static bool IsLetterChar(const char c) {
    return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
  }

  static bool IsDigitChar(const char c) { return c >= '0' && c <= '9'; }
};
// @lc code=end
