/*
 * @lc app=leetcode id=1140 lang=cpp
 *
 * [1140] Stone Game II
 */
#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int stoneGameII(std::vector<int>& piles) {
    const int N = static_cast<int>(piles.size());

    std::vector<int> prefixSum(N);
    prefixSum[0] = piles[0];
    for (int i = 1; i < N; i++) {
      prefixSum[i] = piles[i] + prefixSum[i - 1];
    }

    // dp[i][m] - Game starts from piles[i], given m,
    // the maximum stones the current player can get
    std::vector<std::vector<int>> dp(N, std::vector<int>(N + 1));

    for (int i = N - 1; i >= 0; i--) {
      for (int m = N; m >= 1; m--) {
        const int allLeftStones = prefixSum[N - 1] - prefixSum[i] + piles[i];
        // Can take all
        if (N - i <= 2 * m) {
          dp[i][m] = allLeftStones;
          continue;
        }
        for (int x = 1; x <= 2 * m; x++) {
          // If current player take first x stones,
          // The most stones opponent can get from left stones.
          const int takenStonesByOpponent = dp[i + x][std::max(x, m)];
          // Remove the most stones that opponent can get from left stones,
          // then we know the most stones current player can get
          // if taking first x stones
          dp[i][m] = std::max(dp[i][m], allLeftStones - takenStonesByOpponent);
        }
      }
    }

    return dp[0][1];
  }
};
// @lc code=end

int main() {
  std::vector<int> piles = {1};
  Solution sol;
  sol.stoneGameII(piles);
}
