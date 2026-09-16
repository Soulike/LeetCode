/*
 * @lc app=leetcode id=1621 lang=cpp
 *
 * [1621] Number of Sets of K Non-Overlapping Line Segments
 */

#include <algorithm>

// @lc code=start
class Solution {
 public:
  int numberOfSets(const int n, const int k) {
    return CombinationMod(n + k - 1, 2 * k);
  }

 private:
  static constexpr long long kMod = 1000000007;

  long long ModPow(long long base, long long exponent) {
    long long result = 1;
    while (exponent > 0) {
      if (exponent & 1) {
        result = result * base % kMod;
      }
      base = base * base % kMod;
      exponent >>= 1;
    }
    return result;
  }

  int CombinationMod(const int m, int n) {
    n = std::min(n, m - n);

    long long result = 1;
    for (int i = 1; i <= n; i++) {
      result = result * (m - n + i) % kMod;
      result = result * ModPow(i, kMod - 2) % kMod;
    }

    return static_cast<int>(result);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numberOfSets(30, 7);
}
