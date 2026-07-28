/*
 * @lc app=leetcode id=3517 lang=cpp
 *
 * [3517] Smallest Palindromic Rearrangement I
 */

#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string smallestPalindrome(std::string s) {
    const size_t s_size = s.size();
    std::array<int, 26> letter_to_freq = {};

    for (int i = 0; i < s_size / 2; i++) {
      letter_to_freq[s[i] - 'a']++;
    }

    int current_index = 0;
    for (int i = 0; i < 26; i++) {
      while (letter_to_freq[i] > 0) {
        s[current_index] = i + 'a';
        current_index++;
        letter_to_freq[i]--;
      }
    }

    for (int i = 0; i < s_size / 2; i++) {
      s[s_size - 1 - i] = s[i];
    }

    return s;
  }
};
// @lc code=end
