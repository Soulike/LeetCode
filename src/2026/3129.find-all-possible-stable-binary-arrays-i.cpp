/*
 * @lc app=leetcode id=3129 lang=cpp
 *
 * [3129] Find All Possible Stable Binary Arrays I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int numberOfStableArrays(const int zero, const int one, const int limit) {
    static constexpr int kMod = 1e9 + 7;
    // dp[z][o][0 or 1] - stable array count with `z` zeros, `o` ones, and ends
    // with 0 or 1
    //
    // base case
    // dp[1...min(zero,limit)][0][0] = 1
    // dp[0][1...min(one, limit)][1] = 1
    //
    // formula
    // dp[z][o][0] = dp[z-1][o][0] + dp[z-1][o][1] - dp[z - limit -1][o][1]
    // dp[z][o][1] = dp[z][o-1][0] + dp[z][o-1][1] - dp[z][o - limit - 1][0]

    std::vector<std::vector<std::array<int, 2>>> dp(
        zero + 1, std::vector<std::array<int, 2>>(one + 1, {0, 0}));

    for (int z = 1; z <= std::min(zero, limit); z++) {
      dp[z][0][0] = 1;
    }
    for (int o = 1; o <= std::min(one, limit); o++) {
      dp[0][o][1] = 1;
    }

    for (int z = 1; z <= zero; z++) {
      for (int o = 1; o <= one; o++) {
        dp[z][o][0] = (dp[z - 1][o][0] + dp[z - 1][o][1]) % kMod -
                      (z - limit - 1 >= 0 ? dp[z - limit - 1][o][1] : 0);
        dp[z][o][0] = (dp[z][o][0] + kMod) % kMod;

        dp[z][o][1] = (dp[z][o - 1][0] + dp[z][o - 1][1]) % kMod -
                      (o - limit - 1 >= 0 ? dp[z][o - limit - 1][0] : 0);
        dp[z][o][1] = (dp[z][o][1] + kMod) % kMod;
      }
    }

    return (dp[zero][one][0] + dp[zero][one][1]) % kMod;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numberOfStableArrays(3, 3, 2);
}
