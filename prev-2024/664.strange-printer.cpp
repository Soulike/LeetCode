/*
 * @lc app=leetcode id=664 lang=cpp
 *
 * [664] Strange Printer
 */
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int strangePrinter(std::string s) {
    // Consecutive duplicates do not affect steps. So remove them.
    int noConsecutiveDuplicateBorderIndex = 0;
    for (int i = 1; i < s.length(); i++) {
      if (s[i] != s[noConsecutiveDuplicateBorderIndex]) {
        noConsecutiveDuplicateBorderIndex++;
        s[noConsecutiveDuplicateBorderIndex] = s[i];
      }
    }
    s.resize(noConsecutiveDuplicateBorderIndex + 1);

    const int sLength = static_cast<int>(s.size());

    // dp[i][j] - The minimum steps to print from s[i] to s[j]
    std::vector<std::vector<int>> dp(sLength, std::vector<int>(sLength, -1));
    for (int i = 0; i < sLength; i++) {
      dp[i][i] = 1;
    }

    for (int i = sLength - 1; i >= 0; i--) {
      for (int j = i + 1; j < sLength; j++) {
        dp[i][j] = 1 + dp[i + 1][j];

        for (int k = i + 1; k <= j; k++) {
          // Here, if s[i] == s[k], we try to print s[i] along with
          // s[k], and make following prints overwrite it.
          // This can reduce the steps to
          // print s[k] and s[i] respectively.
          if (s[k] == s[i]) {
            dp[i][j] = std::min(dp[i][j],
                                dp[i][k - 1] + (k + 1 <= j ? dp[k + 1][j] : 0));
          }
        }
      }
    }

    return dp[0][sLength - 1];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.strangePrinter("aba");
}
