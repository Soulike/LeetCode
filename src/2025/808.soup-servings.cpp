/*
 * @lc app=leetcode id=808 lang=cpp
 *
 * [808] Soup Servings
 */

#include <algorithm>
#include <cmath>
#include <vector>

// @lc code=start
class Solution {
 public:
  double soupServings(const int n) {
    const int total_serve_count = static_cast<int>(std::ceil(n / 25.0));

    if (total_serve_count > 5000) {
      return 1.0;
    }

    /**
     * dp[i][j] - The result for the problem when A has i serves and B has j
     * serves. 1 serve = 25ml soup.
     *
     * base cases
     * dp[0][j] = 1.0
     * dp[i][0] = 0.0
     * dp[0][0] = 0.5
     *
     * formula
     * dp[i][j] = 0.25 * (dp[i-4][j] + dp[i-3][j-1] + dp[i-2][j-2] +
     * dp[i-1][j-3])
     */
    std::vector<std::vector<double>> dp(
        4, std::vector<double>(total_serve_count + 1, 0.0));
    std::ranges::fill(dp[0], 1.0);
    dp[0][0] = 0.5;

    for (int i = 1; i <= total_serve_count; i++) {
      dp[(i - 1) % 4][0] = 0;
      if (i == 1) [[unlikely]] {
        dp[0][0] = 0.5;
      }
      for (int j = 1; j <= total_serve_count; j++) {
        dp[i % 4][j] = 0.25 * (dp[std::max(0, i - 4) % 4][j] +
                               dp[std::max(0, i - 3) % 4][j - 1] +
                               dp[std::max(0, i - 2) % 4][std::max(0, j - 2)] +
                               dp[std::max(0, i - 1) % 4][std::max(0, j - 3)]);
      }
    }

    return dp[total_serve_count % 4][total_serve_count];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.soupServings(0);
}
