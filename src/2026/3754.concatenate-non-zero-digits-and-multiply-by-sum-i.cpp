/*
 * @lc app=leetcode id=3754 lang=cpp
 *
 * [3754] Concatenate Non-Zero Digits and Multiply by Sum I
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long sumAndMultiply(int n) {
    const std::vector<int> non_zero_digits = GetNonZeroDigits(n);
    long long x = 0;
    long long sum = 0;
    for (const int digit : non_zero_digits) {
      x *= 10;
      x += digit;
      sum += digit;
    }
    return x * sum;
  }

 private:
  std::vector<int> GetNonZeroDigits(int num) {
    std::vector<int> nonzero_digits;
    while (num > 0) {
      const int digit = num % 10;
      num /= 10;
      if (digit == 0) {
        continue;
      }
      nonzero_digits.push_back(digit);
    }
    std::ranges::reverse(nonzero_digits);
    return nonzero_digits;
  }
};
// @lc code=end
