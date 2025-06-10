/*
 * @lc app=leetcode id=3442 lang=cpp
 *
 * [3442] Maximum Difference Between Even and Odd Frequency I
 */

#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  int maxDifference(const std::string& s) {
    int max_odd_freq = INT_MIN;
    int min_even_freq = INT_MAX;

    std::array<int, 26> letter_to_freq = {};
    for (const char letter : s) {
      letter_to_freq[letter - 'a']++;
    }

    for (const int freq : letter_to_freq) {
      if (freq == 0) {
        continue;
      }
      if (freq % 2) {
        max_odd_freq = std::max(max_odd_freq, freq);
      } else {
        min_even_freq = std::min(min_even_freq, freq);
      }
    }

    return max_odd_freq - min_even_freq;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxDifference("aaaaabbc");
}
