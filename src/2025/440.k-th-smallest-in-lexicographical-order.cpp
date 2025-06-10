/*
 * @lc app=leetcode id=440 lang=cpp
 *
 * [440] K-th Smallest in Lexicographical Order
 */

#include <algorithm>
#include <cinttypes>

// @lc code=start
class Solution {
 public:
  int findKthNumber(const int n, int k) {
    int current_number = 1;
    k--;

    while (k > 0) {
      const std::int64_t steps =
          CalculateStepsBetween(current_number, current_number + 1, n);
      if (k >= steps) {
        k -= static_cast<int>(steps);
        current_number++;
      } else {
        k--;
        current_number *= 10;
      }
    }

    return current_number;
  }

 private:
  static std::int64_t CalculateStepsBetween(const std::int64_t num1,
                                            const std::int64_t num2,
                                            const std::int64_t max_num) {
    std::int64_t current_num1 = num1;
    std::int64_t current_num2 = num2;
    std::int64_t steps = 0;
    while (current_num1 <= max_num) {
      // Calculate current level node number.
      steps += std::min(max_num + 1, current_num2) - current_num1;

      // Move to next level.
      current_num1 *= 10;
      current_num2 *= 10;
    }
    return steps;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.findKthNumber(10, 3);
}
