/*
 * @lc app=leetcode id=2906 lang=cpp
 *
 * [2906] Construct Product Matrix
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> constructProductMatrix(
      const std::vector<std::vector<int>>& grid) {
    static constexpr int kMod = 12345;

    const int row_count = grid.size();
    const int col_count = grid[0].size();

    std::vector<std::vector<int>> result(row_count,
                                         std::vector<int>(col_count));

    int curr_prefix = 1;
    for (int i = 0; i < row_count; i++) {
      for (int j = 0; j < col_count; j++) {
        result[i][j] = curr_prefix;
        curr_prefix *= grid[i][j] % kMod;
        curr_prefix %= kMod;
      }
    }

    int curr_suffix = 1;
    for (int i = row_count - 1; i >= 0; i--) {
      for (int j = col_count - 1; j >= 0; j--) {
        result[i][j] *= curr_suffix;
        result[i][j] %= kMod;
        curr_suffix *= grid[i][j] % kMod;
        curr_suffix %= kMod;
      }
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.constructProductMatrix({{12345}, {2}, {1}});
}
