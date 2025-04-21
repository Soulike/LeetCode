/*
 * @lc app=leetcode id=2145 lang=cpp
 *
 * [2145] Count the Hidden Sequences
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int numberOfArrays(const std::vector<int>& differences,
                     const int lower,
                     const int upper) {
    const int kAllowedRange = upper - lower + 1;
    int min = 0;
    int max = 0;
    int current = 0;

    for (const int difference : differences) {
      current += difference;
      min = std::min(min, current);
      max = std::max(max, current);

      const int range = max - min + 1;
      if (range > kAllowedRange) {
        return 0;
      }
    }

    return (upper - lower + 1) - (max - min + 1) + 1;
  }
};
// @lc code=end

int main() {
  // 0 1 -2 2
  Solution sol;
  sol.numberOfArrays({1, -3, 4}, 1, 6);
}
