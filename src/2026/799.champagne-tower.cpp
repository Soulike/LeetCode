/*
 * @lc app=leetcode id=799 lang=cpp
 *
 * [799] Champagne Tower
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  double champagneTower(int poured, int query_row, int query_glass) {
    std::vector<std::vector<double>> tower(2);
    tower[0].resize(1);
    tower[0][0] = poured;
    for (int row = 0; row < query_row; row++) {
      // Pour into next level cups
      std::ranges::fill(tower[(row + 1) % 2], 0.0);
      tower[(row + 1) % 2].resize(row + 2);
      for (int col = 0; col < tower[row % 2].size(); col++) {
        const double excess_liquid = std::max(0.0, tower[row % 2][col] - 1.0);
        tower[row % 2][col] -= excess_liquid;
        tower[(row + 1) % 2][col] += excess_liquid / 2;
        tower[(row + 1) % 2][col + 1] += excess_liquid / 2;
      }
    }

    return std::min(1.0, tower[query_row % 2][query_glass]);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.champagneTower(100000009, 33, 17);
}