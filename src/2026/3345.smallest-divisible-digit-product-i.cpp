/*
 * @lc app=leetcode id=3345 lang=cpp
 *
 * [3345] Smallest Divisible Digit Product I
 */

// @lc code=start
class Solution {
 public:
  int smallestNumber(int n, int t) {
    while (true) {
      if (GetDigitProduct(n) % t == 0) {
        return n;
      }
      n++;
    }
  }

 private:
  int GetDigitProduct(int num) {
    int product = 1;
    while (num > 0) {
      const int digit = num % 10;
      num /= 10;
      product *= digit;
    }
    return product;
  }
};
// @lc code=end
