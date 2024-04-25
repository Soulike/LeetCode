/*
 * @lc app=leetcode id=2370 lang=cpp
 *
 * [2370] Longest Ideal Subsequence
 */

#include <algorithm>
#include <cmath>
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  int longestIdealString(string s, int k) {
    int dp[26];  // dp[i]: the longest ideal string ends with letter `i + 'a'`
    std::fill_n(dp, 26, 0);
    int maxLength = 1;

    for (const auto& c : s) {
      int index = c - 'a';
      for (int j = 1; j <= k; j++) {
        if (index - j >= 0) {
          dp[index] = std::max(dp[index], dp[index - j]);
        }
        if (index + j <= 25) {
          dp[index] = std::max(dp[index], dp[index + j]);
        }
      }
      dp[index]++;
      maxLength = std::max(maxLength, dp[index]);
    }

    return maxLength;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestIdealString("slddedwfmo", 16);  // 9
}