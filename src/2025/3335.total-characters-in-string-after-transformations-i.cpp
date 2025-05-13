/*
 * @lc app=leetcode id=3335 lang=cpp
 *
 * [3335] Total Characters in String After Transformations I
 */

#include <array>
#include <numeric>
#include <string>

// @lc code=start
class Solution {
 public:
  int lengthAfterTransformations(const std::string& s, const int t) {
    constexpr size_t kMod = 1e9 + 7;
    std::array<size_t, 26> letter_freqs = {};
    for (const char letter : s) {
      letter_freqs[letter - 'a']++;
    }

    for (int i = 0; i < t; i++) {
      size_t prev_letter_count = letter_freqs[0];
      letter_freqs[0] = 0;
      for (int j = 1; j < 26; j++) {
        const size_t current_letter_count = letter_freqs[j];
        letter_freqs[j] = prev_letter_count;
        prev_letter_count = current_letter_count;
      }
      letter_freqs[0] += prev_letter_count;
      letter_freqs[0] %= kMod;
      letter_freqs[1] += prev_letter_count;
      letter_freqs[1] %= kMod;
    }

    return static_cast<int>(std::accumulate(
        letter_freqs.cbegin(), letter_freqs.cend(), 0u,
        [](const size_t a, const size_t b) { return (a + b) % kMod; }));
  }
};
// @lc code=end
