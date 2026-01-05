/*
 * @lc app=leetcode id=1975 lang=cpp
 *
 * [1975] Maximum Matrix Sum
 */

#include <optional>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long maxMatrixSum(const std::vector<std::vector<int>>& matrix) {
    long long abs_sum = 0;
    int min_abs_num = INT_MAX;
    int negative_num_count = 0;
    for (const std::vector<int>& row : matrix) {
      for (const int num : row) {
        abs_sum += std::abs(num);
        min_abs_num = std::min(min_abs_num, std::abs(num));
        negative_num_count += num < 0;
      }
    }

    if (negative_num_count % 2 == 1) {
      return abs_sum - 2 * min_abs_num;
    }

    return abs_sum;
  }
};
// @lc code=end
