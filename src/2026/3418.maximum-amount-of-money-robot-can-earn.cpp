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

    // dp[i % 2][j][k] - maximum profit when reaching coins[i][j] with k
    // neutralizing left
    std::vector<std::vector<std::array<int, 3>>> dp(
        2, std::vector<std::array<int, 3>>(col_count));

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

    for (int i = 1; i < row_count; i++) {
      const int cur = i % 2;
      const int prev = 1 - cur;

      // Init the first col of this row
      const int first_coin = coins[i][0];
      if (first_coin >= 0) {
        for (int k = 0; k <= 2; k++) {
          dp[cur][0][k] = dp[prev][0][k] + first_coin;
        }
      } else {
        dp[cur][0][0] = std::max(dp[prev][0][0] + first_coin, dp[prev][0][1]);
        dp[cur][0][1] = std::max(dp[prev][0][1] + first_coin, dp[prev][0][2]);
        dp[cur][0][2] = dp[prev][0][2] + first_coin;
      }

      for (int j = 1; j < col_count; j++) {
        const int coin_count = coins[i][j];
        if (coin_count >= 0) {
          for (int k = 0; k <= 2; k++) {
            dp[cur][j][k] =
                std::max(dp[prev][j][k], dp[cur][j - 1][k]) + coin_count;
          }
        } else {
          // Robber
          dp[cur][j][0] =
              std::max(std::max(dp[prev][j][0], dp[cur][j - 1][0]) + coin_count,
                       std::max(dp[prev][j][1], dp[cur][j - 1][1]));
          dp[cur][j][1] =
              std::max(std::max(dp[prev][j][1], dp[cur][j - 1][1]) + coin_count,
                       std::max(dp[prev][j][2], dp[cur][j - 1][2]));
          dp[cur][j][2] =
              std::max(dp[prev][j][2], dp[cur][j - 1][2]) + coin_count;
        }
      }
    }

    const int last = (row_count - 1) % 2;
    return *std::max_element(dp[last][col_count - 1].cbegin(),
                             dp[last][col_count - 1].cend());
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
