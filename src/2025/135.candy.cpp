/*
 * @lc app=leetcode id=135 lang=cpp
 *
 * [135] Candy
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int candy(const std::vector<int>& ratings) {
    const int kRatingsCount = static_cast<int>(ratings.size());

    // Length of increasing sequence. Not including valley.
    int increasing_sequence_length = 0;
    // Length of decreasing sequence. Not including peak.
    int decreasing_sequence_length = 0;
    int last_increasing_sequence_length = 0;
    int sum = 1;  // 1 candy for ratings[0]

    for (int i = 1; i < kRatingsCount; i++) {
      if (ratings[i - 1] < ratings[i]) {
        increasing_sequence_length++;
        last_increasing_sequence_length = increasing_sequence_length;
        decreasing_sequence_length = 0;
        sum += 1 + increasing_sequence_length;
      } else if (ratings[i - 1] == ratings[i]) {
        // Treat ratings[i] as valley with last increasing sequence length 0.
        increasing_sequence_length = 0;
        decreasing_sequence_length = 0;
        last_increasing_sequence_length = 0;
        sum++;
      } else {
        increasing_sequence_length = 0;
        decreasing_sequence_length++;
        sum += decreasing_sequence_length;

        // If the length of decreasing sequence is longer than previous
        // increasing sequence, we need to increase the value of peak to ensure
        // valley get at least 1.
        sum += (decreasing_sequence_length > last_increasing_sequence_length);
      }
    }

    return sum;
  }
};
// @lc code=end
