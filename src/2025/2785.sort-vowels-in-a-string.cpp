/*
 * @lc app=leetcode id=2785 lang=cpp
 *
 * [2785] Sort Vowels in a String
 */

#include <algorithm>
#include <string>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string sortVowels(std::string s) {
    std::vector<char> vowels;
    for (const char c : s) {
      if (IsVowel(c)) {
        vowels.push_back(c);
      }
    }

    std::ranges::sort(vowels);
    size_t vowel_index = 0;

    for (char& c : s) {
      if (IsVowel(c)) {
        c = vowels[vowel_index];
        vowel_index++;
      }
    }

    return s;
  }

 private:
  static bool IsVowel(const char c) {
    return c == 'a' || c == 'e' || c == 'o' || c == 'u' || c == 'i' ||
           c == 'A' || c == 'E' || c == 'O' || c == 'U' || c == 'I';
  }
};
// @lc code=end
