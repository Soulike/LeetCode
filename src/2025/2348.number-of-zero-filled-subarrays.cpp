/*
 * @lc app=leetcode id=2348 lang=cpp
 *
 * [2348] Number of Zero-Filled Subarrays
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long zeroFilledSubarray(const std::vector<int>& nums) {
    long long subarray_count = 0;
    int current_subarray_size = 0;
    for (const int num : nums) {
      if (num == 0) {
        current_subarray_size++;
        subarray_count += current_subarray_size;
      } else {
        current_subarray_size = 0;
      }
    }

    return subarray_count;
  }
};
// @lc code=end
