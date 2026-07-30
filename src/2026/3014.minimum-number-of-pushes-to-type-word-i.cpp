/*
 * @lc app=leetcode id=3014 lang=cpp
 *
 * [3014] Minimum Number of Pushes to Type Word I
 */

#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  int minimumPushes(std::string word) {
    std::array<int, 26> letter_to_freq = {};

    for (const char letter : word) {
      letter_to_freq[letter - 'a']++;
    }

    int total_push_count = 0;
    int letter_index = 0;

    for (int i = 0; i < 26; i++) {
      if (letter_to_freq[i] == 0) {
        continue;
      }
      const int letter_push_count = letter_index / 8 + 1;
      letter_index++;
      total_push_count += letter_to_freq[i] * letter_push_count;
    }

    return total_push_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumPushes("xycdefghij");
}
