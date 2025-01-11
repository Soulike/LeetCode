/*
 * @lc app=leetcode id=1400 lang=cpp
 *
 * [1400] Construct K Palindrome Strings
 */

#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  bool canConstruct(const std::string& s, int k) {
    if (s.size() < k) {
      return false;
    }
    // For even count letters, we can always consume all of them in pairs
    // inside the k palindromes.

    // But for odd count letters, after consume them in pairs,
    // there is always one letter left, which can only be used at the center of
    // a palindrome.
    // Therefore, if we have more than k odd count letter, it is impossible
    // to consume all of them, as we have not enough central places to consume
    // them.

    std::array<int, 26> letterCount;
    letterCount.fill(0);

    for (const char letter : s) {
      letterCount[letter - 'a']++;
    }
    int oddLetterCount = 0;
    for (int i = 0; i < 26; i++) {
      oddLetterCount += letterCount[i] % 2;
    }

    if (oddLetterCount > k) {
      return false;
    }

    return true;
  }
};
// @lc code=end
