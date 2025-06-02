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
    const int kChildrenCount = static_cast<int>(ratings.size());

    std::vector<int> candy_counts(kChildrenCount, 1);

    for (int i = 1; i < kChildrenCount; i++) {
      if (ratings[i - 1] < ratings[i]) {
        candy_counts[i] = candy_counts[i - 1] + 1;
      }
    }

    for (int i = kChildrenCount - 1; i >= 1; i--) {
      if (ratings[i - 1] > ratings[i]) {
        candy_counts[i - 1] =
            std::max(candy_counts[i - 1], candy_counts[i] + 1);
      }
    }

    return std::accumulate(candy_counts.cbegin(), candy_counts.cend(), 0);
  }
};
// @lc code=end
