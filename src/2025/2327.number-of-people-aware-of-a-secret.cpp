/*
 * @lc app=leetcode id=2327 lang=cpp
 *
 * [2327] Number of People Aware of a Secret
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int peopleAwareOfSecret(const int n, const int delay, const int forget) {
    constexpr int kMod = 1e9 + 7;
    constexpr auto accumulate_mod_sum_op = [](const int a, const int b) {
      return (a + b) % kMod;
    };
    // dp[i][j]: At day i+1, how many people know the secret for j+1 days.
    //
    // Base case
    // dp[0][0] = 1
    //
    // Formula
    // dp[i][0] = sum(dp[i-delay]) - sum(dp[i-delay][forget-delay~forget-1])
    // dp[i][j] = dp[i-1][j-1]
    //
    // Result
    // sum(dp[n-1])
    std::vector<std::vector<int>> dp(delay + 1, std::vector<int>(forget));
    dp[0][0] = 1;

    for (int i = 1; i < n; i++) {
      for (int j = 0; j < forget; j++) {
        if (j == 0) {
          if (i - delay >= 0) {
            dp[i % (delay + 1)][0] =
                (
                    // Everyone `delay` days ago tells the secret to
                    // another person.
                    std::accumulate(dp[(i - delay) % (delay + 1)].cbegin(),
                                    dp[(i - delay) % (delay + 1)].cend(), 0,
                                    accumulate_mod_sum_op) -
                    // But some of the persons in `delay` days ago have
                    // forgotten. Remove them from today's people count.
                    std::accumulate(dp[(i - delay) % (delay + 1)].cbegin() +
                                        (forget - delay),
                                    dp[(i - delay) % (delay + 1)].cend(), 0,
                                    accumulate_mod_sum_op) +
                    kMod) %
                kMod;
          }
          continue;
        }
        dp[i % (delay + 1)][j] = dp[(i - 1) % (delay + 1)][j - 1];
      }
    }

    const int result = std::accumulate(dp[(n - 1) % (delay + 1)].cbegin(),
                                       dp[(n - 1) % (delay + 1)].cend(), 0,
                                       accumulate_mod_sum_op);
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.peopleAwareOfSecret(289, 7, 23);
}
