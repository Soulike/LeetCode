/*
 * @lc app=leetcode id=1128 lang=cpp
 *
 * [1128] Number of Equivalent Domino Pairs
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numEquivDominoPairs(const std::vector<std::vector<int>>& dominoes) {
    std::array<int, 100> domino_value_counts{};
    domino_value_counts.fill(0);
    int equivalent_domino_pair_count = 0;
    for (const auto& domino : dominoes) {
      const int value1 = std::max(domino[0], domino[1]);
      const int value2 = std::min(domino[0], domino[1]);
      const int domino_value = value1 * 10 + value2;
      equivalent_domino_pair_count += domino_value_counts[domino_value];
      domino_value_counts[domino_value]++;
    }

    return equivalent_domino_pair_count;
  }
};
// @lc code=end
