/*
 * @lc app=leetcode id=3418 lang=cpp
 *
 * [3418] Maximum Amount of Money Robot Can Earn
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumAmount(const std::vector<std::vector<int>>& coins) {
    const int row_count = coins.size();
    const int col_count = coins[0].size();

    // dp[i][j][k] - maximum profit when reaching coins[i][j] with k
    // neutralizing left
    std::vector<std::vector<std::array<int, 3>>> dp(
        std::vector<std::vector<std::array<int, 3>>>(
            row_count, std::vector<std::array<int, 3>>(col_count)));

    // Init start
    if (coins[0][0] >= 0) {
      dp[0][0].fill(coins[0][0]);
    } else {
      dp[0][0][2] = coins[0][0];
      dp[0][0][1] = 0;
      dp[0][0][0] = INT_MIN / 2;
    }

    // Init the first row
    for (int j = 1; j < col_count; j++) {
      const int coin_count = coins[0][j];
      if (coin_count >= 0) {
        for (int k = 0; k <= 2; k++) {
          dp[0][j][k] = dp[0][j - 1][k] + coin_count;
        }
      } else {
        dp[0][j][0] = std::max(dp[0][j - 1][0] + coin_count, dp[0][j - 1][1]);
        dp[0][j][1] = std::max(dp[0][j - 1][1] + coin_count, dp[0][j - 1][2]);
        dp[0][j][2] = dp[0][j - 1][2] + coin_count;
      }
    }

    // Init the first col
    for (int i = 1; i < row_count; i++) {
      const int coin_count = coins[i][0];
      if (coin_count >= 0) {
        for (int k = 0; k <= 2; k++) {
          dp[i][0][k] = dp[i - 1][0][k] + coin_count;
        }
      } else {
        dp[i][0][0] = std::max(dp[i - 1][0][0] + coin_count, dp[i - 1][0][1]);
        dp[i][0][1] = std::max(dp[i - 1][0][1] + coin_count, dp[i - 1][0][2]);
        dp[i][0][2] = dp[i - 1][0][2] + coin_count;
      }
    }

    for (int i = 1; i < row_count; i++) {
      for (int j = 1; j < col_count; j++) {
        const int coin_count = coins[i][j];
        if (coin_count >= 0) {
          for (int k = 0; k <= 2; k++) {
            dp[i][j][k] =
                std::max(dp[i - 1][j][k], dp[i][j - 1][k]) + coin_count;
          }
        } else {
          // Robber
          dp[i][j][0] =
              std::max(std::max(dp[i - 1][j][0], dp[i][j - 1][0]) + coin_count,
                       std::max(dp[i - 1][j][1], dp[i][j - 1][1]));
          dp[i][j][1] =
              std::max(std::max(dp[i - 1][j][1], dp[i][j - 1][1]) + coin_count,
                       std::max(dp[i - 1][j][2], dp[i][j - 1][2]));
          dp[i][j][2] = std::max(dp[i - 1][j][2], dp[i][j - 1][2]) + coin_count;
        }
      }
    }

    return *std::max_element(dp[row_count - 1][col_count - 1].cbegin(),
                             dp[row_count - 1][col_count - 1].cend());
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maximumAmount({{-7, 12, 12, 13},
                     {-6, 19, 19, -6},
                     {9, -2, -10, 16},
                     {-4, 14, -10, -9}});
}
