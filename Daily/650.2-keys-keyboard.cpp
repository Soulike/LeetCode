/*
 * @lc app=leetcode id=650 lang=cpp
 *
 * [650] 2 Keys Keyboard
 */

#include <algorithm>
#include <climits>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minSteps(int n) {
    // dp[i] - The minimum steps to reach length i
    // dp[i] = dp[j] + 1 + (i - j) / j if i % j == 0 for j from 1 to i
    // Copy: +1
    // Pastes: (i-j)/j
    std::vector<int> dp(n + 1, INT_MAX);
    dp[1] = 0;

    for (int i = 2; i <= n; i++) {
      for (int j = i - 1; j >= 1; j--) {
        if (i % j == 0) {
          dp[i] = std::min(dp[i], /*dp[j] + 1 + (i - j) / j*/ dp[j] + i / j);
        }
      }
    }

    return dp[n];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minSteps(20);
}
