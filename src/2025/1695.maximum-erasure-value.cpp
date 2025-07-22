/*
 * @lc app=leetcode id=1695 lang=cpp
 *
 * [1695] Maximum Erasure Value
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumUniqueSubarray(const std::vector<int>& nums) {
    std::array<int, 10001> num_to_last_index = {};
    num_to_last_index.fill(-1);

    std::vector<int> prefix_sum(nums.size() + 1);

    int max_subarray_sum = 0;

    int left = 0;
    int right = 0;
    while (right < nums.size()) {
      while (left < right && num_to_last_index[nums[right]] >= left) {
        left++;
      }
      num_to_last_index[nums[right]] = right;
      prefix_sum[right + 1] = prefix_sum[right] + nums[right];
      right++;
      max_subarray_sum =
          std::max(max_subarray_sum, prefix_sum[right] - prefix_sum[left]);
    }

    return max_subarray_sum;
  }
};
// @lc code=end
