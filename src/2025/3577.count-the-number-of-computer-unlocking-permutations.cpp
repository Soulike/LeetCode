/*
 * @lc app=leetcode id=3577 lang=cpp
 *
 * [3577] Count the Number of Computer Unlocking Permutations
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int countPermutations(const std::vector<int>& complexity) {
    static constexpr int kMod = 1e9 + 7;
    const int min_locked_complexity =
        *std::min_element(complexity.cbegin() + 1, complexity.cend());
    if (min_locked_complexity <= complexity[0]) {
      return 0;
    }
    const int n = complexity.size();
    std::int64_t result = 1;
    for (int i = 2; i <= n - 1; i++) {
      result *= i;
      result %= kMod;
    }
    return static_cast<int>(result);
  }
};
// @lc code=end
