/*
 * @lc app=leetcode id=1390 lang=cpp
 *
 * [1390] Four Divisors
 */

#include <cmath>
#include <optional>
#include <vector>

// @lc code=start
class Solution {
 public:
  int sumFourDivisors(const std::vector<int>& nums) {
    int sum = 0;
    for (const int num : nums) {
      const std::optional<int> divisor_sum = GetFourDivisorSum(num);
      sum += divisor_sum.value_or(0);
    }
    return sum;
  }

 private:
  static std::optional<int> GetFourDivisorSum(const int num) {
    const int num_square_root_floor = static_cast<int>(std::sqrt(num));
    if (num_square_root_floor * num_square_root_floor == num) {
      // Must have odd divisors.
      return std::nullopt;
    }
    int divisor_count = 0;
    int divisor_sum = 0;
    for (int i = 1; i <= num_square_root_floor; i++) {
      if (num % i == 0) {
        divisor_count += 2;
        divisor_sum += i;
        divisor_sum += num / i;
        if (divisor_count > 4) {
          return std::nullopt;
        }
      }
    }
    if (divisor_count != 4) {
      return std::nullopt;
    }
    return divisor_sum;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.sumFourDivisors({1, 2, 3, 4, 5, 6, 7, 8, 9, 10});
}