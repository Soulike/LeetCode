/*
 * @lc app=leetcode id=1653 lang=cpp
 *
 * [1653] Minimum Deletions to Make String Balanced
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumDeletions(const std::string& s) {
    // dp[i] - min deletions to make s[0,s) balanced.
    std::vector<int> dp(2, 0);
    int current_b_count = 0;

    for (int i = 1; i <= s.size(); i++) {
      if (s[i - 1] == 'a') {
        // Remove the 'a', or remove all 'b's before.
        dp[i % 2] = std::min(dp[(i - 1) % 2] + 1, current_b_count);
      } else {
        dp[i % 2] = dp[(i - 1) % 2];
        current_b_count++;
      }
    }

    return dp[s.size() % 2];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumDeletions("aababbab");
}