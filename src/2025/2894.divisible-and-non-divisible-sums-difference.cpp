/*
 * @lc app=leetcode id=2894 lang=cpp
 *
 * [2894] Divisible and Non-divisible Sums Difference
 */

// @lc code=start
class Solution {
 public:
  int differenceOfSums(int n, int m) {
    int diff = 0;
    for (int i = 1; i <= n; i++) {
      if (i % m) [[likely]] {
        diff += i;
      } else {
        diff -= i;
      }
    }

    return diff;
  }
};
// @lc code=end
