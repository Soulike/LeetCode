/*
 * @lc app=leetcode id=474 lang=cpp
 *
 * [474] Ones and Zeroes
 */

#include <array>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findMaxForm(const std::vector<std::string>& strs,
                  const int m,
                  const int n) {
    std::vector<std::array<int, 2>> str_infos(strs.size(), {0, 0});
    for (size_t i = 0; i < strs.size(); i++) {
      const std::string& str = strs[i];
      int zero_count = 0;
      int one_count = 0;
      for (const char c : str) {
        zero_count += c == '0';
        one_count += c == '1';
      }
      str_infos[i] = {zero_count, one_count};
    }

    /**
     * dp[k][i][j] max strs within strs[0] ~ strs[k-1] with at most i 0s and j
     * 1s
     *
     * base case
     * dp[0][i][j] = 0
     * dp[k][0][0] = 0
     *
     * formula
     * If can include
     * dp[k][i][j] = max(dp[k-1][i][j], dp[k-1][i-z][j-o] + 1)
     *
     * If can now include
     * dp[k][i][j] = dp[k-1][i][j]
     */
    std::vector<std::vector<std::vector<int>>> dp(
        2, std::vector<std::vector<int>>(m + 1, std::vector<int>(n + 1, 0)));

    for (int k = 1; k <= strs.size(); k++) {
      const auto& str_info = str_infos[k - 1];
      const int zero_count = str_info[0];
      const int one_count = str_info[1];

      for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
          // Can include
          if (i >= zero_count && j >= one_count) {
            dp[k % 2][i][j] =
                std::max(dp[(k - 1) % 2][i][j],
                         dp[(k - 1) % 2][i - zero_count][j - one_count] + 1);
          } else {
            dp[k % 2][i][j] = dp[(k - 1) % 2][i][j];
          }
        }
      }
    }

    return dp[strs.size() % 2][m][n];
  }
};
// @lc code=end
