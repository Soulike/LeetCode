/*
 * @lc app=leetcode id=3227 lang=cpp
 *
 * [3227] Vowels Game in a String
 */

#include <algorithm>
#include <string>

// @lc code=start
class Solution {
 public:
  bool doesAliceWin(const std::string& s) {
    // if no vowels. Alice can not do anything. Bob wins.
    // If `vowel_count` is odd, Alice can first remove whole string. Alice wins.
    // If `vowel_count` is even
    //   1. Alice removes `vowel_count - 1` vowels.
    //   2. Bob can not remove any vowels.
    //   3. Alice removes the last vowel and all other letters.
    //   4. Bob loses and Alice wins.
    // So Alice always wins if any vowel exists.
    return std::ranges::any_of(s, IsVowel);
  }

 private:
  static bool IsVowel(const char c) {
    return c == 'a' || c == 'e' || c == 'o' || c == 'u' || c == 'i' ||
           c == 'A' || c == 'E' || c == 'O' || c == 'U' || c == 'I';
  }
};
// @lc code=end
