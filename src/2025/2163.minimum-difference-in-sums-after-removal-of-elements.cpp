/*
 * @lc app=leetcode id=2163 lang=cpp
 *
 * [2163] Minimum Difference in Sums After Removal of Elements
 */

#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long minimumDifference(const std::vector<int>& nums) {
    // 3 parts of nums indexes: [0, n-1][n,2n-1][2n,3n-1]

    // For n <= i <= 2n
    // First part: [0, i-1]
    // Second part: [i, 3n-1]
    // We precalculate the min-n-element sums in first part during i changes,
    // and the max-n-element sums in second part during i changes.
    // Then we calculate minimum difference with the precalculated sums.

    const int n = static_cast<int>(nums.size()) / 3;

    // First part
    std::priority_queue<int> max_heap;
    std::vector<std::int64_t> first_part_min_n_element_sums(n + 1, 0);
    for (int i = 0; i < n; i++) {
      max_heap.push(nums[i]);
      first_part_min_n_element_sums[0] += nums[i];
    }

    for (int i = n; i <= 2 * n - 1; i++) {
      max_heap.push(nums[i]);
      first_part_min_n_element_sums[i - (n - 1)] =
          first_part_min_n_element_sums[i - (n - 1) - 1] - max_heap.top() +
          nums[i];
      max_heap.pop();
    }

    // Second part
    std::priority_queue<int, std::vector<int>, std::greater<>> min_heap;
    std::vector<std::int64_t> second_part_max_n_element_sums(n + 1, 0);
    for (int i = 3 * n - 1; i >= 2 * n; i--) {
      min_heap.push(nums[i]);
      second_part_max_n_element_sums[n] += nums[i];
    }

    for (int i = 2 * n - 1; i >= n; i--) {
      min_heap.push(nums[i]);
      second_part_max_n_element_sums[i - n] =
          second_part_max_n_element_sums[i - n + 1] - min_heap.top() + nums[i];
      min_heap.pop();
    }

    std::int64_t min_diff = INT64_MAX;
    for (int i = 0; i <= n; i++) {
      min_diff = std::min(min_diff, first_part_min_n_element_sums[i] -
                                        second_part_max_n_element_sums[i]);
    }
    return min_diff;
  }
};
// @lc code=end
