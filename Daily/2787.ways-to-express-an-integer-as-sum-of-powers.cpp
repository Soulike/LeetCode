/*
 * @lc app=leetcode id=2787 lang=cpp
 *
 * [2787] Ways to Express an Integer as Sum of Powers
 */

#include <cmath>
#include <string>
#include <vector>

using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  int numberOfWays(int n, int x) {
    std::memset(memo, -1, sizeof(memo));
    int result = dp(n, x, 1);
    return result;
  }

 private:
  const int MOD = std::pow(10, 9) + 7;
  int memo[301][301];

  int dp(int n, const int& x, int num) {
    if (n == 0) {
      return 1;
    }

    int numPow = std::pow(num, x);

    if (n < 0 || numPow > n) {
      return 0;
    }

    if (memo[n][num] != -1) {
      return memo[n][num];
    }

    int pickWays = dp(n - numPow, x, num + 1);
    int skipWays = dp(n, x, num + 1);

    memo[n][num] = (pickWays % MOD + skipWays % MOD) % MOD;

    return memo[n][num];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numberOfWays(75, 1);  // 48446
}