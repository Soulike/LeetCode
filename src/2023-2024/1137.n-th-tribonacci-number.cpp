/*
 * @lc app=leetcode id=1137 lang=cpp
 *
 * [1137] N-th Tribonacci Number
 */

#include <algorithm>
#include <cstring>

// @lc code=start
class Solution {
 public:
  int tribonacci(int n) {
    int dp[3] = {0, 1, 1};

    for (int i = 3; i <= n; i++) {
      dp[i % 3] = dp[(i - 1) % 3] + dp[(i - 2) % 3] + dp[(i - 3) % 3];
    }

    return dp[n % 3];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.tribonacci(4);
}