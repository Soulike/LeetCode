/*
 * @lc app=leetcode id=790 lang=cpp
 *
 * [790] Domino and Tromino Tiling
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int numTilings(const int n) {
    /**
     * dp[i][j]
     * i: Methods to fill column i
     * j == 0: no blank in next column
     * j == 1: leave a blank in next column
     *
     * base case
     * dp[1][...] = 1
     * dp[2][0] = 2
     * dp[2][1] = 2
     *
     * formula
     * dp[i][0] = dp[i-1][0] + dp[i-2][0] + 2*dp[i-2][1]
     * dp[i][1] = dp[i-1][0] + dp[i-1][1]
     */
    std::vector<std::vector<int>> dp(3, std::vector<int>(2, -1));
    dp[1] = {1, 1};
    dp[2] = {2, 2};

    for (int i = 3; i <= n; i++) {
      dp[i % 3][0] = ((dp[(i - 1) % 3][0] + dp[(i - 2) % 3][0]) % kMod +
                      (2 * dp[(i - 2) % 3][1]) % kMod) %
                     kMod;
      dp[i % 3][1] = (dp[(i - 1) % 3][0] + dp[(i - 1) % 3][1]) % kMod;
    }

    return dp[n % 3][0];
  }

 private:
  static constexpr int kMod = 1e9 + 7;
};
// @lc code=end

int main() {
  Solution sol;
  sol.numTilings(1);
}
