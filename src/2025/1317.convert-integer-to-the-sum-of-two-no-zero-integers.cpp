/*
 * @lc app=leetcode id=1317 lang=cpp
 *
 * [1317] Convert Integer to the Sum of Two No-Zero Integers
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> getNoZeroIntegers(const int n) {
    for (int i = 1; i <= n / 2; i++) {
      if (IsNonZeroInteger(i) && IsNonZeroInteger(n - i)) {
        return {i, n - i};
      }
    }
    return {};
  }

 private:
  static bool IsNonZeroInteger(int num) {
    if (num == 0) {
      return false;
    }
    while (num > 0) {
      if (num % 10 == 0) {
        return false;
      }
      num /= 10;
    }
    return true;
  }
};
// @lc code=end
