/*
 * @lc app=leetcode id=3085 lang=cpp
 *
 * [3085] Minimum Deletions to Make String K-Special
 */

#include <algorithm>
#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  int minimumDeletions(const std::string word, const int k) {
    std::array<size_t, 26> letter_to_frequency = {};
    for (const char letter : word) {
      letter_to_frequency[letter - 'a']++;
    }

    size_t minimum_deletion_count = word.size();
    for (const size_t frequency : letter_to_frequency) {
      if (frequency == 0) {
        continue;
      }
      size_t deletion_count = 0;
      for (const size_t other_frequency : letter_to_frequency) {
        if (other_frequency == 0) {
          continue;
        }

        if (other_frequency < frequency) {
          deletion_count += other_frequency;
        } else if (other_frequency > frequency) {
          const size_t diff = other_frequency - frequency;
          if (diff > k) {
            deletion_count += diff - k;
          }
        }
      }
      minimum_deletion_count = std::min(minimum_deletion_count, deletion_count);
    }

    return static_cast<int>(minimum_deletion_count);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumDeletions("vvnowvov", 2);
}
