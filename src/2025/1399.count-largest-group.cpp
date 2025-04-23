/*
 * @lc app=leetcode id=1399 lang=cpp
 *
 * [1399] Count Largest Group
 */

#include <unordered_map>

// @lc code=start
class Solution {
 public:
  int countLargestGroup(const int n) {
    std::unordered_map<int, int> digit_sum_to_counts;
    int max_digit_sum_count = 0;
    for (int i = 1; i <= n; i++) {
      const int digit_sum = GetSumOfDigits(i);
      digit_sum_to_counts[digit_sum]++;
      max_digit_sum_count =
          std::max(max_digit_sum_count, digit_sum_to_counts[digit_sum]);
    }

    int max_digit_sum_count_number = 0;
    for (const auto& digit_sum_to_count : digit_sum_to_counts) {
      if (digit_sum_to_count.second == max_digit_sum_count) {
        max_digit_sum_count_number++;
      }
    }

    return max_digit_sum_count_number;
  }

 private:
  static int GetSumOfDigits(int num) {
    int sum = 0;
    while (num > 0) {
      sum += num % 10;
      num /= 10;
    }
    return sum;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countLargestGroup(13);
}
