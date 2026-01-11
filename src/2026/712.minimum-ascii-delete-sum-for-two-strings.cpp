/*
 * @lc app=leetcode id=712 lang=cpp
 *
 * [712] Minimum ASCII Delete Sum for Two Strings
 */

#include <numeric>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumDeleteSum(const std::string& s1, const std::string& s2) {
    const int total_ascii_sum = std::accumulate(s1.cbegin(), s1.cend(), 0) +
                                std::accumulate(s2.cbegin(), s2.cend(), 0);

    // dp[i][j] - Common sequence with maximum ASCII sum in s1[:i-1] and
    // s2[:j-1]
    // Base case
    // dp[0][...] = dp[...][0] = 0
    std::vector<std::vector<int>> dp(2, std::vector<int>(s2.size() + 1, 0));

    for (int i = 1; i <= s1.size(); i++) {
      for (int j = 1; j <= s2.size(); j++) {
        dp[i % 2][j] = std::max(
            {// Ignore s1[i-1]
             dp[(i - 1) % 2][j],
             // Ignore s2[j-1]
             dp[i % 2][j - 1],
             // Ignore both if s1[i-1] != s2[i-1], or include both if s1[i-1] ==
             // s2[j-1]
             dp[(i - 1) % 2][j - 1] + (s1[i - 1] == s2[j - 1]) * s1[i - 1]});
      }
    }

    // Use total ASCII to remove the common sequence with maximum ASCII sum to
    // get minimum deleted ASCII sum.
    const int result = total_ascii_sum - 2 * dp[(s1.size()) % 2][s2.size()];
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumDeleteSum("sea", "eat");
}