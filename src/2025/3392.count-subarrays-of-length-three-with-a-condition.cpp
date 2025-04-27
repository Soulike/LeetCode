/*
 * @lc app=leetcode id=3392 lang=cpp
 *
 * [3392] Count Subarrays of Length Three With a Condition
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int countSubarrays(const std::vector<int>& nums) {
    int subarray_count = 0;
    for (int i = 1; i < nums.size() - 1; i++) {
      if (nums[i] % 2) {
        continue;
      }

      subarray_count += nums[i - 1] + nums[i + 1] == nums[i] / 2;
    }

    return subarray_count;
  }
};
// @lc code=end
