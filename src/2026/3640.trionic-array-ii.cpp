/*
 * @lc app=leetcode id=3640 lang=cpp
 *
 * [3640] Trionic Array II
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long maxSumTrionic(const std::vector<int>& nums) {
    std::vector<std::int64_t> prefix_sum(nums.size() + 1);
    for (int i = 0; i < nums.size(); i++) {
      prefix_sum[i + 1] = prefix_sum[i] + nums[i];
    }
    std::int64_t max_sum = INT64_MIN;
    std::int64_t current_sum = 0;
    int current_begin = 0;
    while (current_begin < nums.size()) {
      const int first_increasing_until = IsIncreasingUntil(nums, current_begin);
      if (first_increasing_until == current_begin) {
        current_begin = current_begin + 1;
        continue;
      }
      const int second_decreasing_until =
          IsDecreasingUntil(nums, first_increasing_until);
      if (second_decreasing_until == first_increasing_until) {
        current_begin = second_decreasing_until + 1;
        continue;
      }
      const int third_increasing_until =
          IsIncreasingUntil(nums, second_decreasing_until);
      if (third_increasing_until == second_decreasing_until) {
        current_begin = third_increasing_until + 1;
        continue;
      }

      // First increasing part could include negative numbers at the beginning.
      // Exclude them.
      int sum_begin = current_begin;
      while (nums[sum_begin] <= 0 && sum_begin < first_increasing_until - 1) {
        sum_begin++;
      }

      if (nums[third_increasing_until] <= 0) {
        // If the third increasing part is all negative, just could the first 2
        // numbers.
        current_sum =
            prefix_sum[second_decreasing_until + 2] - prefix_sum[sum_begin];
        max_sum = std::max(max_sum, current_sum);
      } else {
        // If the third increasing part is positive-negative mixed, iterate to
        // find maximum sum.
        for (int i = second_decreasing_until + 1; i <= third_increasing_until;
             i++) {
          current_sum = prefix_sum[i + 1] - prefix_sum[sum_begin];
          max_sum = std::max(max_sum, current_sum);
        }
      }

      current_begin = second_decreasing_until;
    }
    return max_sum;
  }

 private:
  static int IsIncreasingUntil(const std::vector<int>& nums, const int begin) {
    int increasing_until = begin;
    for (int i = begin + 1; i < nums.size(); i++) {
      if (nums[i - 1] < nums[i]) {
        increasing_until = i;
      } else {
        break;
      }
    }

    return increasing_until;
  }

  static int IsDecreasingUntil(const std::vector<int>& nums, const int begin) {
    int decreasing_until = begin;
    for (int i = begin + 1; i < nums.size(); i++) {
      if (nums[i - 1] > nums[i]) {
        decreasing_until = i;
      } else {
        break;
      }
    }

    return decreasing_until;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxSumTrionic({-273, 85, -636, -486, -374, 331});
}