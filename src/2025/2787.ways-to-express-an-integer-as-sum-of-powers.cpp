/*
 * @lc app=leetcode id=2787 lang=cpp
 *
 * [2787] Ways to Express an Integer as Sum of Powers
 */

#include <array>
#include <cmath>
// @lc code=start
class Solution {
 public:
  int numberOfWays(const int n, const int x) {
    std::array<std::array<int, 301>, 301> memo = {};
    for (auto& row : memo) {
      row.fill(-1);
    }

    const int result = dp(n, x, 1, memo);
    return result;
  }

 private:
  static constexpr int kMod = 1e9 + 7;
  static int dp(const int n,
                const int x,
                const int min_num,
                std::array<std::array<int, 301>, 301>& memo) {
    const int64_t pow_result = pow(min_num, x);
    if (pow_result > n) {
      return 0;
    }
    if (pow_result == n) {
      return 1;
    }
    if (memo[n][min_num] != -1) {
      return memo[n][min_num];
    }
    const int result = (dp(n - pow_result, x, min_num + 1, memo) +
                        dp(n, x, min_num + 1, memo)) %
                       kMod;
    memo[n][min_num] = result;
    return result;
  }

  static std::int64_t pow(std::int64_t base, int exp) {
    std::int64_t result = 1;
    while (exp > 0) {
      if (exp % 2) {
        result *= base;
      }
      base *= base;
      exp /= 2;
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numberOfWays(108, 1);
}
