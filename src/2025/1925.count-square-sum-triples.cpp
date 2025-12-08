/*
 * @lc app=leetcode id=1925 lang=cpp
 *
 * [1925] Count Square Sum Triples
 */

#include <cmath>

// @lc code=start
class Solution {
 public:
  int countTriples(const int n) {
    int count = 0;
    for (int i = 1; i < n; i++) {
      for (int j = i; j < n; j++) {
        const double expect_square_root = std::sqrt(i * i + j * j);
        if (expect_square_root > n) {
          break;
        }
        count += 2 * IsInteger(expect_square_root);
      }
    }
    return count;
  }

 private:
  static bool IsInteger(double value) {
    double intPart;
    double fracPart = std::modf(value, &intPart);
    return fracPart == 0.0;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countTriples(10);
}