/*
 * @lc app=leetcode id=1411 lang=cpp
 *
 * [1411] Number of Ways to Paint N × 3 Grid
 */

#include <array>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numOfWays(const int n) {
    // For each row, we have 2 patterns: aba, abc
    // We have 3 colors 1, 2, 3,
    // Pattern aba: 121, 131, 212, 232, 313, 323, total 6 arrangements.
    // Pattern abc: 123, 132, 213, 231, 312, 321, total 6 arrangements.

    // For each pattern in aba, for example, 121, the next row can be
    // 212, 213, 312, 313, 232, 5 arrangements, 3 aba, 2 abc
    // For abc, for example, 123
    // 212, 312, 231, 232, 4 arrangements, 2 aba, 2 abc
    std::uint64_t aba_ways = 6;
    std::uint64_t abc_ways = 6;
    for (int i = 1; i < n; i++) {
      const std::uint64_t prev_aba_ways = aba_ways;
      const std::uint64_t prev_abc_ways = abc_ways;
      aba_ways = (3 * prev_aba_ways + 2 * prev_abc_ways) % kMod;
      abc_ways = (2 * prev_aba_ways + 2 * prev_abc_ways) % kMod;
    }

    return (aba_ways + abc_ways) % kMod;
  }

 private:
  static constexpr int kMod = 1e9 + 7;
};
// @lc code=end

int main() {
  Solution sol;
  sol.numOfWays(5000);
}