/*
 * @lc app=leetcode id=1888 lang=cpp
 *
 * [1888] Minimum Number of Flips to Make the Binary String Alternating
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int minFlips(const std::string_view s) {
    int odd_index_zero_count = 0;
    int odd_index_one_count = 0;

    int even_index_zero_count = 0;
    int even_index_one_count = 0;

    for (int i = 0; i < s.size(); i++) {
      const int bit = s[i] - '0';
      if (i % 2) {
        // odd
        odd_index_zero_count += 1 - bit;
        odd_index_one_count += bit;
      } else {
        // even
        even_index_zero_count += 1 - bit;
        even_index_one_count += bit;
      }
    }

    int min_flip_count = std::min(
        // All odds are 0s, all even are 1s
        odd_index_one_count + even_index_zero_count,
        // All odds are 1s, all evens are 0s
        odd_index_zero_count + even_index_one_count);

    for (int i = 0; i < s.size(); i++) {
      // Rotate s[i] to end
      const int bit = s[i] - '0';

      // First remove the bit at 0 index now.
      even_index_zero_count -= 1 - bit;
      even_index_one_count -= bit;

      // Rotate
      std::swap(odd_index_zero_count, even_index_zero_count);
      std::swap(odd_index_one_count, even_index_one_count);

      // Put the rotated bit to the last index
      if ((s.size() - 1) % 2) {
        // Last index is odd
        odd_index_zero_count += 1 - bit;
        odd_index_one_count += bit;
      } else {
        // Last index is even
        even_index_zero_count += 1 - bit;
        even_index_one_count += bit;
      }

      min_flip_count = std::min({min_flip_count,
                                 // All odds are 0s, all even are 1s
                                 odd_index_one_count + even_index_zero_count,
                                 // All odds are 1s, all evens are 0s
                                 odd_index_zero_count + even_index_one_count});
    }

    return min_flip_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minFlips("1110");
}

// 111000
// 0 -> 110001
// 1 -> 100011
// 2 -> 000111
// 3 -> 001110
// 4 -> 011100
// 5 -> 111000
