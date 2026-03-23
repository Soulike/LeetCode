/*
 * @lc app=leetcode id=1594 lang=cpp
 *
 * [1594] Maximum Non Negative Product in a Matrix
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maxProductPath(const std::vector<std::vector<int>>& grid) {
    static constexpr int kMod = 1e9 + 7;
    const size_t row_count = grid.size();
    const size_t col_count = grid[0].size();
    std::vector<std::vector<DpValue>> dp(
        row_count, std::vector<DpValue>(col_count, {INT64_MAX, INT64_MIN}));
    dp[0][0] = {grid[0][0], grid[0][0]};

    for (int i = 0; i < row_count; i++) {
      for (int j = 0; j < col_count; j++) {
        if (i - 1 >= 0 && j - 1 >= 0) {
          const std::int64_t from_top_value_1 =
              i - 1 >= 0 ? dp[i - 1][j].lowest * grid[i][j] : grid[i][j];
          const std::int64_t from_top_value_2 =
              dp[i - 1][j].highest * grid[i][j];
          const std::int64_t from_left_value_1 =
              dp[i][j - 1].lowest * grid[i][j];
          const std::int64_t from_left_value_2 =
              dp[i][j - 1].highest * grid[i][j];
          dp[i][j] = {
              std::min({from_top_value_1, from_top_value_2, from_left_value_1,
                        from_left_value_2}),
              std::max({from_top_value_1, from_top_value_2, from_left_value_1,
                        from_left_value_2}),
          };
        } else if (i - 1 >= 0) {
          const std::int64_t from_top_value_1 =
              i - 1 >= 0 ? dp[i - 1][j].lowest * grid[i][j] : grid[i][j];
          const std::int64_t from_top_value_2 =
              dp[i - 1][j].highest * grid[i][j];
          dp[i][j] = {
              std::min({from_top_value_1, from_top_value_2}),
              std::max({from_top_value_1, from_top_value_2}),
          };
        } else if (j - 1 >= 0) {
          const std::int64_t from_left_value_1 =
              dp[i][j - 1].lowest * grid[i][j];
          const std::int64_t from_left_value_2 =
              dp[i][j - 1].highest * grid[i][j];
          dp[i][j] = {
              std::min({from_left_value_1, from_left_value_2}),
              std::max({from_left_value_1, from_left_value_2}),
          };
        }
      }
    }

    return dp[row_count - 1][col_count - 1].highest >= 0
               ? dp[row_count - 1][col_count - 1].highest % kMod
               : -1;
  }

 private:
  struct DpValue {
    std::int64_t lowest;
    std::int64_t highest;
  };
};
// @lc code=end
