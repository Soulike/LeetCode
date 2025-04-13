/*
 * @lc app=leetcode id=50 lang=cpp
 *
 * [50] Pow(x, n)
 */

#include <climits>

// @lc code=start
class Solution {
 public:
  double myPow(double base, int exp) {
    if (base == 1 || exp == 0) {
      return 1;
    }

    double result = 1;

    if (exp < 0) {
      base = 1 / base;

      if (exp == INT_MIN) {
        result *= base;
        exp++;
      }
      exp = -exp;
    }

    double current_base = base;
    int remaining_current_base_exp = exp;
    while (remaining_current_base_exp > 0) {
      if (remaining_current_base_exp % 2 == 1) {
        result *= current_base;
      }

      current_base *= current_base;
      remaining_current_base_exp /= 2;
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.myPow(2, -2);
}
