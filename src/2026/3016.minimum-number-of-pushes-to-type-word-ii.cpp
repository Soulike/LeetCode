/*
 * @lc app=leetcode id=3016 lang=cpp
 *
 * [3016] Minimum Number of Pushes to Type Word II
 */

#include <algorithm>
#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  int minimumPushes(const std::string word) {
    std::array<int, 26> letter_to_freq = {};
    for (const char letter : word) {
      letter_to_freq[letter - 'a']++;
    }

    std::ranges::sort(letter_to_freq, std::greater<>());

    int total_push_count = 0;
    for (int i = 0; i < letter_to_freq.size(); i++) {
      if (letter_to_freq[i] == 0) {
        break;
      }
      const int push_count = i / 8 + 1;
      total_push_count += letter_to_freq[i] * push_count;
    }
    return total_push_count;
  }
};
// @lc code=end
